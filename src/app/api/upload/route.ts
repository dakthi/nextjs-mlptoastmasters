import { NextRequest, NextResponse } from 'next/server';
import { uploadToR2, generateR2Key, isR2Configured } from '@/lib/r2-storage';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check R2 configuration
    if (!isR2Configured()) {
      return NextResponse.json(
        { error: 'R2 storage is not configured' },
        { status: 500 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file size (10MB limit)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique key for the file
    const key = generateR2Key(file.name, folder);

    // Upload to R2
    const result = await uploadToR2(
      key,
      buffer,
      file.type || 'application/octet-stream',
      {
        originalName: file.name,
        uploadedBy: session.user?.email || 'unknown',
        uploadedAt: new Date().toISOString(),
      }
    );

    return NextResponse.json({
      success: true,
      key: result.key,
      url: result.url,
      filename: file.name,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

// GET endpoint to check if R2 is configured
export async function GET() {
  return NextResponse.json({
    configured: isR2Configured(),
    publicUrl: process.env.R2_PUBLIC_URL || null,
  });
}