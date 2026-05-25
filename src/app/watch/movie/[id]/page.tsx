"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import AnimeCardsGridSkeleton, {
    EpisodeSelectorSkeleton,
    VideoInfoSkeleton,
} from "../../components/Skeletons";
import VideoInfo from "../../components/VideoInfo";
import { Movie, MovieDetails } from "@/types/movie";
import { getMovieDetail } from "@/lib/data";
import MovieContainer from "@/components/AnimeListingHomePage/MovieContainer";

interface ResponseData {
    details: MovieDetails;
    recommendations: Movie[];
}

const VideoPlayerPage: React.FC = () => {
    const [movieData, setMovieData] = useState<ResponseData | null>(null);
    const [othersLoading, setOthersLoading] = useState(true);

    const params = useParams<{ id: string }>();
    const movieId = params.id;

    const iframeElement = useRef<HTMLIFrameElement>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setOthersLoading(true);
                const data: ResponseData = await getMovieDetail(movieId);
                setMovieData(data);
            } catch (error) {
                console.log(error);
                toast.error("Error occured!!");
            } finally {
                setOthersLoading(false);
            }
        };
        fetchData();
    }, [movieId]);

    return (
        <div className="min-h-screen p-4 pt-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col gap-6">
                    <div className="w-full max-w-7xl aspect-video bg-black rounded-lg flex items-center justify-center">
                        <iframe
                            ref={iframeElement}
                            // sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
                            src={`${process.env.NEXT_PUBLIC_SERVER_1}/movie/${movieId}`}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>

                    {othersLoading ? (
                        <>
                            <EpisodeSelectorSkeleton />
                            <VideoInfoSkeleton />
                            <AnimeCardsGridSkeleton noOfElements={5} />
                            <AnimeCardsGridSkeleton noOfElements={5} />
                            <AnimeCardsGridSkeleton noOfElements={5} />
                        </>
                    ) : (
                        <>
                            {movieData?.details && (
                                <VideoInfo data={movieData.details} />
                            )}

                            {movieData?.recommendations?.length ? (
                                <div className="max-w-7xl mx-auto grid gap-8">
                                    <MovieContainer
                                        movies={movieData.recommendations}
                                        title="Recommendations"
                                    />
                                </div>
                            ) : null}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoPlayerPage;
