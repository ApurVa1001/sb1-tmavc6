export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  totalCopies: number;
  availableCopies: number;
  isbn: string;
  publishedYear: number;
  coverImage: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  borrowedBooks: BorrowedBook[];
}

export interface BorrowedBook {
  bookId: string;
  borrowDate: string;
  dueDate: string;
  returned: boolean;
  returnDate?: string;
}

export interface QueueItem {
  bookId: string;
  customerId: string;
  queuePosition: number;
  joinedDate: string;
}

export type DashboardMetric = {
  label: string;
  value: number;
  icon: React.ComponentType;
  route: string;
};