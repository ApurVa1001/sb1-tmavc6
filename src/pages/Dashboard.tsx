import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Users, Clock, BookOpen } from 'lucide-react';
import { useStore } from '../store/useStore';
import { DashboardMetric } from '../types';

export default function Dashboard() {
  const navigate = useNavigate();
  const { books, customers, queues } = useStore();

  const metrics: DashboardMetric[] = [
    {
      label: 'Total Books',
      value: books.length,
      icon: Book,
      route: '/books',
    },
    {
      label: 'Available Books',
      value: books.reduce((acc, book) => acc + book.availableCopies, 0),
      icon: BookOpen,
      route: '/books',
    },
    {
      label: 'Active Customers',
      value: customers.length,
      icon: Users,
      route: '/customers',
    },
    {
      label: 'Active Queues',
      value: queues.length,
      icon: Clock,
      route: '/queues',
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <button
            key={metric.label}
            onClick={() => navigate(metric.route)}
            className="relative overflow-hidden rounded-lg bg-white p-6 shadow hover:shadow-md transition-shadow"
          >
            <dt>
              <div className="absolute rounded-lg bg-indigo-500 p-3">
                <metric.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {metric.label}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6">
              <p className="text-2xl font-semibold text-gray-900">
                {metric.value}
              </p>
            </dd>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <h2 className="text-base font-semibold text-gray-900">
              Recent Activities
            </h2>
            {/* Add recent activities list here */}
          </div>
        </div>

        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <h2 className="text-base font-semibold text-gray-900">
              Popular Books
            </h2>
            {/* Add popular books list here */}
          </div>
        </div>
      </div>
    </div>
  );
}