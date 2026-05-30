"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import AnimeCardsGridSkeleton, {
    EpisodeSelectorSkeleton,
    VideoInfoSkeleton,
} from "../../components/Skeletons";
import VideoInfo from "../../components/VideoInfo";
import MovieContainer from "@/components/AnimeListingHomePage/MovieContainer";
import { SeriesDetails, TVShow } from "@/types/series";
import EpisodeSelector from "../../components/EpisodeSelector";
import { getSeriesDetail } from "@/lib/data";
import ServerSelector from "@/components/ServerSelector";

interface ResponseData {
    details: SeriesDetails;
    recommendations: TVShow[];
}

const VideoPlayerPage: React.FC = () => {
    const [seriesData, setSeriesData] = useState<ResponseData | null>(null);
    const [othersLoading, setOthersLoading] = useState(true);
    const [selectedServer, setSelectedServer] = useState(1);

    const params = useParams<{ id: string }>();
    const seriesId = params.id;
    const searchParams = useSearchParams();
    const episode = searchParams.get("ep");
    const season = searchParams.get("s") || "1";
    const [serverURL, setServerURL] = useState(
        process.env.NEXT_PUBLIC_SERVER_1 || "",
    );

    const SERVER_MAP: Record<number, string> = {
        1: `${process.env.NEXT_PUBLIC_SERVER_1}/tv`,
        2: `${process.env.NEXT_PUBLIC_SERVER_2}/tv`,
        3: `${process.env.NEXT_PUBLIC_SERVER_3}/tv`,
        4: `${process.env.NEXT_PUBLIC_SERVER_4}/tv`,
    };

    const iframeElement = useRef<HTMLIFrameElement>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setOthersLoading(true);
                const data: ResponseData = await getSeriesDetail(seriesId);
                setSeriesData(data);
            } catch (error) {
                console.log(error);
                toast.error("Error occured!!");
            } finally {
                setOthersLoading(false);
            }
        };
        fetchData();
    }, [seriesId]);

    useEffect(() => {
        setServerURL(SERVER_MAP[selectedServer]);
    }, [selectedServer]);

    return (
        <div className="min-h-screen p-4 pt-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col gap-6">
                    <ServerSelector
                        currentServer={selectedServer}
                        onServerChange={setSelectedServer}
                        totalServers={4}
                        className="mb-4"
                    />
                    <div className="w-full max-w-7xl aspect-video bg-black rounded-lg flex items-center justify-center">
                        {season && episode ? (
                            <iframe
                                key={`${selectedServer}-${season}-${episode}`}
                                ref={iframeElement}
                                // sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
                                src={`${serverURL}/${seriesId}/${season}/${episode}`}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div>Please select an episode</div>
                        )}
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
                            {seriesData?.details && (
                                <EpisodeSelector
                                    series={seriesData?.details}
                                    className=" overflow-y-auto"
                                />
                            )}
                            {seriesData?.details && (
                                <VideoInfo data={seriesData.details} />
                            )}

                            {seriesData?.recommendations?.length ? (
                                <div className="max-w-7xl mx-auto grid gap-8">
                                    <MovieContainer
                                        movies={seriesData.recommendations}
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
