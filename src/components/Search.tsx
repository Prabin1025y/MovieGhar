"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { ArrowRight, Search, Star } from "lucide-react";
import { Popover, PopoverContent, PopoverAnchor } from "./ui/popover";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSearchSuggestions } from "@/lib/data";
import { SearchResult } from "@/types/search";

const SearchInput = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
    const searchRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            if (searchTerm.trim() !== "") {
                setIsPopoverOpen(true);
                const data: SearchResult[] = await getSearchSuggestions(searchTerm);
                setSuggestions(data);
            } else {
                setSuggestions([]);
                setIsPopoverOpen(false);
            }
        };

        // Debounce the API call to limit requests to once every 500 milliseconds
        const timeoutId = setTimeout(fetchData, 500);

        // Cleanup timeout if searchTerm changes before 500 milliseconds
        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const onOpenChange = () => {
        // setIsPopoverOpen(open);
    };

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPopoverOpen(false);
        setSearchTerm("");
        router.push(`/search?query=${searchTerm}`);
    };

    const handleOnBlur = () => {
        setTimeout(() => {
            setIsPopoverOpen(false);
        }, 100);
    };
    return (
        <div>
            <Popover
                open={
                    isPopoverOpen &&
                    suggestions.length > 0 &&
                    searchTerm.trim() !== ""
                }
                onOpenChange={onOpenChange}
            >
                {/* <PopoverTrigger asChild> */}
                <PopoverAnchor
                    asChild
                    className="relative flex items-center"
                >
                    <form onSubmit={handleOnSubmit}>
                        <Input
                            onFocus={() => setIsPopoverOpen(true)}
                            onBlur={handleOnBlur}
                            ref={searchRef}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type="text"
                            placeholder="Search..."
                            className="pl-10 w-48 md:w-xs peer focus-visible:ring-0 focus-visible:border-emerald-500"
                        />
                        <Search className="absolute left-2 h-4 w-4 text-slate-700 dark:text-slate-300 peer-focus:text-emerald-500 dark:peer-focus:text-emerald-400 " />
                        <Button
                            asChild
                            className={`absolute right-0 h-full hover:bg-emerald-600 rounded-l-none bg-emerald-500 transition-opacity ${searchTerm.trim() !== "" ? "opacity-100" : "opacity-0"}`}
                        >
                            <Link
                                href={`/search/${searchTerm}`}
                                prefetch={false}
                            >
                                <ArrowRight />
                            </Link>
                        </Button>
                    </form>
                </PopoverAnchor>
                {/* </PopoverTrigger> */}
                <PopoverContent
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    className="w-80 p-1 bg-emerald-50 dark:bg-[#0a2e1e] border-emerald-600"
                >
                    <div className="grid gap-2">
                        {suggestions.map((suggestion, index) => (
                            <Link
                                prefetch={false}
                                href={`/anime/${suggestion.id}`}
                                key={`${suggestion.id}-${index}`}
                                className="w-full h-16 hover:bg-emerald-100/20 cursor-pointer rounded-md flex items-center gap-2"
                            >
                                <Image
                                    src={
                                        suggestion.poster_path ||
                                        "/placeholder.png"
                                    }
                                    alt={`${suggestion.title || suggestion.name || "Movie"} poster`}
                                    width={40}
                                    height={60}
                                    className="bg-gray-500 object-cover"
                                />
                                <div>
                                    <p className="font-semibold line-clamp-1">
                                        {suggestion.title ||
                                            suggestion.name ||
                                            "No Title"}
                                    </p>
                                    <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-400">
                                        {suggestion.vote_average && (
                                            <span className="flex gap-1 items-center text-yellow-500">
                                                <Star
                                                    fill="yellow"
                                                    className="text-yellow-500"
                                                    size={15}
                                                />
                                                {suggestion.vote_average.toFixed(
                                                    2,
                                                )}
                                            </span>
                                        )}
                                        {suggestion.media_type && (
                                            <span>{suggestion.media_type}</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default SearchInput;
