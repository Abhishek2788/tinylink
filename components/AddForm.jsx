"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

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

      if (!res.ok) {
        toast.error(data.error || "Failed to create link ❌");
      } else {
        onAdd(data);
        toast.success("Short link created! 🎉");
        setLongUrl("");
        setCode("");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-5 transition-all duration-300"
    >
      {/* Long URL */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
          Long URL
        </label>

        <input
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="https://example.com/very/long/url"
          className="
            w-full px-4 py-3 rounded-2xl border 
            bg-white/40 dark:bg-black/30 
            border-white/40 dark:border-white/20 
            backdrop-blur-xl shadow-sm 
            focus:ring-2 focus:ring-white/70 dark:focus:ring-white/40 
            outline-none transition text-white
          "
        />
      </div>

      {/* Custom Code */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
          Custom Code (optional)
        </label>

        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="6–8 chars (A-Za-z0-9)"
          className="
            w-full px-4 py-3 rounded-2xl border 
            bg-white/40 dark:bg-black/30 
            border-white/40 dark:border-white/20 
            backdrop-blur-xl shadow-sm 
            focus:ring-2 focus:ring-white/70 dark:focus:ring-white/40 
            outline-none transition text-white
          "
        />
      </div>

      {/* Submit */}
      <button
        disabled={loading}
        className="
          w-full px-5 py-3 rounded-2xl font-medium 
          bg-linear-to-r from-black via-gray-900 to-gray-800 
          dark:from-white dark:via-gray-200 dark:to-gray-100
          text-white dark:text-black 
          shadow-lg hover:shadow-xl 
          transition-all duration-300 active:scale-95 
          disabled:opacity-50 cursor-pointer
        "
      >
        {loading ? "Creating…" : "Create Short URL"}
      </button>

      {/* Error */}
      {error && (
        <p className="text-red-600 dark:text-red-400 mt-2">{error}</p>
      )}
    </form>
  );
}
