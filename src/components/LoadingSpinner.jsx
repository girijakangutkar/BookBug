"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-slate-900 dark:border-t-white animate-spin"></div>
      </div>
      <p className="text-slate-600 dark:text-slate-400 font-medium">
        Searching for books...
      </p>
    </div>
  );
}
