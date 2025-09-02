import { NextResponse } from 'next/server';
import { S3Client, ListBucketsCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { isR2Configured } from '@/lib/r2-storage';

export async function GET() {
  try {
    // Check if R2 is configured
    if (!isR2Configured()) {
      return NextResponse.json({
        configured: false,
        message: 'R2 storage is not configured. Please check environment variables.',
        required: [
          'R2_ACCOUNT_ID',
          'R2_ACCESS_KEY_ID',
          'R2_SECRET_ACCESS_KEY',
          'R2_BUCKET_NAME',
        ],
      }, { status: 500 });
    }

    // Create client for testing
    const client = new S3Client({
      region: process.env.R2_REGION || 'auto',
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
      },
    });

    // Test connection by listing objects in the bucket
    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME,
      MaxKeys: 5,
    });

    const response = await client.send(listCommand);

    return NextResponse.json({
      configured: true,
      connection: 'success',
      bucket: process.env.R2_BUCKET_NAME,
      publicUrl: process.env.R2_PUBLIC_URL || 'Not configured',
      objectCount: response.KeyCount || 0,
      objects: response.Contents?.map(obj => ({
        key: obj.Key,
        size: obj.Size,
        lastModified: obj.LastModified,
      })) || [],
    });

  } catch (error) {
    console.error('R2 test error:', error);
    
    return NextResponse.json({
      configured: true,
      connection: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      hint: 'Check your R2 credentials and bucket permissions',
    }, { status: 500 });
  }
}