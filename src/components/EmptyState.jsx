"use client";
import findBook from "../assets/findBook.jpg";

export default function EmptyState() {
  return (
    <div className="text-center mb-8">
      <div className="flex item-center justify-center text-6xl mb-4">
        <img src={findBook} className="w-50 h-50 rounded-md" />
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
        Find Your Next Great Read
      </h2>
    </div>
  );
}
