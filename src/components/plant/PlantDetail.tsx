
import React from "react";
import { PlantData } from "@/services/enhancedAIService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Leaf, TreePine, Droplets, Check, Activity, Calendar, Globe, Thermometer, Cloud, Mountain } from "lucide-react";

interface PlantDetailProps {
  plant: PlantData;
}

const PlantDetail = ({ plant }: PlantDetailProps) => {
  const getPlantIcon = (type: string) => {
    switch (type) {
      case 'tree':
        return <TreePine className="h-5 w-5 mr-2 text-green-500" />;
      case 'flower':
        return <Leaf className="h-5 w-5 mr-2 text-pink-500" />;
      default:
        return <Droplets className="h-5 w-5 mr-2 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-3">
          {getPlantIcon(plant.plant_type)}
          <div>
            <h3 className="text-2xl font-bold text-green-800">{plant.common_name}</h3>
            <p className="text-lg text-gray-600 italic">{plant.species_name}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200 mr-2">
            {plant.plant_type}
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
            🌍 Global Dataset
          </Badge>
        </div>
      </div>
      
      <div className="prose prose-green max-w-none">
        <p className="text-gray-700">{plant.description}</p>
      </div>
      
      <Card>
        <CardHeader className="py-3 px-4 bg-green-50">
          <CardTitle className="text-md flex items-center">
            <Leaf className="h-5 w-5 mr-2 text-green-500" />
            Environmental Benefits
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-gray-700">{plant.environmental_benefits}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-3 px-4 bg-blue-50">
          <CardTitle className="text-md flex items-center">
            <Globe className="h-5 w-5 mr-2 text-blue-500" />
            CO₂ Absorption Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{plant.co2_absorption.annual.toFixed(1)}</p>
              <p className="text-sm text-gray-600">kg CO₂/year</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-lg font-medium text-blue-600">{plant.co2_absorption.impact}</p>
              <p className="text-sm text-gray-600">Environmental Impact</p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <p className="text-xl font-bold text-amber-600">{plant.co2_absorption.daily.toFixed(3)}</p>
              <p className="text-sm text-gray-600">kg CO₂/day</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-3 px-4 bg-green-50">
          <CardTitle className="text-md flex items-center">
            <TreePine className="h-5 w-5 mr-2 text-green-500" />
            Growth Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Thermometer className="h-5 w-5 text-red-500" />
              <div>
                <p className="font-medium text-gray-700">Optimal Temperature</p>
                <p className="text-gray-600">{plant.growth_conditions.optimal_temp}°C</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Cloud className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium text-gray-700">Annual Rainfall</p>
                <p className="text-gray-600">{plant.growth_conditions.rainfall_mm}mm</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mountain className="h-5 w-5 text-amber-500" />
              <div>
                <p className="font-medium text-gray-700">Soil Type</p>
                <p className="text-gray-600">{plant.growth_conditions.soil_type}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <TreePine className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium text-gray-700">Average Height</p>
                <p className="text-gray-600">{plant.growth_conditions.height_m.toFixed(1)}m</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-3 px-4 bg-green-50">
          <CardTitle className="text-md flex items-center">
            <Check className="h-5 w-5 mr-2 text-green-500" />
            Landscaping Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-700 whitespace-pre-line">{plant.landscaping_tips}</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>AI Analysis Confidence: {(plant.confidence * 100).toFixed(0)}%</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <TreePine className="h-4 w-4 mr-1 text-green-500" />
            <span>Canopy: {plant.growth_conditions.canopy_m2.toFixed(1)}m²</span>
          </div>
          <div className="flex items-center">
            <span>Height: {plant.growth_conditions.height_m.toFixed(1)}m</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;
