
import { useContext, createContext, useState, useEffect, ReactNode } from "react";
import { PlantData } from "@/services/enhancedAIService";
import { format } from "date-fns";

export interface TimelineItem {
  id: string;
  date: string; // ISO string format
  dateFormatted: string; // Human readable format
  diagnosis: string;
  commonName: string;
  plantType: string;
  image: string;
  notes: string;
  status: "improved" | "unchanged" | "worsened";
  treatmentApplied?: string;
  confidence?: number;
  // Environmental impact data
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
  recommendations?: {
    immediate: string[];
    followUp: string[];
    prevention: string[];
  };
}

type TimelineContextType = {
  addToTimeline: (data: Partial<TimelineItem>) => void;
  timelineItems: TimelineItem[];
  getPlantStats: () => {
    totalScans: number;
    co2Absorbed: number;
    plantsIdentified: number;
    statusDistribution: Record<string, number>;
  };
};

const TimelineContext = createContext<TimelineContextType>({
  addToTimeline: () => {},
  timelineItems: [],
  getPlantStats: () => ({
    totalScans: 0,
    co2Absorbed: 0,
    plantsIdentified: 0,
    statusDistribution: { improved: 0, unchanged: 0, worsened: 0 }
  }),
});

export const TimelineProvider = ({ children }: { children: ReactNode }) => {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);

  // Load timeline items from localStorage on mount
  useEffect(() => {
    const storedItems = localStorage.getItem("plantTimelineEntries");
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems);
        // Keep dates as ISO strings for consistency, ensure formatted dates exist
        const itemsWithFormattedDates = parsedItems.map((item: any) => ({
          ...item,
          date: item.date, // Keep as ISO string
          dateFormatted: item.dateFormatted || format(new Date(item.date), "MMM d, yyyy 'at' h:mm a")
        }));
        setTimelineItems(itemsWithFormattedDates);
      } catch (error) {
        console.error("Error parsing timeline items from localStorage:", error);
      }
    }
  }, []);

  const addToTimeline = (data: Partial<TimelineItem>) => {
    const newItem: TimelineItem = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      dateFormatted: format(new Date(), "MMM d, yyyy 'at' h:mm a"),
      diagnosis: data.diagnosis || 'Unknown',
      commonName: data.commonName || 'Unknown Plant',
      plantType: data.plantType || 'unknown',
      image: data.image || '',
      notes: data.notes || '',
      status: data.status || 'unchanged',
      treatmentApplied: data.treatmentApplied,
      confidence: data.confidence,
      co2Absorption: data.co2Absorption,
      growthConditions: data.growthConditions,
      recommendations: data.recommendations,
    };
    
    const updatedItems = [...timelineItems, newItem];
    setTimelineItems(updatedItems);
    
    localStorage.setItem("plantTimelineEntries", JSON.stringify(updatedItems));
  };

  const getPlantStats = () => {
    const totalScans = timelineItems.length;
    const co2Absorbed = timelineItems.reduce((sum, item) =>
      sum + (item.co2Absorption?.annual || 0), 0
    );
    const plantsIdentified = new Set(timelineItems.map(item => item.commonName)).size;
    
    const statusDistribution = timelineItems.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalScans,
      co2Absorbed: Math.round(co2Absorbed * 10) / 10,
      plantsIdentified,
      statusDistribution
    };
  };

  return (
    <TimelineContext.Provider value={{ addToTimeline, timelineItems, getPlantStats }}>
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimeline = () => useContext(TimelineContext);
