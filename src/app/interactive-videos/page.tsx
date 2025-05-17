
// import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { InteractiveVideoClient } from '@/components/interactive-videos/InteractiveVideoClient';
// import { mockInteractiveVideos } from '@/lib/data';

// export default function InteractiveVideosPage() {
//   return (
//     <div className="space-y-6">
//       <Card className="shadow-sm">
//         <CardHeader>
//           <CardTitle className="text-2xl font-semibold">Interactive Videos</CardTitle>
//           <CardDescription>
//             Explore a collection of videos. Select a category to filter. Timestamp-linked comments are a planned feature!
//           </CardDescription>
//         </CardHeader>
//       </Card>
//       <InteractiveVideoClient videos={mockInteractiveVideos} />
//     </div>
//   );
// }



import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { InteractiveVideoClient } from '@/components/interactive-videos/InteractiveVideoClient';
// import { mockInteractiveVideos } from '@/lib/data'; // No longer needed directly

export default function InteractiveVideosPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Interactive Videos</CardTitle>
          <CardDescription>
            Explore a collection of videos fetched by category. Select a category to view. Timestamp-linked comments are a planned feature!
          </CardDescription>
        </CardHeader>
      </Card>
      <InteractiveVideoClient /> {/* Removed videos prop */}
    </div>
  );
}