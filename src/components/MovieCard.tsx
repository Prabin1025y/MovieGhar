import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import Image from "next/image";
import AnimeTips from "./AnimeTips";
import { Calendar, Clock, FilePlay, Star, Video } from "lucide-react";
import Link from "next/link";
import { timeAgo } from "@/lib/utils";

interface MovieCardProps {
    id: number;
    poster: string;
    name: string;
    mediaType: string;
    releaseDate: string | null;
    averageScore: number | null;
    className?: string;
}

const MovieCard = ({
    id,
    poster,
    name,
    releaseDate,
    averageScore,
    mediaType,
    className = "",
}: MovieCardProps) => {
    return (
        <div
        title={name}
            className={`${className} group cursor-pointer transition-all duration-300 hover:scale-105 w-full`}
        >
            <div className="bg-card dark:bg-slate-800/50 border rounded-md overflow-hidden shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                <div className="relative">
                    <Link
                        href={`/anime/${id}`}
                        prefetch={false}
                    >
                        <Image
                            src={poster || "/placeholder.png"}
                            alt={name}
                            width={200}
                            height={300}
                            className="w-full aspect-[2/3] object-cover"
                        />
                    </Link>
                </div>
                <Link
                    href={`/anime/${id}`}
                    prefetch={false}
                >
                    <div className="p-2 md:p-3">
                        <h4 className="font-semibold text-xs md:text-sm truncate mb-1 md:mb-2 text-slate-900 dark:text-white">
                            {name}
                        </h4>
                        <div className="flex items-center justify-between text-[0.6rem] md:text-xs text-muted-foreground">
                            <span>{mediaType}</span>
                            <div className="flex gap-1 md:gap-2">
                                <div className="flex items-center text-yellow-500 gap-1">
                                    <Star
                                        fill="yellow"
                                        size={12}
                                    />
                                    <p>
                                        {averageScore
                                            ? averageScore.toFixed(2)
                                            : "N/A"}
                                    </p>
                                </div>
                                <div className="flex items-center text-cyan-500 gap-1">
                                    <Calendar size={12} />
                                    <p>
                                        {releaseDate
                                            ? releaseDate.split("-")[0]
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default MovieCard;
