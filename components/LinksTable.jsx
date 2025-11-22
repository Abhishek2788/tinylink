"use client";
import React from "react";

function truncate(url, n = 60) {
  if (url.length <= n) return url;
  return url.slice(0, n - 3) + "...";
}

export default function LinksTable({ links = [], onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm md:text-base">
        <thead>
          <tr className="bg-gray-100 text-white dark:bg-gray-800 text-left dark:border-gray-700">
            <th className="p-3 font-semibold">Code</th>
            <th className="p-3 font-semibold">Target URL</th>
            <th className="p-3 font-semibold">Clicks</th>
            <th className="p-3 font-semibold">Last Clicked</th>
            <th className="p-3 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {links.map((link) => (
            <tr
              key={link.code}
              className="dark:border-gray-700 transition-all 
                         hover:bg-gray-50 dark:hover:bg-gray-800/60"
            >
              {/* Code */}
              <td className="p-3 font-mono text-blue-600 dark:text-blue-400">
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
              <td className="p-3">
                <a
                  href={link.longUrl}
                  className="underline text-blue-600 dark:text-blue-400 break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {truncate(link.longUrl)}
                </a>
              </td>

              {/* Clicks */}
              <td className="p-3 text-white">{link.clicks}</td>

              {/* Last Clicked */}
              <td className="p-3 text-gray-600 dark:text-gray-400">
                {link.lastClicked
                  ? new Date(link.lastClicked).toLocaleString()
                  : "—"}
              </td>

              {/* Actions */}
              <td className="p-3 flex gap-4">
                <a
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/code/${link.code}`}
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Open
                </a>

                <button
                  onClick={() => onDelete(link.code)}
                  className="text-red-600 dark:text-red-400 hover:underline active:scale-95 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
