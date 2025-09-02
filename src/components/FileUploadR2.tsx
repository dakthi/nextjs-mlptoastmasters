'use client';

import { useState, useRef } from 'react';
import { useFileUpload } from '@/hooks/use-file-upload';
import { isImageUrl, formatFileSize } from '@/lib/r2-utils';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface FileUploadR2Props {
  onFileSelect: (url: string) => void;
  currentImage?: string | null;
  label?: string;
  accept?: string;
  folder?: string;
  showMediaLibrary?: boolean;
}

export default function FileUploadR2({ 
  onFileSelect, 
  currentImage, 
  label = 'Upload Image',
  accept = 'image/*',
  folder = 'hero-images',
  showMediaLibrary = false
}: FileUploadR2Props) {
  const { uploadFile, uploading, error } = useFileUpload({
    folder,
    onSuccess: (result) => {
      console.log('Upload successful:', result);
      onFileSelect(result.url);
      setPreviewUrl(null);
    },
    onError: (error) => {
      console.error('Upload error:', error);
      alert(`Upload failed: ${error}`);
      setPreviewUrl(null);
    }
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Upload file
    await uploadFile(file);
    
    // Clean up preview URL
    URL.revokeObjectURL(objectUrl);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    
    const file = event.dataTransfer.files[0];
    if (file) {
      // Create preview URL for dropped file
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // Upload file
      await uploadFile(file);
      
      // Clean up preview URL
      URL.revokeObjectURL(objectUrl);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const clearImage = () => {
    onFileSelect('');
    setPreviewUrl(null);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      {/* Current Image Preview */}
      {(currentImage || previewUrl) && (
        <div className="relative inline-block">
          <img
            src={previewUrl || currentImage || ''}
            alt={previewUrl ? 'Preview' : 'Current'}
            className="h-32 w-auto max-w-xs object-cover rounded-lg border-2 border-gray-300 shadow-sm"
          />
          {previewUrl && uploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
          )}
          {!previewUrl && currentImage && (
            <button
              type="button"
              onClick={clearImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 shadow-md"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center transition-all
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          disabled={uploading}
        />
        
        <div className="space-y-2">
          {uploading ? (
            <>
              <Loader2 className="mx-auto h-12 w-12 text-blue-500 animate-spin" />
              <p className="text-sm text-gray-600">Uploading to R2 storage...</p>
            </>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="space-y-1">
                <p className="text-sm text-gray-600">
                  Drop an image here, or{' '}
                  <span className="text-primary-600 hover:text-primary-500 font-medium">
                    browse
                  </span>
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF, WebP up to 10MB</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* R2 Status Indicator */}
      <div className="text-xs text-gray-500 flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        Connected to Cloudflare R2 Storage
      </div>
    </div>
  );
}