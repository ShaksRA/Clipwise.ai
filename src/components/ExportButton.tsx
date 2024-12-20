import React from 'react';
import { Download } from 'lucide-react';
import { Script } from '../types';

interface ExportButtonProps {
  script: Script;
  format: 'txt' | 'pdf';
}

export function ExportButton({ script, format }: ExportButtonProps) {
  const exportScript = async () => {
    if (format === 'txt') {
      const blob = new Blob([script.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${script.title || 'script'}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      // For PDF export, we'll use jsPDF
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      doc.setFontSize(16);
      doc.text(script.title || 'Untitled Script', 20, 20);
      
      doc.setFontSize(12);
      const splitText = doc.splitTextToSize(script.content, 170);
      doc.text(splitText, 20, 40);
      
      doc.save(`${script.title || 'script'}.pdf`);
    }
  };

  return (
    <button
      onClick={exportScript}
      className="flex items-center space-x-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
    >
      <Download className="h-4 w-4" />
      <span>Export {format.toUpperCase()}</span>
    </button>
  );
}