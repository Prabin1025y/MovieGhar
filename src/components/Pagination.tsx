"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    buildHref: (page: number) => string;
}

function getPages(current: number, total: number): (number | "...")[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
    if (current >= total - 3)
        return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    return [1, "...", current - 1, current, current + 1, "...", total];
}

const base =
    "min-w-[36px] h-9 px-2.5 flex items-center justify-center rounded-md border border-border text-sm transition-colors";

export default function Pagination({
    currentPage,
    totalPages,
    buildHref,
}: PaginationProps) {
    const pages = getPages(currentPage, totalPages);

    return (
        <nav aria-label="Pagination" className="flex flex-col gap-3">
            <div className="flex items-center gap-1.5 flex-wrap">
                {currentPage > 1 ? (
                    <Link
                        href={buildHref(currentPage - 1)}
                        aria-label="Previous page"
                        className={`${base} hover:bg-muted`}
                    >
                        <ChevronLeft size={16} />
                    </Link>
                ) : (
                    <span className={`${base} opacity-35 cursor-not-allowed`}>
                        <ChevronLeft size={16} />
                    </span>
                )}

                {pages.map((p, i) =>
                    p === "..." ? (
                        <span
                            key={`ellipsis-${i}`}
                            className="min-w-[36px] h-9 flex items-center justify-center text-sm text-muted-foreground"
                            aria-hidden="true"
                        >
                            ···
                        </span>
                    ) : (
                        <Link
                            key={p}
                            href={buildHref(p)}
                            aria-label={`Page ${p}`}
                            aria-current={p === currentPage ? "page" : undefined}
                            className={`${base} ${
                                p === currentPage
                                    ? "bg-foreground text-background border-transparent font-medium"
                                    : "hover:bg-muted"
                            }`}
                        >
                            {p}
                        </Link>
                    )
                )}

                {currentPage < totalPages ? (
                    <Link
                        href={buildHref(currentPage + 1)}
                        aria-label="Next page"
                        className={`${base} hover:bg-muted`}
                    >
                        <ChevronRight size={16} />
                    </Link>
                ) : (
                    <span className={`${base} opacity-35 cursor-not-allowed`}>
                        <ChevronRight size={16} />
                    </span>
                )}
            </div>
        </nav>
    );
}