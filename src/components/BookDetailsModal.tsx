import React from 'react';
import { useStore } from '../store/useStore';
import { Book as BookIcon, X } from 'lucide-react';
import { Book, Customer } from '../types';
import { format } from 'date-fns';

interface BookDetailsModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookDetailsModal({ book, isOpen, onClose }: BookDetailsModalProps) {
  const { customers, borrowBook, addToQueue } = useStore();
  const [selectedCustomerId, setSelectedCustomerId] = React.useState('');

  if (!isOpen) return null;

  const handleAction = () => {
    if (!selectedCustomerId) return;
    
    if (book.availableCopies > 0) {
      borrowBook(book.id, selectedCustomerId);
    } else {
      addToQueue(book.id, selectedCustomerId);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Book Details</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex gap-6">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-32 h-48 object-cover rounded-md"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
              <p className="text-gray-600">{book.author}</p>
              <p className="text-sm text-gray-500 mt-2">Genre: {book.genre}</p>
              <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
              <p className="text-sm text-gray-500">Published: {book.publishedYear}</p>
              <p className="text-sm text-gray-500 mt-2">
                Available Copies: {book.availableCopies}/{book.totalCopies}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
              Select Customer
            </label>
            <select
              id="customer"
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAction}
              disabled={!selectedCustomerId}
              className={`px-4 py-2 rounded-md text-white ${
                selectedCustomerId
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {book.availableCopies > 0 ? 'Borrow Book' : 'Join Queue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}