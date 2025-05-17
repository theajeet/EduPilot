"use client";

import { useState, useMemo, useEffect } from 'react';
import type { ReadingLogEntry } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StarRating } from '@/components/shared/StarRating';
import { ArrowUpDown, PlusCircle, Edit3, Trash2, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type SortKey = keyof ReadingLogEntry | null;

export function ReadingLogTableClient({ initialEntries }: { initialEntries: ReadingLogEntry[] }) {
  const [entries, setEntries] = useState<ReadingLogEntry[]>(initialEntries);
  const [sortKey, setSortKey] = useState<SortKey>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<Partial<ReadingLogEntry> | null>(null);

  const handleSort = (key: keyof ReadingLogEntry) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedEntries = useMemo(() => {
    let filtered = entries.filter(entry =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortKey) {
      filtered.sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortOrder === 'asc' ? valA - valB : valB - valA;
        }
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return 0;
      });
    }
    return filtered;
  }, [entries, sortKey, sortOrder, searchTerm]);
  
  // Persist entries to localStorage
  useEffect(() => {
    const storedEntries = localStorage.getItem('edupilot-readinglog');
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('edupilot-readinglog', JSON.stringify(entries));
  }, [entries]);

  const openModal = (entry?: ReadingLogEntry) => {
    setCurrentEntry(entry || { title: '', author: '', status: 'To Read', rating: 0 });
    setIsModalOpen(true);
  };

  const handleSaveEntry = () => {
    if (!currentEntry || !currentEntry.title || !currentEntry.author) return;

    if (currentEntry.id) { // Update existing
      setEntries(entries.map(e => e.id === currentEntry!.id ? currentEntry as ReadingLogEntry : e));
    } else { // Add new
      setEntries([...entries, { ...currentEntry, id: String(Date.now()) } as ReadingLogEntry]);
    }
    setIsModalOpen(false);
    setCurrentEntry(null);
  };
  
  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  }

  const inputChange = (field: keyof ReadingLogEntry, value: string | number) => {
    setCurrentEntry(prev => ({ ...prev, [field]: value }) as Partial<ReadingLogEntry>);
  };


  return (
    <div className="space-y-6">
       <Card className="shadow-md">
        <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <CardTitle>Manage Your Reading</CardTitle>
                <Button onClick={() => openModal()} className="w-full sm:w-auto">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Book
                </Button>
            </div>
        </CardHeader>
        <CardContent>
            <div className="relative">
                <Input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                    aria-label="Search reading log"
                />
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
        </CardContent>
       </Card>

      <Card className="shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {['title', 'author', 'status', 'rating', 'finishDate'].map((key) => (
                  <TableHead key={key}>
                    <Button variant="ghost" onClick={() => handleSort(key as keyof ReadingLogEntry)} className="px-1">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                ))}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.title}</TableCell>
                  <TableCell>{entry.author}</TableCell>
                  <TableCell>{entry.status}</TableCell>
                  <TableCell>
                    <StarRating rating={entry.rating || 0} readOnly size={18} />
                  </TableCell>
                  <TableCell>{entry.finishDate ? new Date(entry.finishDate).toLocaleDateString() : '-'}</TableCell>
                  <TableCell className="space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => openModal(entry)} aria-label={`Edit ${entry.title}`}>
                        <Edit3 className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteEntry(entry.id)} aria-label={`Delete ${entry.title}`}>
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
      {sortedEntries.length === 0 && (
        <Card><CardContent><p className="p-6 text-center text-muted-foreground">No books found. Add some to your log!</p></CardContent></Card>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentEntry?.id ? 'Edit Book' : 'Add New Book'}</DialogTitle>
            <DialogDescription>
              {currentEntry?.id ? 'Update the details of this book.' : 'Add a new book to your reading log.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input id="title" value={currentEntry?.title || ''} onChange={(e) => inputChange('title', e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-right">Author</Label>
              <Input id="author" value={currentEntry?.author || ''} onChange={(e) => inputChange('author', e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Status</Label>
              <Select value={currentEntry?.status} onValueChange={(value) => inputChange('status', value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="To Read">To Read</SelectItem>
                  <SelectItem value="Reading">Reading</SelectItem>
                  <SelectItem value="Read">Read</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rating" className="text-right">Rating</Label>
              <div className="col-span-3">
                <StarRating rating={currentEntry?.rating || 0} onRatingChange={(r) => inputChange('rating', r)} />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="finishDate" className="text-right">Finish Date</Label>
              <Input id="finishDate" type="date" value={currentEntry?.finishDate ? new Date(currentEntry.finishDate).toISOString().split('T')[0] : ''} onChange={(e) => inputChange('finishDate', e.target.value ? new Date(e.target.value).toISOString() : '')} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">Notes</Label>
              <Textarea id="notes" value={currentEntry?.notes || ''} onChange={(e) => inputChange('notes', e.target.value)} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSaveEntry}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
