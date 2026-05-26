import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play,  Tv,  ArrowRight, Globe,  TabletSmartphone, PlaySquare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const features = [
    {
        icon: Tv,
        title: "HD Streaming",
        description: "Watch your favorite movies in crystal clear HD quality with no buffering.",
    },
    {
        icon: PlaySquare,
        title: "Movies + Series",
        description: "Movies and Series both available",
    },
    {
        icon: Globe,
        title: "Multi-Language",
        description: "Enjoy movies with subtitles  in multiple languages.",
    },
    {
        icon: TabletSmartphone,
        title: "All Devices",
        description: "Stream seamlessly across your phone, tablet, TV, and desktop.",
    },
]

export default function Landing() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
            {/* Hero Section */}
            <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Content */}
                        <div>
                            <Badge variant="secondary" className="mb-4 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 dark:hover:bg-emerald-800">
                                🎬 Your Own Movie Streaming Platform
                            </Badge>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent leading-tight">
                                Your Gateway to Movie Night
                            </h1>

                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                Discover blockbuster hits, timeless classics, and the latest releases. Stream your favorite movies in HD
                                quality with subtitles options.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <Button
                                    asChild
                                    size="lg"
                                    className="bg-gradient-to-r rounded-full w-full cursor-pointer from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 text-lg group"
                                >
                                    <Link href="/home" prefetch={false}>
                                        <Play className="mr-2 w-5 h-5" />
                                        Start Watching Now
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    { value: "10K+", label: "Movies Available" },
                                    { value: "500+", label: "Top Picks" },
                                    { value: "50+", label: "Languages" },
                                ].map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stat.value}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* Thumbnail/Hero Image */}
                        <div className="relative">
                            <Image
                                src="/landing.png"
                                loading="eager"
                                width={800}
                                height={600}
                                alt="Featured Movie"
                                className="w-full h-auto drop-shadow-2xl shadow-emerald-500 transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white/50 dark:bg-gray-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                            Why Choose MovieGhar?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Enjoy movie night like never before with premium streaming features built for cinematic lovers.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:-translate-y-2"
                            >
                                <CardHeader className="text-center pb-4">
                                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
