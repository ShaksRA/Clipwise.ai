export interface Script {
  id: string;
  title: string;
  content: string;
  prompt: string;
  created_at: string;
  user_id: string;
}

export interface FileUpload {
  file: File;
  text: string;
}