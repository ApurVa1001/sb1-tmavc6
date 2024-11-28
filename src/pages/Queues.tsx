import React from 'react';
import { useStore } from '../store/useStore';
import { Clock } from 'lucide-react';

export default function Queues() {
  const { queues, books, customers, borrowBook, removeFromQueue } = useStore();

  const queuesByBook = queues.reduce((acc, queue) => {
    if (!acc[queue.bookId]) {
      acc[queue.bookId] = [];
    }
    acc[queue.bookId].push(queue);
    return acc;
  }, {} as Record<string, typeof queues>);

  const handleIssueBook = (bookId: string, customerId: string) => {
    borrowBook(bookId, customerId);
    removeFromQueue(bookId, customerId);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Active Queues</h1>

      {Object.entries(queuesByBook).map(([bookId, bookQueues]) => {
        const book = books.find(b => b.id === bookId);
        if (!book) return null;

        return (
          <div key={bookId} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">{book.title}</h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  <Clock className="h-4 w-4 mr-1" />
                  {bookQueues.length} in queue
                </span>
              </div>
            </div>
            <ul className="divide-y divide-gray-200">
              {bookQueues
                .sort((a, b) => a.queuePosition - b.queuePosition)
                .map((queue) => {
                  const customer = customers.find(c => c.id === queue.customerId);
                  if (!customer) return null;

                  return (
                    <li key={queue.customerId} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {customer.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Joined: {new Date(queue.joinedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">
                            Position: {queue.queuePosition}
                          </span>
                          {queue.queuePosition === 1 && book.availableCopies > 0 && (
                            <button
                              onClick={() => handleIssueBook(book.id, customer.id)}
                              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                            >
                              Issue Book
                            </button>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        );
      })}

      {Object.keys(queuesByBook).length === 0 && (
        <div className="text-center py-12">
          <Clock className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No active queues</h3>
          <p className="mt-1 text-sm text-gray-500">
            There are currently no customers waiting for books.
          </p>
        </div>
      )}
    </div>
  );
}