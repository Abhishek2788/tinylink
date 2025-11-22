"use client";
import React, { useEffect, useState } from "react";
import AddForm from "@/components/AddForm";
import LinksTable from "@/components/LinksTable";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLinks = async () => {
    setLoading(true);
    const res = await fetch("/api/links", { cache: "no-store" });
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
    try {
      const res = await fetch(`/api/links/${code}`, { method: "DELETE" });

      if (!res.ok) {
        toast.error("Failed to delete link ❌");
        return;
      }

      setLinks((prev) => prev.filter((l) => l.code !== code));
      toast.success("Link deleted successfully 🗑️✨");
    } catch (error) {
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-black transition-all duration-500">

      {/* Centered Wrapper */}
      <div className="max-w-5xl mx-auto p-6 space-y-10">

        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight 
          bg-clip-text text-transparent 
          bg-linear-to-r from-blue-600 to-purple-600 
          dark:from-blue-400 dark:to-purple-400">

            TinyLink
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base">
            Create & manage your short URLs with a premium experience ✨
          </p>
        </header>

        {/* Glass Card for Add Form */}
        <section className="
          backdrop-blur-xl bg-white/30 dark:bg-white/5 
          border border-white/40 dark:border-gray-700/40 
          shadow-[0_8px_32px_rgba(0,0,0,0.10)] 
          rounded-3xl p-6 transition-all duration-500
          hover:shadow-[0_12px_40px_rgba(0,0,0,0.20)]
        ">
          <AddForm onAdd={handleAdd} />
        </section>

        {/* Glass Table Container */}
        <section className="
          backdrop-blur-xl bg-white/30 dark:bg-white/5 
          border border-white/40 dark:border-gray-700/40 
          shadow-[0_8px_32px_rgba(0,0,0,0.10)]
          rounded-3xl p-6 min-h-60
          transition-all duration-500
          hover:shadow-[0_12px_40px_rgba(0,0,0,0.20)]
        ">
          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 w-1/3 rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-4 w-2/3 rounded bg-gray-300 dark:bg-gray-700"></div>
            </div>
          ) : (
            <LinksTable links={links} onDelete={handleDelete} />
          )}
        </section>
      </div>
    </main>
  );
}
