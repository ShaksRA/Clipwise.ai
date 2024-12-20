import React, { useState } from 'react';
import { Save, Download, Copy, Check } from 'lucide-react';
import type { Script } from '../types';

interface ScriptOutputProps {
  script: Script | null;
  onSave: () => Promise<void>;
  isSaving: boolean;
}

export function ScriptOutput({ script, onSave, isSaving }: ScriptOutputProps) {
  const [copied, setCopied] = useState(false);

  if (!script) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(script.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Generated Script</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleCopy}
            className="btn-secondary flex items-center space-x-2"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="btn-primary flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>{isSaving ? 'Saving...' : 'Save Script'}</span>
          </button>
        </div>
      </div>
      
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700">
          {script.content}
        </pre>
      </div>
    </div>
  );
}