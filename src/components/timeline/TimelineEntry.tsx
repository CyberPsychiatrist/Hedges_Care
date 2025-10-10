
import React from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle, HelpCircle, TreePine, Leaf, Droplets, TrendingUp, TrendingDown, Minus } from "lucide-react";

export type TimelineEntryStatus = "improved" | "unchanged" | "worsened";

export interface TimelineEntryProps {
  date: Date;
  dateFormatted: string;
  image: string;
  notes: string;
  status: TimelineEntryStatus;
  treatmentApplied?: string;
  diagnosis?: string;
  commonName?: string;
  plantType?: string;
  confidence?: number;
  co2Absorption?: {
    daily: number;
    annual: number;
    impact: string;
  };
  growthConditions?: {
    height_m: number;
    canopy_m2: number;
    optimal_temp: number;
    rainfall_mm: number;
    soil_type: string;
  };
}

const TimelineEntry: React.FC<TimelineEntryProps> = ({
  dateFormatted,
  image,
  notes,
  status,
  treatmentApplied,
  diagnosis,
  commonName,
  plantType,
  confidence,
  co2Absorption,
  growthConditions,
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case "improved":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "worsened":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "improved":
        return "bg-green-100 text-green-800 border-green-200";
      case "worsened":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getPlantIcon = (type: string) => {
    switch (type) {
      case 'tree':
        return <TreePine className="h-5 w-5" />;
      case 'flower':
        return <Leaf className="h-5 w-5" />;
      default:
        return <Droplets className="h-5 w-5" />;
    }
  };

  return (
    <Card className="mb-4 border-l-4 hover:shadow-md transition-shadow duration-200"
          style={{ borderLeftColor: status === "improved" ? "#34D399" : status === "worsened" ? "#F87171" : "#FBBF24" }}>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 mb-4 md:mb-0 md:mr-4">
            <div className="relative aspect-square rounded-md overflow-hidden border border-gray-200">
              <img src={image} alt="Plant status" className="object-cover w-full h-full" />
              <div className="absolute top-2 right-2">
                <Badge className={getStatusColor()}>
                  <span className="flex items-center">
                    {getStatusIcon()}
                    <span className="ml-1 capitalize">{status}</span>
                  </span>
                </Badge>
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  {getPlantIcon(plantType)}
                  {commonName || 'Plant'}
                  {diagnosis && (
                    <span className="text-sm font-normal text-gray-600">- {diagnosis}</span>
                  )}
                </h3>
                <p className="text-sm text-gray-500">{dateFormatted}</p>
              </div>
              {confidence !== undefined && (
                <Badge className="bg-blue-100 text-blue-800">
                  {(confidence * 100).toFixed(0)}%
                </Badge>
              )}
            </div>
            
            {/* Plant Information */}
            {plantType && (
              <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Type:</span>
                    <p className="text-gray-600 capitalize">{plantType}</p>
                  </div>
                  {co2Absorption && (
                    <div>
                      <span className="font-medium text-gray-700">CO₂ Absorption:</span>
                      <p className="text-gray-600">{co2Absorption.annual.toFixed(1)} kg/year</p>
                    </div>
                  )}
                  {growthConditions && (
                    <div>
                      <span className="font-medium text-gray-700">Avg Height:</span>
                      <p className="text-gray-600">{growthConditions.height_m.toFixed(1)}m</p>
                    </div>
                  )}
                  {growthConditions && (
                    <div>
                      <span className="font-medium text-gray-700">Soil Type:</span>
                      <p className="text-gray-600 capitalize">{growthConditions.soil_type}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {treatmentApplied && (
              <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 mb-1">Treatment Applied</h4>
                <p className="text-sm text-blue-700">{treatmentApplied}</p>
              </div>
            )}
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Notes</h4>
              <p className="text-sm text-gray-600">{notes}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineEntry;
