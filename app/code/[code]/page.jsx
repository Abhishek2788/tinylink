import React from "react";

export default async function Page(context) {
  const { code } = await context.params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/links/${code}`
  );

  if (res.status === 404)
    return (
      <main className="p-6 text-center text-lg font-medium">
        <div className="max-w-md mx-auto p-6 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md">
          <p className="text-red-600 dark:text-red-400">Link Not Found</p>
        </div>
      </main>
    );

  const link = await res.json();

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">

      <header>
        <h1 className="text-2xl text-center font-bold tracking-tight">Stats for {link.code}</h1>
        <p className="text-green-500 text-center dark:text-gray-400 mt-1">
          Detailed statistics and history
        </p>
      </header>

      <section
        className="rounded-2xl border border-gray-300 dark:border-gray-700 
                   bg-white dark:bg-gray-900 shadow-md p-6 space-y-4 
                   transition-all hover:shadow-lg"
      >

        {/* Target URL */}
        <div>
          <p className="font-medium text-gray-700 dark:text-gray-300">Target URL</p>
          <a
            href={link.longUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline break-all"
          >
            {link.longUrl}
          </a>
        </div>

        {/* Clicks */}
        <div>
          <p className="font-medium text-gray-700 dark:text-gray-300">Total Clicks</p>
          <p className="text-lg font-semibold text-white">{link.clicks}</p>
        </div>

        {/* Last Clicked */}
        <div>
          <p className="font-medium text-gray-700 dark:text-gray-300">Last Clicked</p>
          <p className="text-white">
            {link.lastClicked
              ? new Date(link.lastClicked).toLocaleString()
              : "Never"}
          </p>
        </div>

        {/* Created At */}
        <div>
          <p className="font-medium text-gray-700 dark:text-gray-300">Created At</p>
          <p className="text-white">{new Date(link.createdAt).toLocaleString()}</p>
        </div>

      </section>
    </main>
  );
}
