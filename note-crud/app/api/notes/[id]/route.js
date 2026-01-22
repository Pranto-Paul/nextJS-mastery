import dbConnect from '@/lib/db';
import Note from '@/models/Note';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    }
    return NextResponse.json(
      { message: 'Note deleted successfully', data: {}, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting note' },
      { status: 400 }
    );
  }
}
