import { NoteEditorClient } from '@/components/notes/NoteEditorClient';
import { mockNotes } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function NotesPage() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <Card className="shadow-sm flex-shrink-0">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Markdown Note Editor</CardTitle>
          <CardDescription>Create and edit your notes using Markdown. Enjoy a live preview as you type. Code blocks can be formatted using AI.</CardDescription>
        </CardHeader>
      </Card>
      <NoteEditorClient initialNotes={mockNotes} />
    </div>
  );
}
