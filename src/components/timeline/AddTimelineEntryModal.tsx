
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TimelineEntryProps, TimelineEntryStatus } from "./TimelineEntry";
import { Upload, Loader2, TreePine, Leaf, Droplets, Info, Calendar, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PlantData } from "@/services/enhancedAIService";
import { format } from "date-fns";

interface AddTimelineEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: TimelineEntryProps) => void;
  currentImage?: string;
  scanData?: {
    diagnosis: string;
    plantData: PlantData;
    confidence: number;
    image: string;
  };
}

const AddTimelineEntryModal: React.FC<AddTimelineEntryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentImage,
  scanData,
}) => {
  const [image, setImage] = useState<string | null>(currentImage || null);
  const [notes, setNotes] = useState(scanData ? scanData.diagnosis : "");
  const [status, setStatus] = useState<TimelineEntryStatus>("unchanged");
  const [treatmentApplied, setTreatmentApplied] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // Auto-populate with scan data if available
  React.useEffect(() => {
    if (scanData) {
      setImage(scanData.image);
      setNotes(scanData.diagnosis);
    }
  }, [scanData]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!image) {
      toast({
        title: "Image Required",
        description: "Please upload an image of your plant.",
        variant: "destructive",
      });
      return;
    }

    if (!notes) {
      toast({
        title: "Notes Required",
        description: "Please add some notes about the plant's condition.",
        variant: "destructive",
      });
      return;
    }

    const newEntry: TimelineEntryProps = {
      date: new Date(),
      dateFormatted: format(new Date(), "MMM d, yyyy 'at' h:mm a"),
      image,
      notes,
      status,
      treatmentApplied: treatmentApplied || undefined,
      // Include scan data if available
      ...(scanData && {
        diagnosis: scanData.diagnosis,
        commonName: scanData.plantData.common_name,
        plantType: scanData.plantData.plant_type,
        confidence: scanData.confidence,
        co2Absorption: scanData.plantData.co2_absorption,
        growthConditions: scanData.plantData.growth_conditions,
      }),
    };

    onSave(newEntry);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setImage(currentImage || null);
    setNotes("");
    setStatus("unchanged");
    setTreatmentApplied("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Timeline Entry</DialogTitle>
          <DialogDescription>
            {scanData ? (
              <>
                Record the current state of your <strong>{scanData.plantData.common_name}</strong> and any treatments applied.
              </>
            ) : (
              "Record the current state of your plant and any treatments applied."
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Show plant information if scan data is available */}
          {scanData && (
            <div className="space-y-4">
              {/* Plant Information Card */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Plant Information
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Species:</span>
                    <p className="text-gray-600">{scanData.plantData.species_name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Common Name:</span>
                    <p className="text-gray-600">{scanData.plantData.common_name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Type:</span>
                    <p className="text-gray-600 capitalize">{scanData.plantData.plant_type}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Confidence:</span>
                    <p className="text-gray-600">{(scanData.confidence * 100).toFixed(0)}%</p>
                  </div>
                </div>
              </div>

              {/* Environmental Impact Card */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Environmental Impact
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">CO₂ Absorption:</span>
                    <p className="text-blue-600 font-semibold">{scanData.plantData.co2_absorption?.annual.toFixed(1)} kg/year</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Daily Absorption:</span>
                    <p className="text-blue-600 font-semibold">{scanData.plantData.co2_absorption?.daily.toFixed(3)} kg/day</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Avg Height:</span>
                    <p className="text-gray-600">{scanData.plantData.growth_conditions?.height_m.toFixed(1)}m</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Canopy Size:</span>
                    <p className="text-gray-600">{scanData.plantData.growth_conditions?.canopy_m2.toFixed(1)} m²</p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-green-100 rounded-lg">
                  <p className="text-xs text-green-800">
                    <strong>Equivalent to:</strong> Reducing {Math.round(scanData.plantData.co2_absorption?.annual * 50 || 0)} km of car driving annually
                  </p>
                </div>
              </div>

              {/* Optimal Conditions Card */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Optimal Growing Conditions
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Temperature:</span>
                    <p className="text-gray-600">{scanData.plantData.growth_conditions?.optimal_temp.toFixed(1)}°C</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Rainfall:</span>
                    <p className="text-gray-600">{scanData.plantData.growth_conditions?.rainfall_mm.toFixed(0)}mm/year</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Soil Type:</span>
                    <p className="text-gray-600 capitalize">{scanData.plantData.growth_conditions?.soil_type}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Height:</span>
                    <p className="text-gray-600">{scanData.plantData.growth_conditions?.height_m.toFixed(1)}m</p>
                  </div>
                </div>
              </div>

              {/* Landscaping Tips Card */}
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-medium text-orange-800 mb-3 flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  Landscaping & Care Tips
                </h4>
                <div className="text-sm text-gray-700">
                  <p className="mb-2"><strong>Tips:</strong></p>
                  <p className="mb-3">{scanData.plantData.landscaping_tips}</p>
                  <p><strong>Benefits:</strong> {scanData.plantData.environmental_benefits}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="image">Plant Image</Label>
            {image ? (
              <div className="relative w-full h-48 rounded-md overflow-hidden border border-gray-200">
                <img
                  src={image}
                  alt="Plant"
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  onClick={() => setImage(null)}
                >
                  &times;
                </button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-gray-300 rounded-md p-6 w-full text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => document.getElementById("timeline-image-upload")?.click()}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                    <p className="mt-2 text-sm text-gray-500">Uploading...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG or WEBP</p>
                  </div>
                )}
              </div>
            )}
            <input
              id="timeline-image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">Plant Health Status</Label>
            <RadioGroup
              defaultValue="unchanged"
              value={status}
              onValueChange={(value) => setStatus(value as TimelineEntryStatus)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="improved" id="improved" />
                <Label htmlFor="improved" className="text-green-600">Improved</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unchanged" id="unchanged" />
                <Label htmlFor="unchanged" className="text-yellow-600">Unchanged</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="worsened" id="worsened" />
                <Label htmlFor="worsened" className="text-red-600">Worsened</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="treatment">Treatment Applied (Optional)</Label>
            <Input
              id="treatment"
              value={treatmentApplied}
              onChange={(e) => setTreatmentApplied(e.target.value)}
              placeholder="What treatments did you apply?"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={scanData
                ? "Add observations about the plant's condition since last scan..."
                : "Describe the current condition of your plant..."}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white" 
            onClick={handleSubmit}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Save Entry"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTimelineEntryModal;
