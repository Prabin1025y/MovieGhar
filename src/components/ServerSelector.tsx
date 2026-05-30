"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface ServerSelectorProps {
    currentServer: number;
    onServerChange: (serverNumber: number) => void;
    totalServers?: number;
    className?: string;
}

const ServerSelector: React.FC<ServerSelectorProps> = ({
    currentServer,
    onServerChange,
    totalServers = 4,
    className = "",
}) => {
    return (
        <div className={`flex flex-wrap gap-3 items-center ${className}`}>
            <span className="text-base font-medium text-gray-300">
                Select Server:
            </span>
            {Array.from({ length: totalServers }, (_, i) => i + 1).map(
                (serverNumber) => (
                    <Button
                        key={serverNumber}
                        onClick={() => onServerChange(serverNumber)}
                        variant={
                            currentServer === serverNumber
                                ? "default"
                                : "outline"
                        }
                        size="lg"
                        className={`${
                            currentServer === serverNumber
                                ? "bg-green-600 hover:bg-green-700 text-white border-green-600 shadow-lg"
                                : "bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600"
                        }`}
                    >
                        Server {serverNumber}
                    </Button>
                )
            )}
        </div>
    );
};

export default ServerSelector;
