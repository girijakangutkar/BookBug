"use client";

export default function ErrorMessage({ message }) {
  return (
    <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg">
      <div className="flex items-start gap-3">
        <span className="text-red-600 dark:text-red-400 text-xl mt-0.5">
          ⚠️
        </span>
        <p className="text-red-800 dark:text-red-200 text-sm font-medium">
          {message}
        </p>
      </div>
    </div>
  );
}
