"use client";

import { useState, useMemo, useEffect, useCallback } from 'react';
import type { InteractiveVideo, VideoCategory } from '@/lib/types';
import { fetchYouTubeVideos } from '@/ai/flows/youtube-video-fetcher-flow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { PlayCircle, Search, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const TABS_CATEGORIES: VideoCategory[] = ['all', 'education', 'motivational', 'funny', 'songs', 'movies'];

export function InteractiveVideoClient() {
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [allFetchedVideos, setAllFetchedVideos] = useState<Record<VideoCategory, InteractiveVideo[]>>({
    all: [], education: [], motivational: [], funny: [], songs: [], movies: [], other: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadVideosForCategory = useCallback(async (categoryToFetch: VideoCategory) => {
    console.log(`[Client] Attempting to load videos for category: ${categoryToFetch}`);
    setIsLoading(true);
    setError(null);

    try {
      if (categoryToFetch === 'all') {
        // Simplified skip logic for 'all': if 'all' array is populated, assume its sub-categories were attempted.
        if (allFetchedVideos.all && allFetchedVideos.all.length > 0) {
          console.log("[Client] 'All' category data already present. Skipping 'all' fetch.");
          setIsLoading(false); // Ensure loading is set to false if skipping
          return;
        }

        console.log("[Client] Fetching all sub-categories for 'All' tab.");
        const fetchableSubCategories = TABS_CATEGORIES.filter(c => c !== 'all' && c !== 'other') as Exclude<VideoCategory, 'all' | 'other'>[];
        const promises = fetchableSubCategories.map(cat =>
          fetchYouTubeVideos({ category: cat }) // Uses default maxResults from flow
        );

        const results = await Promise.all(promises);
        const combinedVideos: InteractiveVideo[] = [];
        const newFetchedVideosStateUpdate = { ...allFetchedVideos };

        results.forEach((result, index) => {
          const currentSubCategory = fetchableSubCategories[index];
          if (result.videos) {
            console.log(`[Client] Fetched ${result.videos.length} videos for sub-category: ${currentSubCategory}`);
            combinedVideos.push(...result.videos);
            newFetchedVideosStateUpdate[currentSubCategory] = result.videos;
          } else {
            console.warn(`[Client] No videos returned for sub-category: ${currentSubCategory}`);
            newFetchedVideosStateUpdate[currentSubCategory] = [];
          }
        });
        
        const uniqueCombinedVideos = Array.from(new Map(combinedVideos.map(video => [video.id, video])).values());
        newFetchedVideosStateUpdate.all = uniqueCombinedVideos;
        console.log(`[Client] Total unique videos for 'All' tab: ${uniqueCombinedVideos.length}`);
        setAllFetchedVideos(newFetchedVideosStateUpdate);

      } else if (categoryToFetch !== 'other') {
        // Fetch for a specific category if not already fetched or empty
        if (allFetchedVideos[categoryToFetch] && allFetchedVideos[categoryToFetch].length > 0) {
            console.log(`[Client] Videos for category ${categoryToFetch} are already loaded (${allFetchedVideos[categoryToFetch].length} videos). Skipping fetch.`);
            setIsLoading(false);
            return;
        }
        console.log(`[Client] Fetching specific category: ${categoryToFetch}`);
        // Ensure type compatibility for fetchYouTubeVideos
        const fetchableSpecificCategory = categoryToFetch as Exclude<VideoCategory, 'all' | 'other'>;
        const result = await fetchYouTubeVideos({ category: fetchableSpecificCategory }); // Uses default maxResults
        
        if (result.videos) {
          console.log(`[Client] Fetched ${result.videos.length} videos for category: ${categoryToFetch}`);
          setAllFetchedVideos(prev => ({ ...prev, [categoryToFetch]: result.videos || [] }));
        } else {
          console.warn(`[Client] No videos returned for category: ${categoryToFetch}`);
          setAllFetchedVideos(prev => ({ ...prev, [categoryToFetch]: [] }));
        }
      }
    } catch (err) {
      console.error(`[Client] Failed to fetch videos for category ${categoryToFetch}:`, err);
      setError(err instanceof Error ? err.message : `An unknown error occurred while fetching ${categoryToFetch} videos.`);
      if (categoryToFetch !== 'all') {
        setAllFetchedVideos(prev => ({ ...prev, [categoryToFetch]: [] }));
      }
    } finally {
      setIsLoading(false);
      console.log(`[Client] Finished loading attempt for category: ${categoryToFetch}`);
    }
  }, [allFetchedVideos]); // useCallback depends on allFetchedVideos to make decisions

  useEffect(() => {
    loadVideosForCategory(selectedCategory);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]); // Removed loadVideosForCategory from deps, it's stable due to useCallback

  const videosToDisplay = useMemo(() => {
    const currentVideos = allFetchedVideos[selectedCategory] || [];
    console.log(`[Client] Videos for display in category '${selectedCategory}': ${currentVideos.length} before search. Data:`, currentVideos);
    if (searchTerm.trim() === '') {
      return currentVideos;
    }
    const filtered = currentVideos.filter(video =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (video.description && video.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    console.log(`[Client] Videos for display in category '${selectedCategory}': ${filtered.length} after search term "${searchTerm}"`);
    return filtered;
  }, [allFetchedVideos, selectedCategory, searchTerm]);

  const VideoCardSkeleton = () => (
    <Card className="shadow-lg flex flex-col">
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/4 mt-1" />
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <Skeleton className="aspect-video w-full mb-2 rounded-md" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2 mt-auto" />
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card className="p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full sm:w-auto">
              <Input
                type="text"
                placeholder="Search displayed videos by title or description (Hindi/English)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                aria-label="Search videos"
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
        </div>
      </Card>

      <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as VideoCategory)} className="w-full">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-3 md:grid-cols-6">
          {TABS_CATEGORIES.map(category => (
            <TabsTrigger key={category} value={category} className="capitalize">{category}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => <VideoCardSkeleton key={i} />)}
        </div>
      )}

      {!isLoading && error && (
        <Card>
          <CardContent className="p-6 text-center text-destructive">
            <AlertCircle className="mx-auto h-12 w-12 mb-2" />
            <p className="font-semibold">Error loading videos</p>
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && videosToDisplay.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videosToDisplay.map(video => {
            const embedUrl = video.isPlaylist
              ? `https://www.youtube.com/embed/videoseries?list=${video.youtubeId}`
              : `https://www.youtube.com/embed/${video.youtubeId}`;
            
            return (
              <Card key={video.id} className="shadow-lg flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{video.title}</CardTitle>
                  <Badge variant="secondary" className="w-fit capitalize">{video.category}</Badge>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <div className="aspect-video w-full mb-2 rounded-md overflow-hidden bg-muted">
                    <iframe
                      width="100%"
                      height="100%"
                      src={embedUrl}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                  {video.description && (
                    <p className="text-sm text-muted-foreground mb-2">{video.description}</p>
                  )}
                  <p className="text-xs text-primary mt-auto">Timestamp-linked comments coming soon!</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
       {!isLoading && !error && videosToDisplay.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <PlayCircle className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No videos found for this category or search term.</p>
            <p className="text-xs text-muted-foreground mt-1">Try a different category or broaden your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

    