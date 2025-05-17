'use server';
/**
 * @fileOverview A Genkit flow for fetching (simulated) YouTube videos by category.
 *
 * - fetchYouTubeVideos - A function that returns a list of videos for a given category.
 * - FetchYouTubeVideosInput - The input type for the fetchYouTubeVideos function.
 * - FetchYouTubeVideosOutput - The return type for the fetchYouTubeVideos function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { InteractiveVideo, VideoCategory } from '@/lib/types';

// Define a more specific VideoCategory for input, excluding 'all' and 'other' for direct fetching
const FetchableVideoCategorySchema = z.enum(['motivational', 'funny', 'songs', 'education', 'movies']);
type FetchableVideoCategory = z.infer<typeof FetchableVideoCategorySchema>;

const FetchYouTubeVideosInputSchema = z.object({
  category: FetchableVideoCategorySchema.describe('The category of videos to fetch.'),
  maxResults: z.number().min(1).max(20).default(10).describe('Maximum number of videos to return.'), // Increased default
});
export type FetchYouTubeVideosInput = z.infer<typeof FetchYouTubeVideosInputSchema>;

// Re-using InteractiveVideo structure for output, ensure it's Zod-compatible
const InteractiveVideoSchema = z.object({
  id: z.string(),
  title: z.string(),
  youtubeId: z.string(),
  category: z.enum(['motivational', 'funny', 'songs', 'education', 'movies', 'other', 'all']),
  description: z.string().optional(),
  isPlaylist: z.boolean().optional(),
});

const FetchYouTubeVideosOutputSchema = z.object({
  videos: z.array(InteractiveVideoSchema).describe('A list of fetched video objects.'),
});
export type FetchYouTubeVideosOutput = z.infer<typeof FetchYouTubeVideosOutputSchema>;

// Simulated video data - In a real scenario, this would come from the YouTube API
const simulatedVideoDatabase: Record<FetchableVideoCategory, InteractiveVideo[]> = {
  education: [
    { id: 'edu-playlist-py', title: 'Python for Beginners to Advance', youtubeId: 'PLu0W_9lII9agwh1XjRt242xIpHhPT2llg', category: 'education', description: 'A comprehensive Python tutorial playlist.', isPlaylist: true },
    { id: 'edu-class10-math', title: 'Class 10th Math Full Course', youtubeId: '2N99sxUABqc', category: 'education', description: 'Complete math syllabus for Class 10.' },
    { id: 'edu-webdev-sigma', title: 'Sigma Web Development Course', youtubeId: 'PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w', category: 'education', description: 'Complete Web Development course.', isPlaylist: true },
    { id: 'edu-java-dsa', title: 'Java & DSA Course for Placement', youtubeId: 'PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop', category: 'education', description: 'Full Java and DSA course for placement preparation.', isPlaylist: true },
    { id: 'edu-python-dsa-hindi', title: 'DSA using Python in Hindi', youtubeId: 'PL7ersPsTyYt1HnCgrT6Up-pan4yLBpyFs', category: 'education', description: 'Data Structures and Algorithms using Python, in Hindi.', isPlaylist: true },
    { id: 'edu-os', title: 'OPERATING SYSTEM', youtubeId: 'PLmXKhU9FNesSFvj6gASuWmQd23Ul5omtD', category: 'education', description: 'Operating Systems full course playlist.', isPlaylist: true },
    { id: 'edu-dbms', title: 'DBMS', youtubeId: 'PLDzeHZWIZsTpukecmA2p5rhHM14bl2dHU', category: 'education', description: 'Database Management Systems full course playlist.', isPlaylist: true },
    { id: 'edu-cn', title: 'Computer Networks', youtubeId: 'PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx', category: 'education', description: 'Computer Networks full course playlist.', isPlaylist: true },
    { id: 'edu-system-design', title: 'System Design Playlist in Hindi', youtubeId: 'PLA3GkZPtsafZdyC5iucNM_uhqGJ5yFNUM', category: 'education', description: 'Learn system design concepts.', isPlaylist: true },
    { id: 'edu-12th-physics', title: 'Class 12th Physics', youtubeId: 'U_TVhyuaSjs', category: 'education', description: 'Physics lectures for Class 12.' },
    { id: 'edu-12th-math', title: 'Class 12th Math', youtubeId: '2jI6fHacUNI', category: 'education', description: 'Math lectures for Class 12.' },
    { id: 'edu-12th-chemistry', title: 'Class 12th Chemistry', youtubeId: 'uecGX7siidA', category: 'education', description: 'Chemistry lectures for Class 12.' },
    { id: 'edu-12th-biology', title: 'Class 12th Biology', youtubeId: '0hGFaKi7h0Y', category: 'education', description: 'Biology lectures for Class 12.' },
    { id: 'edu-11th-biology', title: 'Class 11th Biology', youtubeId: 'acZpClySY8M', category: 'education', description: 'Biology lectures for Class 11.' },
    { id: 'edu-11th-physics', title: 'Class 11th Physics', youtubeId: 'FSlOdXN7leo', category: 'education', description: 'Physics lectures for Class 11.' },
    { id: 'edu-11th-chemistry', title: 'Class 11th Chemistry', youtubeId: 'DuPGMwYrkaQ', category: 'education', description: 'Chemistry lectures for Class 11.' },
    { id: 'edu-11th-math', title: 'Class 11th Math', youtubeId: 'J8Obh-NyDV4', category: 'education', description: 'Math lectures for Class 11.' },
  ],
  motivational: [
    { id: 'motiv-1', title: 'Powerful Motivational Speech', youtubeId: 'iThssoR2qJA', category: 'motivational', description: 'Get inspired and motivated.' },
    { id: 'motiv-2', title: 'Never Give Up - Inspiration', youtubeId: '7RZne_dfg84', category: 'motivational', description: 'A video to keep you going.' },
    { id: 'motiv-3', title: 'Motivational Video 3', youtubeId: 'aNUXlU5P4vg', category: 'motivational', description: 'Inspiring message for success.' },
    { id: 'motiv-4', title: 'Motivational Video 4', youtubeId: 'uj8OKzIUM7Q', category: 'motivational', description: 'Fuel your ambition.' },
  ],
  funny: [
    { id: 'funny-1', title: 'Hilarious Comedy Sketch', youtubeId: '0CKMoDDIFFk', category: 'funny', description: 'A short funny video.' },
    { id: 'funny-2', title: 'Stand Up Comedy Clip', youtubeId: 'U_CEHOf3Wv8', category: 'funny', description: 'Laugh out loud with this clip.' },
    { id: 'funny-new-1', title: 'Funny Video Clip 1', youtubeId: '2CT0SkSySEU', category: 'funny', description: 'Funny clip.'},
    { id: 'funny-new-2', title: 'Funny Video Clip 2', youtubeId: 'A1BtCtep1t4', category: 'funny', description: 'Funny clip.'},
    { id: 'funny-new-3', title: 'Funny Video Clip 3', youtubeId: 'GamaHhPc7ic', category: 'funny', description: 'Funny clip.'},
  ],
  songs: [
    { id: 'song-heeriye', title: 'Heeriye | Jasleen Royal ft Arijit Singh', youtubeId: 'ZZ86YrRjIOs', category: 'songs', description: 'Official Video: Heeriye by Jasleen Royal ft Arijit Singh' },
    { id: 'song-ghalat-fehmi', title: 'Ghalat Fehmi | Asim Azhar & Zenab Fatimah Sultan', youtubeId: 'TFPesgueHCg', category: 'songs', description: 'From the movie Superstar.' },
    { id: 'song-ik-vaar-aa', title: 'Ik Vaar Aa | Raabta | Arijit Singh', youtubeId: 'afwruTBTILw', category: 'songs', description: 'Full Song from the movie Raabta.' },
    { id: 'song-kesariya', title: 'Kesariya | Brahmāstra', youtubeId: 'Jx3hBQBIPd0', category: 'songs', description: 'Full Video: Kesariya from Brahmāstra' },
    { id: 'song-dhunki', title: 'Dhunki | Mere Brother Ki Dulhan', youtubeId: '_wfrNbLguWw', category: 'songs', description: 'Full Song: Dhunki by Neha Bhasin' },
    { id: 'song-youtube-13', title: 'Pehle Bhi Main | ANIMAL | Ranbir Kapoor', youtubeId: 'KGn-erOG-Bs', category: 'songs', description: 'Pehle Bhi Main from ANIMAL' },
    { id: 'song-new-1', title: 'Song from YouTube 1', youtubeId: 't14j6XVGCSo', category: 'songs', description: 'Song from YouTube.'},
    { id: 'song-new-2', title: 'Song from YouTube 2', youtubeId: '5ZKLM5pNoGQ', category: 'songs', description: 'Song from YouTube.'},
    { id: 'song-new-3', title: 'Song from YouTube 3', youtubeId: 'b_l1IP_6psY', category: 'songs', description: 'Song from YouTube.'},
    { id: 'song-new-4', title: 'Song from YouTube 4', youtubeId: 'seEO3--Sy3c', category: 'songs', description: 'Song from YouTube.'},
    { id: 'song-new-5', title: 'Song from YouTube 5', youtubeId: 'GUYg6TmOZmU', category: 'songs', description: 'Song from YouTube.'},
  ],
  movies: [
    { id: 'movie-pathaan', title: 'Pathaan | Official Trailer', youtubeId: 'vqu4z34wENw', category: 'movies', description: 'Official Hindi trailer of the movie Pathaan.' },
    { id: 'movie-kgf2', title: 'K.G.F Chapter 2 Trailer Hindi', youtubeId: 'JKa05nyUmuQ', category: 'movies', description: 'Official Hindi trailer of K.G.F Chapter 2.' },
    { id: 'movie-jawan', title: 'Jawan Official Hindi Trailer | Shah Rukh Khan', youtubeId: 'MWO7xVbiS_s', category: 'movies', description: 'Official Hindi trailer of Jawan, starring Shah Rukh Khan.'},
    { id: 'movie-new-1', title: 'Hindi Movie Trailer/Clip 1', youtubeId: 'PVYjojY0_GY', category: 'movies', description: 'Trailer or clip from a Hindi movie.'},
    { id: 'movie-new-2', title: 'Hindi Movie Trailer/Clip 2', youtubeId: '35YAXDG6M7I', category: 'movies', description: 'Trailer or clip from a Hindi movie.'},
    { id: 'movie-new-3', title: 'Hindi Movie Trailer/Clip 3', youtubeId: 'O5iTrRukDq0', category: 'movies', description: 'Trailer or clip from a Hindi movie.'},
    { id: 'movie-new-4', title: 'Hindi Movie Trailer/Clip 4', youtubeId: 'Ha6PHjcg3uA', category: 'movies', description: 'Trailer or clip from a Hindi movie.'},
    { id: 'movie-new-5', title: 'Hindi Movie Trailer/Clip 5', youtubeId: 'gyOFdkWx7j0', category: 'movies', description: 'Trailer or clip from a Hindi movie.'},
    { id: 'movie-new-6', title: 'Hindi Movie Trailer/Clip 6', youtubeId: 'jv7IahQx9tA', category: 'movies', description: 'Trailer or clip from a Hindi movie.'},
    { id: 'movie-new-7', title: 'Hindi Movie Trailer/Clip 7', youtubeId: 'GW1CFj6dXsI', category: 'movies', description: 'Trailer or clip from a Hindi movie.'},
    { id: 'movie-new-8', title: 'Hindi Movie Trailer/Clip 8', youtubeId: '6M191qGTZA4', category: 'movies', description: 'Trailer or clip from a Hindi movie.'},
    { id: 'movie-new-9', title: 'Hindi Movie Trailer/Clip 9', youtubeId: 'QsWRoB2m7RM', category: 'movies', description: 'Trailer or clip from a Hindi movie.'},
    { id: 'movie-new-10', title: 'Hindi Movie Trailer/Clip 10', youtubeId: 'vcsQc4UlJ9M', category: 'movies', description: 'Trailer or clip from a Hindi movie.'},
    { id: 'movie-new-11', title: 'Hindi Movie Trailer/Clip 11', youtubeId: 'N5Gnj8voYko', category: 'movies', description: 'Trailer or clip from a Hindi movie.'},
    { id: 'movie-new-12', title: 'Hindi Movie Trailer/Clip 12', youtubeId: 'rKOTE0C3Bhw', category: 'movies', description: 'Trailer or clip from a Hindi movie.'},
    { id: 'movie-new-13', title: 'Hindi Movie Trailer/Clip 13', youtubeId: 'YssithSDYWA', category: 'movies', description: 'Trailer or clip from a Hindi movie.'},
  ],
};

export async function fetchYouTubeVideos(input: FetchYouTubeVideosInput): Promise<FetchYouTubeVideosOutput> {
  // This is a wrapper for the Genkit flow
  return fetchYouTubeVideosFlow(input);
}

const fetchYouTubeVideosFlow = ai.defineFlow(
  {
    name: 'fetchYouTubeVideosFlow',
    inputSchema: FetchYouTubeVideosInputSchema,
    outputSchema: FetchYouTubeVideosOutputSchema,
  },
  async (input) => {
    // Simulate API call
    console.log(`[FLOW] Simulating fetching up to ${input.maxResults} YouTube videos for category: ${input.category}`);
    
    const rawCategoryVideos = simulatedVideoDatabase[input.category] || [];
    console.log(`[FLOW] Raw videos for category '${input.category}' before slice: ${rawCategoryVideos.length} videos. Titles: ${JSON.stringify(rawCategoryVideos.map(v=>v.title))}`);

    const videosToReturn = rawCategoryVideos.slice(0, input.maxResults);
    console.log(`[FLOW] Videos to return for category '${input.category}' after slice (${input.maxResults}): ${videosToReturn.length} videos. Titles: ${JSON.stringify(videosToReturn.map(v=>v.title))}`);

    if (videosToReturn.length === 0 && rawCategoryVideos.length > 0) {
      console.warn(`[FLOW] Slicing resulted in 0 videos for category: ${input.category}, though raw data had ${rawCategoryVideos.length}. Max results: ${input.maxResults}`);
    }
    if (rawCategoryVideos.length === 0) {
        console.warn(`[FLOW] No simulated videos found at all in database for category: ${input.category}`);
    }
    
    // Ensure all videos returned have the correct category matching the input, as database might be less strict
    const correctlyCategorizedVideos = videosToReturn.map(v => ({...v, category: input.category}));

    return { videos: correctlyCategorizedVideos };
  }
);

  