"use client";

import { useState, useMemo, useEffect, ChangeEvent } from 'react';
import type { Note } from '@/lib/types';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Wand2, List, PlusCircle, Trash2 } from 'lucide-react';
import { formatCodeInMarkdown } from '@/app/notes/actions'; // Server Action
import { useToast } from '@/hooks/use-toast';

// Basic Markdown to HTML (very simplified)
function basicMarkdownToHtml(md: string): string {
  let html = md;
  // Headers (h1-h3)
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  // Bold
  html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
  html = html.replace(/__(.*)__/gim, '<strong>$1</strong>');
  // Italic
  html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');
  html = html.replace(/_(.*)_/gim, '<em>$1</em>');
  // Strikethrough
  html = html.replace(/~~(.*)~~/gim, '<del>$1</del>');
  // Unordered List
  html = html.replace(/^\s*[-*+] (.*)/gim, '<li>$1</li>');
  html = html.replace(/(\<li\>.*<\/li\>)+/gim, '<ul>$&</ul>'); // Wrap LIs in UL
  // Ordered List
  html = html.replace(/^\s*\d+\. (.*)/gim, '<li>$1</li>'); 
  // (Need to wrap OLs similar to ULs, more complex with nested lists)
  // Code blocks (render as pre/code for styling)
  html = html.replace(/```(\w*)\n([\s\S]*?)\n```/gim, (_match, lang, code) => 
    `<pre><code class="language-${lang || ''}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
  );
  // Inline code
  html = html.replace(/`(.*?)`/gim, '<code>$1</code>');
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" style="max-width:100%; height:auto;" />');
  // Blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
  // Horizontal Rule
  html = html.replace(/^(---|___|\*\*\*)/gim, '<hr />');
  // Paragraphs (basic: wrap lines not already in a block element)
  html = html.split('\n').map(line => {
    if (line.trim() === '' || line.match(/^<\/?(h[1-6]|ul|ol|li|blockquote|pre|hr|table|thead|tbody|tr|th|td)/i)) {
      return line;
    }
    return `<p>${line}</p>`;
  }).join('');
  // Clean up multiple <br> possibly from empty lines within paragraphs
  html = html.replace(/<p><\/p>/g, '');

  return html;
}


export function NoteEditorClient({ initialNotes }: { initialNotes: Note[] }) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(initialNotes[0]?.id || null);
  const [isFormatting, setIsFormatting] = useState(false);
  const { toast } = useToast();

  const selectedNote = useMemo(() => notes.find(n => n.id === selectedNoteId), [notes, selectedNoteId]);

  useEffect(() => {
    // Load notes from localStorage
    const storedNotes = localStorage.getItem('edupilot-notes');
    if (storedNotes) {
      const parsedNotes: Note[] = JSON.parse(storedNotes);
      setNotes(parsedNotes);
      if (parsedNotes.length > 0 && !selectedNoteId) {
        setSelectedNoteId(parsedNotes[0].id);
      }
    } else if (initialNotes.length > 0 && !selectedNoteId) {
       setSelectedNoteId(initialNotes[0].id);
    }
  }, []); // Removed selectedNoteId from dependencies to avoid re-setting on note change

  useEffect(() => {
    // Save notes to localStorage
    localStorage.setItem('edupilot-notes', JSON.stringify(notes));
  }, [notes]);


  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedNote) {
      const updatedNotes = notes.map(n =>
        n.id === selectedNoteId ? { ...n, content: e.target.value, updatedAt: new Date().toISOString() } : n
      );
      setNotes(updatedNotes);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
     if (selectedNote) {
      const updatedNotes = notes.map(n =>
        n.id === selectedNoteId ? { ...n, title: e.target.value, updatedAt: new Date().toISOString() } : n
      );
      setNotes(updatedNotes);
    }
  };

  const handleAiFormat = async () => {
    if (selectedNote) {
      setIsFormatting(true);
      try {
        const formattedContent = await formatCodeInMarkdown(selectedNote.content);
        const updatedNotes = notes.map(n =>
          n.id === selectedNoteId ? { ...n, content: formattedContent, updatedAt: new Date().toISOString() } : n
        );
        setNotes(updatedNotes);
        toast({ title: "AI Formatting Complete", description: "Code blocks in your note have been formatted." });
      } catch (error) {
        console.error("AI Formatting Error:", error);
        toast({ title: "AI Formatting Failed", description: "Could not format code. Please try again.", variant: "destructive" });
      } finally {
        setIsFormatting(false);
      }
    }
  };
  
  const addNewNote = () => {
    const newNote: Note = {
      id: String(Date.now()),
      title: "Untitled Note",
      content: "# New Note\n\nStart writing...",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
  };

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    if (selectedNoteId === noteId) {
      setSelectedNoteId(notes.length > 1 ? notes.find(n => n.id !== noteId)?.id || null : null);
    }
  };

  const markdownPreview = useMemo(() => {
    if (selectedNote) {
      return basicMarkdownToHtml(selectedNote.content);
    }
    return '<p class="text-muted-foreground italic">Select a note to edit or create a new one.</p>';
  }, [selectedNote]);


  return (
    <div className="flex flex-1 gap-4 min-h-0 overflow-hidden">
      {/* Notes List Sidebar */}
      <Card className="w-1/4 min-w-[200px] max-w-[300px] flex flex-col shadow-md">
        <CardHeader className="p-2 border-b">
          <Button onClick={addNewNote} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> New Note
          </Button>
        </CardHeader>
        <CardContent className="p-0 overflow-y-auto flex-1">
          {notes.length === 0 && <p className="p-4 text-sm text-muted-foreground text-center">No notes yet.</p>}
          <ul className="divide-y">
            {notes.map(note => (
              <li key={note.id}>
                <button
                  onClick={() => setSelectedNoteId(note.id)}
                  className={`w-full text-left p-3 hover:bg-accent/50 ${selectedNoteId === note.id ? 'bg-primary/10 text-primary font-semibold' : ''}`}
                >
                  <h3 className="truncate font-medium">{note.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {new Date(note.updatedAt).toLocaleDateString()} - {note.content.substring(0,30)}...
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Editor and Preview Panes */}
      {selectedNote ? (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
          <Card className="flex flex-col shadow-md min-h-0">
            <CardHeader className="border-b">
                <Input 
                    type="text"
                    value={selectedNote.title}
                    onChange={handleTitleChange}
                    placeholder="Note Title"
                    className="text-lg font-semibold border-0 shadow-none focus-visible:ring-0 px-1"
                />
            </CardHeader>
            <CardContent className="flex-1 p-0 min-h-0">
              <Textarea
                value={selectedNote.content}
                onChange={handleContentChange}
                placeholder="Write your Markdown here..."
                className="h-full w-full resize-none border-0 rounded-none focus-visible:ring-0 p-4 text-base"
                aria-label="Markdown editor"
              />
            </CardContent>
            <CardFooter className="border-t p-2 flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                    Last updated: {new Date(selectedNote.updatedAt).toLocaleString()}
                </p>
                <div>
                    <Button onClick={() => deleteNote(selectedNote.id)} variant="ghost" size="sm" className="text-destructive hover:text-destructive/80 mr-2">
                        <Trash2 className="mr-1 h-4 w-4" /> Delete
                    </Button>
                    <Button onClick={handleAiFormat} disabled={isFormatting} size="sm">
                        <Wand2 className="mr-2 h-4 w-4" /> {isFormatting ? 'Formatting...' : 'AI Format Code'}
                    </Button>
                </div>
            </CardFooter>
          </Card>

          <Card className="shadow-md overflow-hidden flex flex-col min-h-0">
            <CardHeader className="border-b">
              <CardTitle className="text-lg">Live Preview</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl p-4 overflow-y-auto flex-1" dangerouslySetInnerHTML={{ __html: markdownPreview }} />
          </Card>
        </div>
      ) : (
        <Card className="flex-1 flex items-center justify-center shadow-md">
            <div className="text-center">
                <List className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-medium text-foreground">No Note Selected</h3>
                <p className="mt-1 text-sm text-muted-foreground">Select a note from the list or create a new one.</p>
                <div className="mt-6">
                    <Button onClick={addNewNote}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Create New Note
                    </Button>
                </div>
            </div>
        </Card>
      )}
    </div>
  );
}
