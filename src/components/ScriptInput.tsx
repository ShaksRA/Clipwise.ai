import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Link, Upload, Wand2 } from 'lucide-react';
import type { FileUpload } from '../types';

interface ScriptInputProps {
  onSubmit: (prompt: string) => Promise<void>;
  isLoading: boolean;
}

export function ScriptInput({ onSubmit, isLoading }: ScriptInputProps) {
  const [prompt, setPrompt] = useState('');
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const [url, setUrl] = useState('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newUploads = await Promise.all(
      acceptedFiles.map(async (file) => {
        const text = await file.text();
        return { file, text };
      })
    );
    setUploads((prev) => [...prev, ...newUploads]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg']
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullPrompt = [
      prompt,
      ...uploads.map(u => u.text),
      url
    ].filter(Boolean).join('\n\n');
    
    await onSubmit(fullPrompt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your script prompt here..."
          className="w-full h-32 p-4 rounded-lg border-2 border-purple-100 input-focus-ring
                     bg-white/50 placeholder-purple-300 text-gray-700"
        />
      </div>

      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                   transition-all duration-300 ${
                     isDragActive 
                     ? 'border-purple-500 bg-purple-50' 
                     : 'border-purple-200 hover:border-purple-300'
                   }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-purple-400" />
        <p className="mt-2 text-purple-600 font-medium">
          Drag & drop files here, or click to select files
        </p>
        <p className="text-sm text-purple-400 mt-1">
          Supports TXT, PDF, and image files
        </p>
      </div>

      {uploads.length > 0 && (
        <div className="bg-purple-50 rounded-lg p-4 space-y-2">
          {uploads.map((upload, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm text-purple-600">
              <FileText className="h-4 w-4" />
              <span>{upload.file.name}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-5 w-5" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter a URL to include content from..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-purple-100 
                       input-focus-ring bg-white/50 placeholder-purple-300"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary flex items-center space-x-2"
        >
          <Wand2 className="h-5 w-5" />
          <span>{isLoading ? 'Generating...' : 'Generate Script'}</span>
        </button>
      </div>
    </form>
  );
}