
import React from "react";
import { TimelineEntryProps } from "./TimelineEntry";
import TimelineEntry from "./TimelineEntry";
import { Button } from "@/components/ui/button";
import { PlusCircle, Leaf, TreePine, Droplets, TrendingUp, Calculator } from "lucide-react";
import { format } from "date-fns";

import { TimelineItem } from "@/hooks/use-timeline";

interface PlantTimelineProps {
  entries: TimelineItem[];
  onAddEntry: () => void;
}

const PlantTimeline = React.memo<PlantTimelineProps>(({ entries, onAddEntry }) => {
  // Sort entries by date, newest first
  const sortedEntries = [...entries].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Calculate environmental impact stats
  const calculateStats = () => {
    const totalCO2Absorbed = sortedEntries.reduce((sum, entry) =>
      sum + (entry.co2Absorption?.annual || 0), 0
    );
    const uniquePlants = new Set(sortedEntries.map(entry => entry.commonName)).size;
    const statusDistribution = sortedEntries.reduce((acc, entry) => {
      acc[entry.status] = (acc[entry.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalCO2Absorbed: Math.round(totalCO2Absorbed * 10) / 10,
      totalScans: sortedEntries.length,
      uniquePlants,
      statusDistribution
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            Plant Health Timeline
          </h2>
          <p className="text-gray-600 mt-1">Track your plants' health journey and environmental impact</p>
        </div>
        <Button
          onClick={onAddEntry}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Entry
        </Button>
      </div>

      {/* Environmental Impact Summary */}
      {sortedEntries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <TreePine className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">Total Scans</span>
            </div>
            <p className="text-2xl font-bold text-green-700">{stats.totalScans}</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">CO₂ Absorbed</span>
            </div>
            <p className="text-2xl font-bold text-blue-700">{stats.totalCO2Absorbed} kg</p>
            <p className="text-xs text-blue-600">This year</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Plants Identified</span>
            </div>
            <p className="text-2xl font-bold text-purple-700">{stats.uniquePlants}</p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Health Trend</span>
            </div>
            <p className="text-lg font-bold text-orange-700">
              {stats.statusDistribution.improved > 0 ? "Improving" : "Monitoring"}
            </p>
            <p className="text-xs text-orange-600">
              {stats.statusDistribution.improved || 0} improved
            </p>
          </div>
        </div>
      )}
      
      {/* Timeline Entries */}
      {sortedEntries.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <Leaf className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No timeline entries yet</h3>
          <p className="text-gray-500">Add your first entry to start tracking plant health and environmental impact.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedEntries.map((entry, index) => {
            // Convert TimelineItem to TimelineEntryProps
            const timelineEntry: TimelineEntryProps = {
              date: new Date(entry.date),
              dateFormatted: entry.dateFormatted || format(new Date(entry.date), "MMM d, yyyy 'at' h:mm a"),
              image: entry.image,
              notes: entry.notes,
              status: entry.status,
              treatmentApplied: entry.treatmentApplied,
              diagnosis: entry.diagnosis,
              commonName: entry.commonName,
              plantType: entry.plantType,
              confidence: entry.confidence,
              co2Absorption: entry.co2Absorption,
              growthConditions: entry.growthConditions,
            };
            
            return (
              <TimelineEntry
                key={index}
                {...timelineEntry}
              />
            );
          })}
        </div>
      )}

      {/* Quick Stats */}
      {sortedEntries.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Health Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-semibold text-green-600">{stats.statusDistribution.improved || 0}</p>
              <p className="text-xs text-gray-500">Improved</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-yellow-600">{stats.statusDistribution.unchanged || 0}</p>
              <p className="text-xs text-gray-500">Unchanged</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-red-600">{stats.statusDistribution.worsened || 0}</p>
              <p className="text-xs text-gray-500">Worsened</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function to ensure re-render when entries change
  return prevProps.entries === nextProps.entries;
});

export default PlantTimeline;
