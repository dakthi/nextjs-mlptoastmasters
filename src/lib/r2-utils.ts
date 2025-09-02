import { convertToPublicUrl, extractKeyFromUrl } from './r2-storage';

/**
 * Get optimized image URL with Cloudflare Image Resizing
 * DISABLED: Returns original URL without optimization
 */
export function getOptimizedImageUrl(
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'auto' | 'webp' | 'avif' | 'json';
    fit?: 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad';
  } = {}
): string {
  // Return original URL without any optimization
  const publicUrl = convertToPublicUrl(url) || url;
  return publicUrl;
}

/**
 * Helper to get thumbnail URL
 * DISABLED: Returns original URL without optimization
 */
export function getThumbnailUrl(url: string, size: number = 200): string {
  // Return original URL without creating thumbnail
  return convertToPublicUrl(url) || url;
}

/**
 * Helper to get responsive image srcset
 * DISABLED: Returns single URL without responsive sizes
 */
export function getResponsiveSrcSet(url: string, sizes: number[] = [320, 640, 1024, 1920]): string {
  // Return single URL without responsive sizes
  const publicUrl = convertToPublicUrl(url) || url;
  return publicUrl;
}

/**
 * Check if a URL is an R2/CDN URL
 */
export function isR2Url(url: string): boolean {
  if (!url) return false;
  
  return (
    url.includes('r2.cloudflarestorage.com') ||
    url.includes('cdn3.chartedconsultants.com') ||
    url.includes('cdn.chartedconsultants.com')
  );
}

/**
 * Get file extension from URL
 */
export function getFileExtension(url: string): string {
  const key = extractKeyFromUrl(url) || url;
  const match = key.match(/\.([^.]+)$/);
  return match ? match[1]?.toLowerCase() || '' : '';
}

/**
 * Check if URL is an image
 */
export function isImageUrl(url: string): boolean {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'svg'];
  const ext = getFileExtension(url);
  return imageExtensions.includes(ext);
}

/**
 * Check if URL is a document
 */
export function isDocumentUrl(url: string): boolean {
  const docExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'];
  const ext = getFileExtension(url);
  return docExtensions.includes(ext);
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Generate a safe filename
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')  // Replace special chars with underscore
    .replace(/_{2,}/g, '_')            // Replace multiple underscores with single
    .replace(/^_|_$/g, '');            // Remove leading/trailing underscores
}