import { create } from 'zustand';
import { Book, Customer, QueueItem } from '../types';
import { generateSampleData } from '../utils/sampleData';

interface StoreState {
  books: Book[];
  customers: Customer[];
  queues: QueueItem[];
  addCustomer: (customer: Customer) => void;
  updateCustomer: (customer: Customer) => void;
  deleteCustomer: (customerId: string) => void;
  borrowBook: (bookId: string, customerId: string) => void;
  returnBook: (bookId: string, customerId: string) => void;
  addToQueue: (bookId: string, customerId: string) => void;
  removeFromQueue: (bookId: string, customerId: string) => void;
}

const { sampleBooks, sampleCustomers } = generateSampleData();

export const useStore = create<StoreState>((set) => ({
  books: sampleBooks,
  customers: sampleCustomers,
  queues: [],
  
  addCustomer: (customer) =>
    set((state) => ({ customers: [...state.customers, customer] })),
    
  updateCustomer: (updatedCustomer) =>
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      ),
    })),
    
  deleteCustomer: (customerId) =>
    set((state) => ({
      customers: state.customers.filter((customer) => customer.id !== customerId),
    })),
    
  borrowBook: (bookId, customerId) =>
    set((state) => {
      const book = state.books.find((b) => b.id === bookId);
      const customer = state.customers.find((c) => c.id === customerId);
      
      if (!book || !customer || book.availableCopies === 0) return state;
      
      const updatedBooks = state.books.map((b) =>
        b.id === bookId
          ? { ...b, availableCopies: b.availableCopies - 1 }
          : b
      );
      
      const borrowedBook = {
        bookId,
        borrowDate: new Date().toISOString(),
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        returned: false,
      };
      
      const updatedCustomers = state.customers.map((c) =>
        c.id === customerId
          ? { ...c, borrowedBooks: [...c.borrowedBooks, borrowedBook] }
          : c
      );
      
      return { books: updatedBooks, customers: updatedCustomers };
    }),
    
  returnBook: (bookId, customerId) =>
    set((state) => {
      const updatedBooks = state.books.map((b) =>
        b.id === bookId
          ? { ...b, availableCopies: b.availableCopies + 1 }
          : b
      );
      
      const updatedCustomers = state.customers.map((c) =>
        c.id === customerId
          ? {
              ...c,
              borrowedBooks: c.borrowedBooks.map((bb) =>
                bb.bookId === bookId
                  ? { ...bb, returned: true, returnDate: new Date().toISOString() }
                  : bb
              ),
            }
          : c
      );
      
      return { books: updatedBooks, customers: updatedCustomers };
    }),
    
  addToQueue: (bookId, customerId) =>
    set((state) => {
      const existingQueue = state.queues.filter((q) => q.bookId === bookId);
      const queueItem: QueueItem = {
        bookId,
        customerId,
        queuePosition: existingQueue.length + 1,
        joinedDate: new Date().toISOString(),
      };
      return { queues: [...state.queues, queueItem] };
    }),
    
  removeFromQueue: (bookId, customerId) =>
    set((state) => ({
      queues: state.queues.filter(
        (q) => !(q.bookId === bookId && q.customerId === customerId)
      ),
    })),
}));