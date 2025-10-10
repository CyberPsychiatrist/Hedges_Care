
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { History, RotateCcw, BookOpen, MessageCircle, Leaf } from "lucide-react";

interface DiagnosisActionsProps {
  diagnosis: string | null;
  image: string | null;
  handleReset: () => void;
}

const DiagnosisActions: React.FC<DiagnosisActionsProps> = ({
  diagnosis,
  image,
  handleReset
}) => {
  const navigate = useNavigate();

  const handleTrackTimeline = () => {
    navigate("/plant-timeline", {
      state: {
        diagnosis,
        image
      }
    });
  };

  const handleViewPlantLibrary = () => {
    navigate("/plant-library");
  };

  const handleExpertConsultation = () => {
    navigate("/specialist-chat");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mt-4">
      <Button
        variant="outline"
        onClick={handleReset}
        className="flex-1 flex items-center justify-center gap-2"
      >
        <RotateCcw className="h-4 w-4" />
        New Analysis
      </Button>
      
      {diagnosis && (
        <>
          <Button
            onClick={handleTrackTimeline}
            className="bg-blue-600 hover:bg-blue-700 text-white flex-1 flex items-center justify-center gap-2"
          >
            <Leaf className="h-4 w-4" />
            Track Growth
          </Button>
          
          <Button
            variant="outline"
            onClick={handleViewPlantLibrary}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <BookOpen className="h-4 w-4" />
            Plant Library
          </Button>
          
          <Button
            variant="outline"
            onClick={handleExpertConsultation}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Expert Help
          </Button>
        </>
      )}
    </div>
  );
};

export default DiagnosisActions;
