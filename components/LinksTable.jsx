"use client";
import React from "react";

function truncate(url, n = 60) {
  if (url.length <= n) return url;
  return url.slice(0, n - 3) + "...";
}

export default function LinksTable({ links = [], onDelete }) {
  return (
    <div className="overflow-x-auto w-full hide-scrollbar">
      <table className="min-w-[700px] w-full border-collapse text-sm md:text-base">
        <thead>
          <tr
            className="
              bg-white/20 dark:bg-white/10 
              backdrop-blur-xl 
              text-gray-900 dark:text-gray-200 
              border-b border-white/20 dark:border-white/10
              shadow-sm
            "
          >
            <th className="p-4 font-semibold">Short Code</th>
            <th className="p-4 font-semibold">Target URL</th>
            <th className="p-4 font-semibold">Clicks</th>
            <th className="p-4 font-semibold">Last Clicked</th>
            <th className="p-4 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {links.map((link) => (
            <tr
              key={link.code}
              className="
                border-b border-white/10
                bg-white/30 dark:bg-black/20
                backdrop-blur-xl
                transition-all 
                hover:bg-white/50 dark:hover:bg-white/30
                hover:shadow-md mt-1
              "
            >
              {/* Short Code */}
              <td className="p-4 font-mono text-blue-600 dark:text-blue-300">
                <a
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/${link.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {link.code}
                </a>
              </td>

              {/* Target URL */}
              <td className="p-4 text-gray-800 dark:text-gray-200 break-all">
                <a
                  href={link.longUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-500 dark:hover:text-blue-300 transition"
                >
                  {truncate(link.longUrl)}
                </a>
              </td>

              {/* Clicks */}
              <td className="p-4 font-semibold text-gray-900 dark:text-gray-100">
                {link.clicks}
              </td>

              {/* Last Clicked */}
              <td className="p-4 text-gray-600 dark:text-gray-400">
                {link.lastClicked
                  ? new Date(link.lastClicked).toLocaleString()
                  : "—"}
              </td>

              {/* Actions */}
              <td className="p-4">
                <div className="flex gap-4 items-center">
                  {/* Status Page */}
                  <a
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/code/${link.code}`}
                    className="
                      text-blue-600 dark:text-blue-300 
                      hover:text-blue-700 dark:hover:text-blue-200 
                      underline
                      transition
                    "
                  >
                    Status
                  </a>

                  {/* Delete Button */}
                  <button
                    onClick={() => onDelete(link.code)}
                    className="
                      text-red-600 dark:text-red-400 
                      hover:text-red-700 dark:hover:text-red-300 
                      underline
                      transition active:scale-95
                    "
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
