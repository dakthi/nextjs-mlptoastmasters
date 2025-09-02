'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface FileUploaderProps {
  onUploadComplete?: (result: UploadResult) => void;
  onError?: (error: string) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  folder?: string;
  multiple?: boolean;
}

interface UploadResult {
  key: string;
  url: string;
  filename: string;
  size: number;
  type: string;
}

export function FileUploader({
  onUploadComplete,
  onError,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    'application/pdf': ['.pdf'],
  },
  maxSize = 10 * 1024 * 1024, // 10MB
  folder = 'uploads',
  multiple = false,
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadResult[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0]; // Handle single file for now
      if (!file) return;
      
      setUploading(true);

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Upload failed');
        }

        const result: UploadResult = await response.json();
        
        setUploadedFiles((prev) => [...prev, result]);
        onUploadComplete?.(result);
      } catch (error) {
        console.error('Upload error:', error);
        const message = error instanceof Error ? error.message : 'Upload failed';
        onError?.(message);
      } finally {
        setUploading(false);
      }
    },
    [folder, onUploadComplete, onError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple,
    disabled: uploading,
  });

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    if (uploadedFiles.length === 1) {
      setPreview(null);
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          transition-colors duration-200
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {uploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-2" />
            <p className="text-sm text-gray-600">Uploading...</p>
          </div>
        ) : isDragActive ? (
          <div className="flex flex-col items-center">
            <Upload className="h-12 w-12 text-blue-500 mb-2" />
            <p className="text-sm text-gray-600">Drop the files here...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">
              Drag & drop files here, or click to select
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Max size: {(maxSize / (1024 * 1024)).toFixed(0)}MB
            </p>
          </div>
        )}
      </div>

      {/* Preview */}
      {preview && (
        <div className="relative rounded-lg overflow-hidden bg-gray-100 p-2">
          <button
            onClick={() => setPreview(null)}
            className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-contain"
          />
        </div>
      )}

      {/* Uploaded files list */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Uploaded files:</p>
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <FileIcon className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{file.filename}</span>
                <span className="text-xs text-gray-500">
                  ({(file.size / 1024).toFixed(1)}KB)
                </span>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}