import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ScriptInput } from './components/ScriptInput';
import { ScriptOutput } from './components/ScriptOutput';
import { SavedScripts } from './components/SavedScripts';
import { Search } from './components/Search';
import { LanguageSelect } from './components/LanguageSelect';
import { useScripts } from './hooks/useScripts';
import { Script } from './types';
import { generateScript } from './services/xai';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [currentScript, setCurrentScript] = useState<Script | null>(null);
  const [language, setLanguage] = useState('en');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { scripts, loading, total } = useScripts(page, 10, search);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleGenerateScript = async (prompt: string) => {
    setIsLoading(true);
    try {
      const content = await generateScript(prompt, language);
      setCurrentScript({
        id: crypto.randomUUID(),
        title: '',
        content,
        prompt,
        created_at: new Date().toISOString(),
        user_id: 'demo-user'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-10 w-10 text-white" />
            <h1 className="text-4xl font-bold text-white">
              AI Script Generator
            </h1>
          </div>
          <p className="text-purple-100 text-lg">
            Transform your ideas into compelling video scripts with AI
          </p>
        </div>

        <div className="glass-effect rounded-xl p-8 shadow-2xl mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1">
              <Search value={search} onChange={setSearch} />
            </div>
            <LanguageSelect value={language} onChange={setLanguage} />
          </div>

          <div className="space-y-8">
            <ScriptInput
              onSubmit={handleGenerateScript}
              isLoading={isLoading}
            />

            <ScriptOutput
              script={currentScript}
              onSave={async () => {
                setIsSaving(true);
                // Save logic here
                setIsSaving(false);
              }}
              isSaving={isSaving}
            />
          </div>
        </div>

        <div className="glass-effect rounded-xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Your Scripts Library
          </h2>
          <SavedScripts
            scripts={scripts}
            onDelete={async () => {
              // Delete logic here
            }}
          />
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}