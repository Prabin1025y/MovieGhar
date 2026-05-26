import AnimeCardSkeleton from "@/components/Skeleton/AnimeCardSkeleton";
import Top10Skeleton from "@/components/Skeleton/Top10Skeleton";

const loading = () => {
    return (
        <div className="w-full pt-10">
            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-4 gap-5">
                <div className="col-span-3 grid grid-cols-4 gap-3">
                    <p className="col-span-4 py-4 text-2xl text-emerald-500 font-semibold">
                        Searching...
                    </p>

                    {Array.from({ length: 15 }).map((_, index) => (
                        <AnimeCardSkeleton key={index} />
                    ))}
                </div>

                <div className="col-span-1">
                    <p className="py-4 text-2xl text-emerald-500 font-semibold">
                        Most Popular Movies
                    </p>

                    <Top10Skeleton />
                </div>
            </div>
        </div>
    );
};

export default loading;
