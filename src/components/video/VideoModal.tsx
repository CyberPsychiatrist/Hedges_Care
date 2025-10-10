
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Play, ExternalLink, Clock, Eye, Users } from "lucide-react";
import { VideoTutorial } from "@/types/video";

interface VideoModalProps {
  video: VideoTutorial;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  const handleOpenInYouTube = () => {
    const baseUrl = import.meta.env.VITE_YOUTUBE_BASE_URL || 'https://www.youtube.com';
    window.open(`${baseUrl}/watch?v=${video.youtubeId}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          src={`${import.meta.env.VITE_YOUTUBE_EMBED_URL || 'https://www.youtube.com/embed'}/${video.youtubeId}?autoplay=0&rel=0&modestbranding=1&controls=1&showinfo=0`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      
      {/* Video Info */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-xl text-green-800 mb-2">{video.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                  {video.category === 'plants' ? 'Plants' :
                   video.category === 'landscaping' ? 'Landscaping' :
                   video.category === 'nft' ? 'NFT & Tech' : video.category.charAt(0).toUpperCase() + video.category.slice(1)}
                </Badge>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{video.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{video.views} views</span>
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={onClose} className="ml-4">
              Close
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Instructor Info */}
          <div className="flex items-center mb-4">
            <Avatar className="h-12 w-12 mr-3">
              <AvatarImage src={video.instructor.avatar} />
              <AvatarFallback className="bg-green-100 text-green-800">
                {video.instructor.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-green-800">{video.instructor.name}</h3>
              <p className="text-sm text-gray-600">Agricultural Expert</p>
            </div>
          </div>
          
          {/* Video Description */}
          <p className="text-gray-700 mb-6 leading-relaxed">{video.description}</p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={handleOpenInYouTube}
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Open in YouTube
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoModal;
