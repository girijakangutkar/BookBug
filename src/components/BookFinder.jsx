import { useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";

import book from "../assets/books.png";

export default function BookFinder() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const searchBooks = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Please enter a book title");
      return;
    }

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`
      );

      if (response.data.docs.length === 0) {
        setError("No books found. Try a different search term.");
        setBooks([]);
      } else {
        setBooks(response.data.docs);
        setError("");
      }
    } catch (err) {
      setError("Failed to fetch books. Please try again later.");
      setBooks([]);
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setQuery("");
    setBooks([]);
    setError("");
    setHasSearched(false);
  };

  const isEmptyState = !hasSearched || (books.length === 0 && !loading);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex flex-col gap-4 items-center justify-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <img
                    src={book}
                    alt="Book Bug Logo"
                    className="w-15 h-15 rounded-full"
                  />
                  Book Bug
                </h1>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Discover your next favorite book
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {isEmptyState ? (
          <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4">
            <div className="flex flex-col justify-center items-center w-full max-w-2xl">
              <EmptyState />
              <SearchBar
                query={query}
                setQuery={setQuery}
                onSearch={searchBooks}
                loading={loading}
              />
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <SearchBar
                query={query}
                setQuery={setQuery}
                onSearch={searchBooks}
                loading={loading}
                compact
              />
              {hasSearched && (
                <button
                  onClick={handleClearSearch}
                  className="mt-3 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  ← Clear search
                </button>
              )}
            </div>

            {/* Error Message */}
            {error && <ErrorMessage message={error} />}

            {/* Loading State */}
            {loading && <LoadingSpinner />}

            {/* Results */}
            {!loading && books.length > 0 && (
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  Found{" "}
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {books.length}
                  </span>{" "}
                  books
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {books.map((book, index) => (
                    <BookCard key={`${book.key}-${index}`} book={book} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
