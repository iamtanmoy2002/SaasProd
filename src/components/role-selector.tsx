"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Music, Headphones } from "lucide-react";
import { useRouter } from "next/navigation";

interface RoleSelectorProps {
  userId: string;
}

export default function RoleSelector({ userId }: RoleSelectorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const selectRole = async (role: "artist" | "listener") => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/fix-rls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        router.push('/dashboard');
      } else {
        throw new Error(result.error || 'Role update failed');
      }
    } catch (error: any) {
      console.error("RoleSelector: Error updating user role:", error);
      setError(error.message || "Failed to update role. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to <span className="text-orange-500">G</span><span className="text-orange-500">r</span><span className="text-white">oo</span><span className="text-orange-500">vyy</span>!
          </h1>
          <p className="text-white text-lg">
            Choose your role to get started
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-center">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            className="bg-white border-gray-200 hover:border-orange-400 transition-all duration-300 cursor-pointer hover:scale-105 group shadow-xl"
            onClick={() => selectRole("artist")}
          >
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 gradient-bg rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Music className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-black">I'm an Artist</CardTitle>
              <CardDescription className="text-gray-600">
                Share your music, connect with fans, and monetize your
                creativity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Upload and share your tracks</li>
                <li>• Build a fanbase and get subscribers</li>
                <li>• Sell beats and samples</li>
                <li>• Track analytics and earnings</li>
              </ul>
              <Button
                className="w-full mt-4 gradient-bg hover:from-orange-600 hover:to-orange-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                disabled={isLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  selectRole("artist");
                }}
              >
                {isLoading ? "Setting up..." : "Continue as Artist"}
              </Button>
            </CardContent>
          </Card>

          <Card
            className="bg-white border-gray-200 hover:border-orange-400 transition-all duration-300 cursor-pointer hover:scale-105 group shadow-xl"
            onClick={() => selectRole("listener")}
          >
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 gradient-bg rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-black">
                I'm a Music Lover
              </CardTitle>
              <CardDescription className="text-gray-600">
                Discover amazing music, support artists, and enjoy ad-free
                listening
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Ad-free music streaming</li>
                <li>• Create personalized playlists</li>
                <li>• Subscribe to favorite artists</li>
                <li>• Direct messaging with artists</li>
              </ul>
              <Button
                className="w-full mt-4 gradient-bg hover:from-orange-600 hover:to-orange-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                disabled={isLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  selectRole("listener");
                }}
              >
                {isLoading ? "Setting up..." : "Continue as Listener"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
