import { Building2, Calendar, Star, Users } from "lucide-react";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { MovieDetails } from "@/types/movie";
import { SeriesDetails } from "@/types/series";

interface VideoInfoProps {
    className?: string;
    data: MovieDetails | SeriesDetails;
}

const VideoInfo: React.FC<VideoInfoProps> = ({ className = "", data }) => {
    return (
        <div
            className={`${className} bg-white dark:bg-gray-900 rounded-lg p-6 grid gap-6 grid-cols-4 grid-rows-[auto auto] items-start`}
        >
            {/* Poster */}
            {data.backdrop_path && (
                <div className="relative row-start-1 col-start-1 col-span-1 w-32 hidden sm:block lg:w-40 xl:w-48 aspect-[2/3] overflow-hidden">
                    <Image
                        src={data.backdrop_path}
                        alt={
                            ("title" in data ? data.title : data.name) +
                            " Poster"
                        }
                        className="rounded-lg object-cover shadow-lg border border-gray-800"
                        fill
                    />
                </div>
            )}
            {/* Info */}
            <div className="sm:row-start-1 sm:col-start-2 col-span-4 sm:col-span-3 space-y-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-primary mb-2">
                            {"title" in data
                                ? data.title
                                : data.name || "No Title"}
                        </h1>
                        <div className="flex items-center space-x-4 text-sm text-gray-800 dark:text-gray-100 mb-4">
                            <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>
                                    {data.vote_average
                                        ? data.vote_average.toFixed(2)
                                        : "N/A"}
                                </span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>
                                    {"release_date" in data
                                        ? data.release_date
                                        : data.first_air_date || "N/A"}
                                </span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Building2 className="w-4 h-4" />
                                <span>
                                    {data.production_companies?.reduce(
                                        (prev, studio, index) =>
                                            prev +
                                            `${index === 0 ? "" : ","}` +
                                            ` ${studio.name}`,
                                        "",
                                    ) || "N/A"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-gray-800 dark:text-gray-100 leading-relaxed line-clamp-3">
                    {data.overview || ""}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {data.genres?.map((genre) => (
                        <span
                            key={genre.id}
                            className="px-3 py-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm rounded-full"
                        >
                            {genre.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VideoInfo;
