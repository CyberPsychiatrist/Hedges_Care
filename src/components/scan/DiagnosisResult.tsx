import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, HelpCircle, Loader2, TreePine, Leaf, Droplets, Wallet } from "lucide-react";
import { AIAnalysisResult } from "@/services/enhancedAIService";

interface DiagnosisResultProps {
  isLoading: boolean;
  processingStage: number;
  processingMessage?: string;
  diagnosis: string | null;
  description: string | null;
  symptoms: string[] | null;
  advice: string | null;
  confidence: number | null;
  analysisResult?: AIAnalysisResult | null;
  handleReset: () => void;
  onMintNFT?: () => void;
}

const DiagnosisResult: React.FC<DiagnosisResultProps> = ({
  isLoading,
  processingStage,
  processingMessage,
  diagnosis,
  description,
  symptoms,
  advice,
  confidence,
  analysisResult,
  handleReset,
  onMintNFT,
}) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "bg-green-500";
    if (confidence >= 0.8) return "bg-green-400";
    if (confidence >= 0.7) return "bg-yellow-400";
    if (confidence >= 0.6) return "bg-yellow-500";
    return "bg-orange-500";
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
    <Card className="shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-green-700 flex items-center gap-2">
          <CheckCircle className="h-6 w-6" />
          Plant Analysis Result
        </CardTitle>
        <CardDescription>AI-powered plant identification and environmental impact assessment</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-green-500" />
            <div className="text-center">
              <p className="font-medium text-gray-700">Analyzing your plant image...</p>
              {processingMessage && <p className="text-sm text-gray-500 mt-1">{processingMessage}</p>}
              <p className="text-xs text-gray-400 mt-2">Stage {processingStage}/5</p>
            </div>
          </div>
        ) : diagnosis ? (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {analysisResult?.plant && getPlantIcon(analysisResult.plant.plant_type)}
                <div>
                  <h3 className="text-xl font-semibold text-green-800">{diagnosis}</h3>
                  <p className="text-sm text-gray-500">{analysisResult?.plant?.species_name}</p>
                </div>
              </div>
              {confidence !== null && (
                <Badge className={getConfidenceColor(confidence) + " text-white"}>
                  Confidence: {(confidence * 100).toFixed(0)}%
                </Badge>
              )}
            </div>
            
            {description && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="text-lg font-medium text-green-700 mb-2">Plant Overview</h4>
                <p className="text-gray-600">{description}</p>
              </div>
            )}
            
            {symptoms && symptoms.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-lg font-medium text-green-700 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Environmental Benefits & Care Guidelines
                </h4>
                <div className="space-y-2">
                  {symptoms.map((symptom, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-600">{symptom}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {advice && (
              <div className="space-y-2">
                <h4 className="text-lg font-medium text-green-700 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Landscaping Recommendations
                </h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-600 whitespace-pre-line">{advice}</p>
                </div>
              </div>
            )}

            {analysisResult?.plant?.co2_absorption && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                <h4 className="text-lg font-medium text-green-700 mb-2 flex items-center gap-2">
                  🌍 Environmental Impact
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{analysisResult.plant.co2_absorption.annual.toFixed(1)}</p>
                    <p className="text-sm text-gray-500">kg CO₂/year</p>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-blue-600">{analysisResult.plant.co2_absorption.impact}</p>
                    <p className="text-sm text-gray-500">Environmental Impact</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-green-600">{analysisResult.plant.growth_conditions.height_m.toFixed(1)}m</p>
                    <p className="text-sm text-gray-500">Avg Height</p>
                  </div>
                </div>
              </div>
            )}
            
           <div className="flex flex-col sm:flex-row gap-2 mt-4">
             {onMintNFT && analysisResult && (
               <button
                 className="bg-purple-100 text-purple-700 rounded-md px-4 py-2 hover:bg-purple-200 transition-colors flex items-center justify-center gap-2"
                 onClick={onMintNFT}
               >
                 <Wallet className="h-4 w-4" />
                 Mint as NFT
               </button>
             )}
             <button
               className="bg-green-100 text-green-700 rounded-md px-4 py-2 hover:bg-green-200 transition-colors flex items-center justify-center gap-2"
               onClick={handleReset}
             >
               <HelpCircle className="h-4 w-4" />
               New Analysis
             </button>
           </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            Upload an image to receive plant analysis
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DiagnosisResult;
