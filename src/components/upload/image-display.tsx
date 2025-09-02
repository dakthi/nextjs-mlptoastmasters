'use client';

import Image from 'next/image';
import { useState } from 'react';
import { X, Download, Eye } from 'lucide-react';
import { getThumbnailUrl, isImageUrl, formatFileSize } from '@/lib/r2-utils';

interface ImageDisplayProps {
  url: string;
  alt?: string;
  className?: string;
  showActions?: boolean;
  onDelete?: () => void;
  metadata?: {
    filename?: string;
    size?: number;
  };
}

export function ImageDisplay({
  url,
  alt = 'Image',
  className = '',
  showActions = false,
  onDelete,
  metadata,
}: ImageDisplayProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!url || !isImageUrl(url)) {
    return (
      <div className={`bg-gray-100 rounded-lg p-4 ${className}`}>
        <p className="text-sm text-gray-500">Invalid or non-image URL</p>
      </div>
    );
  }

  // Use original URL without optimization
  const thumbnailUrl = url;

  return (
    <>
      <div className={`relative group ${className}`}>
        {imageError ? (
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <p className="text-sm text-gray-500">Failed to load image</p>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-lg bg-gray-100">
            <img
              src={thumbnailUrl}
              alt={alt}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
            
            {showActions && (
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                    title="View full size"
                  >
                    <Eye className="h-5 w-5 text-gray-700" />
                  </button>
                  
                  <a
                    href={url}
                    download={metadata?.filename || 'download'}
                    className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                    title="Download"
                  >
                    <Download className="h-5 w-5 text-gray-700" />
                  </a>
                  
                  {onDelete && (
                    <button
                      onClick={onDelete}
                      className="p-2 bg-white rounded-full hover:bg-red-100 transition-colors"
                      title="Delete"
                    >
                      <X className="h-5 w-5 text-red-600" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        
        {metadata && (
          <div className="mt-2 text-sm text-gray-600">
            {metadata.filename && (
              <p className="truncate" title={metadata.filename}>
                {metadata.filename}
              </p>
            )}
            {metadata.size && (
              <p className="text-xs text-gray-500">
                {formatFileSize(metadata.size)}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Full-size image modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-full max-h-full">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-10 right-0 p-2 text-white hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
            
            <img
              src={url}
              alt={alt}
              className="max-w-full max-h-[90vh] object-contain"
            />
            
            <div className="absolute bottom-4 left-4 right-4 text-white text-center">
              {metadata?.filename && (
                <p className="text-sm">{metadata.filename}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}