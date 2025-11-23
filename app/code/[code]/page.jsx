import ClientDate from "@/components/ClientDate";
import React from "react";

export default async function Page(context) {
  const { code } = await context.params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/links/${code}`,
    { cache: "no-store" }
  );

  if (res.status === 404)
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div
          className="
            max-w-md mx-auto p-8 rounded-3xl
            bg-white/40 dark:bg-black/30 
            backdrop-blur-2xl 
            border border-white/20 dark:border-white/10
            shadow-2xl
            text-center
          "
        >
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            Link Not Found
          </p>
        </div>
      </main>
    );

  const link = await res.json();

  return (
    <main className="min-h-screen px-6 py-12 space-y-12">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]">
          Stats for{" "}
          <span className="text-blue-600 dark:text-blue-300 font-mono">
            {link.code}
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Detailed performance & analytics
        </p>
      </header>

      {/* Stats Glass Card */}
      <section
        className="
          max-w-3xl mx-auto p-8 space-y-6
          bg-white/40 dark:bg-black/30
          backdrop-blur-2xl
          border border-white/20 dark:border-white/10
          shadow-xl hover:shadow-2xl
          rounded-3xl transition
        "
      >
        {/* Target URL */}
        <div>
          <p className="font-medium text-gray-700 dark:text-gray-300">
            Target URL
          </p>
          <a
            href={link.longUrl}
            target="_blank"
            className="
              text-blue-600 dark:text-blue-300 underline 
              break-all hover:text-blue-700 dark:hover:text-blue-200
              transition
            "
          >
            {link.longUrl}
          </a>
        </div>

        {/* Clicks */}
        <div>
          <p className="font-medium text-gray-700 dark:text-gray-300">
            Total Clicks
          </p>
          <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {link.clicks}
          </p>
        </div>

        {/* Last Click */}
        <div>
          <p className="font-medium text-gray-700 dark:text-gray-300">
            Last Clicked
          </p>
          <p className="text-lg text-gray-900 dark:text-gray-200">
            <ClientDate value={link.lastClicked} />
            {/* {link.lastClicked
              ? new Date(link.lastClicked).toLocaleString()
              : "Never"} */}
          </p>
        </div>

        {/* Created At */}
        <div>
          <p className="font-medium text-gray-700 dark:text-gray-300">
            Created At
          </p>
          <p className="text-lg text-gray-900 dark:text-gray-200">
            {new Date(link.createdAt).toLocaleString()}
          </p>
        </div>
      </section>

      {/* Back button */}
      <div className="text-center">
        <a
          href="/"
          className="
            inline-block px-6 py-3 rounded-2xl
            bg-linear-to-r from-blue-600 to-purple-600
            text-white font-semibold
            shadow-lg hover:shadow-xl
            transition active:scale-95
          "
        >
          Back to Dashboard
        </a>
      </div>
    </main>
  );
}
