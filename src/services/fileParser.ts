import { FileUpload } from '../types';

export async function parseFile(file: File): Promise<string> {
  if (file.type.startsWith('text/')) {
    return await file.text();
  }
  
  if (file.type === 'application/pdf') {
    // Use pdf.js to extract text
    const pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item: any) => item.str).join(' ') + '\n';
    }
    return text;
  }
  
  if (file.type.startsWith('image/')) {
    // Use Tesseract.js for OCR
    const Tesseract = await import('tesseract.js');
    const result = await Tesseract.recognize(file);
    return result.data.text;
  }
  
  throw new Error('Unsupported file type');
}