/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { Triangle } from "lucide-react";

interface DataTableHeaderProps<TData> {
  headerGroups: HeaderGroup<TData>[];
}

export function DataTableHeader<TData>({
  headerGroups,
}: DataTableHeaderProps<TData>) {
  return (
    <TableHeader className="rounded-t-lg">
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => (
            <TableHead
            key={header.id}
            className={`bg-gray-100 text-black font-semibold ${
              index === 0 ? "rounded-tl-md" : ""
            } ${
              index === headerGroup.headers.length - 1 ? "rounded-tr-md" : ""
            } overflow-hidden text-ellipsis whitespace-nowrap ${
              header.id === "icons" ? "w-[50px] px-1 text-center" : ""
            }`}
          >
          
              {header.isPlaceholder ? null : header.id ==
                "select" ? null : header.id == "numbers" ||
                header.id == "actions" ||
                header.id == "icons" ? (
                <div className={header.id == "numbers" ? "text-center" : ""}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </div>
              ) : (
                <div
                  className="flex font-semibold bg-gray-100 hover:bg-gray-200/30 hover:cursor-pointer w-full h-full items-center"
                  onClick={() =>
                    header.column.toggleSorting(
                      header.column.getIsSorted() === "asc"
                    )
                  }
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getCanSort() && (
                    <div className="relative ml-2 flex flex-col items-center">
                      {/* Icon ASC */}
                      <Triangle
                        fill={
                          header.column.getIsSorted() === "asc"
                            ? "black"
                            : "gray"
                        }
                        size={9}
                        className="transition-opacity duration-200"
                        style={{
                          opacity:
                            header.column.getIsSorted() === "asc" ? 1 : 0.4,
                        }}
                      />
                      {/* Icon DESC */}
                      <Triangle
                        fill={
                          header.column.getIsSorted() === "desc"
                            ? "black"
                            : "gray"
                        }
                        size={9}
                        className="rotate-180 transition-opacity duration-200"
                        style={{
                          opacity:
                            header.column.getIsSorted() === "desc" ? 1 : 0.4,
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}