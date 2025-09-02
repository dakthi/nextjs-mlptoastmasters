'use client';

import { useState } from 'react';
import { FileUploader } from '@/components/upload/file-uploader';
import { useFileUpload } from '@/hooks/use-file-upload';

export default function TestUploadPage() {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const { deleteFile } = useFileUpload();

  const handleUploadComplete = (result: any) => {
    console.log('Upload complete:', result);
    setUploadedUrls(prev => [...prev, result.url]);
  };

  const handleDelete = async (url: string) => {
    const success = await deleteFile(url);
    if (success) {
      setUploadedUrls(prev => prev.filter(u => u !== url));
      console.log('File deleted successfully');
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">R2 Upload Test</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload Files</h2>
        <FileUploader
          onUploadComplete={handleUploadComplete}
          onError={(error) => console.error('Upload error:', error)}
          folder="test-uploads"
        />
      </div>

      {uploadedUrls.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
          <div className="space-y-4">
            {uploadedUrls.map((url, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">URL:</p>
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm break-all"
                    >
                      {url}
                    </a>
                  </div>
                  <button
                    onClick={() => handleDelete(url)}
                    className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
                
                {url.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
                  <div className="mt-4">
                    <img 
                      src={url} 
                      alt={`Upload ${index + 1}`}
                      className="max-w-full h-auto rounded border"
                      style={{ maxHeight: '200px' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}