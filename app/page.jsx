"use client";

import React, { useEffect, useState } from "react";
import AddForm from "@/components/AddForm";
import LinksTable from "@/components/LinksTable";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLinks = async () => {
    setLoading(true);
    const res = await fetch("/api/links");
    const data = await res.json();
    setLinks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleAdd = (link) => {
    setLinks((prev) => [link, ...prev]);
  };

  const handleDelete = async (code) => {
    await fetch(`/api/links/${code}`, { method: "DELETE" });
    setLinks((prev) => prev.filter((l) => l.code !== code));
  };

  return (
    <main className="max-w-5xl mx-auto p-4 md:p-6 space-y-8 font-sans transition-all duration-300">

      {/* Header */}
      <header className="flex items-center justify-center">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">TinyLink</h1>
      </header>

      {/* Add Form Container */}
      <section
        className="rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md 
                   p-6 bg-white dark:bg-gray-900 transition-all hover:shadow-lg"
      >
        <AddForm onAdd={handleAdd} />
      </section>

      {/* Table Section */}
      <section
        className="rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md 
                   p-6 bg-white dark:bg-gray-900 transition-all hover:shadow-lg min-h-[200px]"
      >
        {loading ? (
          /* Better Skeleton Loader */
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        ) : (
          <LinksTable links={links} onDelete={handleDelete} />
        )}
      </section>

    </main>
  );
}
