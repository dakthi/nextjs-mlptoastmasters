import { NextRequest, NextResponse } from 'next/server';
import { deleteFromR2, extractKeyFromUrl, isR2Configured } from '@/lib/r2-storage';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin or officer
    if (!['admin', 'officer'].includes(session.user?.role || '')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Check R2 configuration
    if (!isR2Configured()) {
      return NextResponse.json(
        { error: 'R2 storage is not configured' },
        { status: 500 }
      );
    }

    const { key, url } = await request.json();

    // Extract key from URL if not provided directly
    const deleteKey = key || extractKeyFromUrl(url);

    if (!deleteKey) {
      return NextResponse.json(
        { error: 'No file key or URL provided' },
        { status: 400 }
      );
    }

    // Delete from R2
    await deleteFromR2(deleteKey);

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully',
      key: deleteKey,
    });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}