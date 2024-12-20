import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Script } from '../types';
import { supabase } from '../lib/supabase';

export function useScripts(page = 1, limit = 10, search = '') {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadScripts();
  }, [page, search]);

  async function loadScripts() {
    setLoading(true);
    try {
      let query = supabase
        .from('scripts')
        .select('*', { count: 'exact' });

      if (search) {
        query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
      }

      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      if (error) throw error;

      setScripts(data);
      setTotal(count || 0);
    } catch (error) {
      toast.error('Failed to load scripts');
    } finally {
      setLoading(false);
    }
  }

  return { scripts, loading, total };
}