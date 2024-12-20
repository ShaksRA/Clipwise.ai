import React from 'react';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import type { Script } from '../types';

interface SavedScriptsProps {
  scripts: Script[];
  onDelete: (id: string) => Promise<void>;
}

export function SavedScripts({ scripts, onDelete }: SavedScriptsProps) {
  if (scripts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No saved scripts yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {scripts.map((script) => (
        <div key={script.id} className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">{script.title || 'Untitled Script'}</h3>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {format(new Date(script.created_at), 'MMM d, yyyy')}
              </span>
              <button
                onClick={() => onDelete(script.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <pre className="whitespace-pre-wrap text-sm text-gray-700 max-h-32 overflow-y-auto">
            {script.content}
          </pre>
        </div>
      ))}
    </div>
  );
}