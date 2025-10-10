
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Play, Clock } from "lucide-react";
import { VideoTutorial } from "@/types/video";

interface VideoTutorialCardProps {
  video: VideoTutorial;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

const VideoTutorialCard: React.FC<VideoTutorialCardProps> = ({ video, onSelect, isSelected }) => {
  const handleCardClick = () => {
    onSelect(video.id);
  };

  return (
    <Card
      className={`cursor-pointer transition-shadow hover:shadow-lg ${
        isSelected ? 'border-green-500 border-2' : ''
      }`}
      onClick={handleCardClick}
    >
      <CardHeader className="py-3 px-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="text-green-600">
              <Play className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-md font-medium text-green-800">{video.title}</CardTitle>
              <p className="text-xs text-gray-500">{video.instructor.name}</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
            {video.category === 'plants' ? 'Plants' :
             video.category === 'landscaping' ? 'Landscaping' :
             video.category === 'nft' ? 'NFT & Tech' : video.category.charAt(0).toUpperCase() + video.category.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="py-2 px-4">
        <CardDescription className="text-sm line-clamp-2">
          {video.description}
        </CardDescription>
      </CardContent>
      <CardContent className="py-2 px-4">
        <div className="flex items-center justify-between w-full text-xs text-gray-500">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{video.duration}</span>
          </div>
          <div className="flex items-center">
            <span>👁️ </span>
            <span className="ml-1">{video.views}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoTutorialCard;
