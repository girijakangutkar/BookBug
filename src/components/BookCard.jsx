"use client";

export default function BookCard({ book }) {
  const coverId = book.cover_i;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "/OIP.webp";

  const authors = book.author_name?.join(", ") || "Unknown Author";
  const year = book.first_publish_year || "N/A";
  const edition = book.edition_count || 0;

  return (
    <div className="group h-full bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-slate-200 dark:border-slate-700">
      {/* Book Cover */}
      <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-700 aspect-[3/4]">
        <img
          src={coverUrl || "/placeholder.svg"}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "/abstract-book-cover.png";
          }}
        />
      </div>

      {/* Book Info */}
      <div className="p-4 flex flex-col h-full">
        <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2 text-sm mb-2 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
          {book.title}
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 mb-3">
          {authors}
        </p>

        <div className="mt-auto space-y-2 text-xs text-slate-500 dark:text-slate-500">
          <div className="flex justify-between items-center">
            <span className="text-slate-600 dark:text-slate-400">
              Published:
            </span>
            <span className="font-medium text-slate-900 dark:text-white">
              {year}
            </span>
          </div>
          {edition > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">
                Editions:
              </span>
              <span className="font-medium text-slate-900 dark:text-white">
                {edition}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
