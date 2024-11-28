import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Book } from '../types';
import { Search } from 'lucide-react';
import BookDetailsModal from '../components/BookDetailsModal';

export default function Books() {
  const { books } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const genres = Array.from(new Set(books.map(book => book.genre)));

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Books</h1>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-md"
          />
        </div>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="all">All Genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onAction={() => setSelectedBook(book)}
          />
        ))}
      </div>

      {selectedBook && (
        <BookDetailsModal
          book={selectedBook}
          isOpen={true}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}

function BookCard({ book, onAction }: { book: Book; onAction: () => void }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={book.coverImage}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
        <p className="text-sm text-gray-600">{book.author}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Available: {book.availableCopies}/{book.totalCopies}
          </span>
          <button
            onClick={onAction}
            className="px-3 py-1 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {book.availableCopies > 0 ? 'Borrow' : 'Join Queue'}
          </button>
        </div>
      </div>
    </div>
  );
}