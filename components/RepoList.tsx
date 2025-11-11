import React, { useEffect, useState, useRef } from "react";
import { searchRepos } from "../lib/api";
import RepoItem from "./RepoItem";
import type { Repo } from "../types/github";

export default function RepoList() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const perPage = 30;
  const isFetchingRef = useRef(false);

  useEffect(() => {
    const ac = new AbortController();
    const fetchData = async () => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      setLoading(true);
      setError(null);

      try {
        const result = await searchRepos({
          page,
          per_page: perPage,
          signal: ac.signal,
        });

        const newItems = result.items ?? [];
        const total = result.total_count ?? 0;

        setRepos((prev) => (page === 1 ? newItems : [...prev, ...newItems]));

        const fetchedCount = (page - 1) * perPage + newItems.length;
        setHasMore(fetchedCount < total && newItems.length === perPage);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err.message || "Failed to fetch data");
        }
      } finally {
        isFetchingRef.current = false;
        setLoading(false);
      }
    };

    fetchData();
    return () => ac.abort();
  }, [page]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      {repos.map((repo) => (
        <RepoItem key={repo.id} repo={repo} />
      ))}

      {error && (
        <div className="text-red-500 font-medium text-center">
          Error: {error}
        </div>
      )}

      {loading && (
        <div className="text-center text-gray-500 font-medium">Loading...</div>
      )}

      {!loading && hasMore && (
        <div className="text-center mt-4">
          <button
            onClick={handleLoadMore}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            Load More
          </button>
        </div>
      )}

      {!hasMore && !loading && (
        <div className="text-center text-gray-400 mt-4">No more results</div>
      )}
    </div>
  );
}
