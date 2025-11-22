"use client";
import React, { useState } from "react";

export default function AddForm({ onAdd }) {
  const [longUrl, setLongUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl, code: code || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      onAdd(data);
      setLongUrl("");
      setCode("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 transition-all duration-300">
      {/* Long URL */}
      <div className="space-y-1">
        <label className="block text-sm font-medium dark:text-gray-200">
          Long URL
        </label>

        <input
          className="w-full p-3 rounded-xl border text-white border-gray-300 dark:border-gray-700 
                     bg-white dark:bg-gray-800 
                     focus:ring-2 focus:ring-black dark:focus:ring-white 
                     outline-none transition-all"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="https://example.com/very/long/url"
        />
      </div>

      {/* Custom Code */}
      <div className="space-y-1">
        <label className="block text-sm font-medium dark:text-gray-200">
          Custom Code (optional)
        </label>

        <input
          className="w-full p-3 rounded-xl border text-white border-gray-300 dark:border-gray-700 
                     bg-white dark:bg-gray-800 
                     focus:ring-2 focus:ring-black dark:focus:ring-white 
                     outline-none transition-all"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="6–8 chars (A-Za-z0-9)"
        />
      </div>

      {/* Submit Button & Error */}
      <div className="pt-2">
        <button
          disabled={loading}
          className="px-5 py-2.5 rounded-xl bg-black dark:bg-white 
                     text-white dark:text-black font-medium
                     transition-all active:scale-95
                     disabled:opacity-60"
        >
          {loading ? "Saving…" : "Create"}
        </button>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 dark:text-red-400 mt-2 animate-pulse">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
