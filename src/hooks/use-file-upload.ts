'use client';

import { useState } from 'react';

interface UploadOptions {
  folder?: string;
  onSuccess?: (result: UploadResult) => void;
  onError?: (error: string) => void;
}

interface UploadResult {
  key: string;
  url: string;
  filename: string;
  size: number;
  type: string;
}

export function useFileUpload(options: UploadOptions = {}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<UploadResult | null> => {
    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);
      if (options.folder) {
        formData.append('folder', options.folder);
      }

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const result: UploadResult = await response.json();
      
      setProgress(100);
      options.onSuccess?.(result);
      
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
      options.onError?.(message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (keyOrUrl: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/upload/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: keyOrUrl,
          key: keyOrUrl.startsWith('http') ? undefined : keyOrUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Delete failed');
      }

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Delete failed';
      setError(message);
      options.onError?.(message);
      return false;
    }
  };

  const reset = () => {
    setError(null);
    setProgress(0);
  };

  return {
    uploadFile,
    deleteFile,
    uploading,
    progress,
    error,
    reset,
  };
}