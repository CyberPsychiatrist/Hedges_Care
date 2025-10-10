import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Camera,
  CheckCircle,
  AlertTriangle,
  Clock,
  User,
  MapPin,
  TreePine,
  Satellite,
  Users,
  TrendingUp
} from "lucide-react";

interface RecentActivityItem {
  id: string;
  type: "plant-analysis" | "drone-analysis" | "expert-consultation" | "community" | "location-search";
  title: string;
  description: string;
  timestamp: string;
  status: "success" | "warning" | "info";
  confidence?: number;
  environmentalImpact?: {
    co2Absorbed: number;
    location?: string;
  };
}

const RecentActivity = () => {
  // Mock data reflecting environmental focus - in a real app this would come from an API
  const activities: RecentActivityItem[] = [
    {
      id: "1",
      type: "plant-analysis",
      title: "Mango Tree Analysis",
      description: "Identified species with 95% confidence • 52.5 kg CO₂/year absorption",
      timestamp: "2 minutes ago",
      status: "success",
      confidence: 95,
      environmentalImpact: {
        co2Absorbed: 52.5,
        location: "Nairobi, Kenya"
      }
    },
    {
      id: "2",
      type: "drone-analysis",
      title: "Drone Environmental Scan",
      description: "5-hectare area mapped • 15 plants identified • 265.8 kg CO₂ potential",
      timestamp: "15 minutes ago",
      status: "success",
      environmentalImpact: {
        co2Absorbed: 265.8,
        location: "Mombasa, Kenya"
      }
    },
    {
      id: "3",
      type: "expert-consultation",
      title: "Expert Consultation",
      description: "Chat with Dr. Sarah Chen about carbon sequestration strategies",
      timestamp: "1 hour ago",
      status: "info",
      environmentalImpact: {
        co2Absorbed: 0
      }
    },
    {
      id: "4",
      type: "location-search",
      title: "Location Analysis",
      description: "Searched Eldoret coordinates for satellite environmental data",
      timestamp: "2 hours ago",
      status: "info",
      environmentalImpact: {
        co2Absorbed: 0,
        location: "Eldoret, Kenya"
      }
    },
    {
      id: "5",
      type: "plant-analysis",
      title: "Flame Tree Identification",
      description: "Species confirmed • 51.0 kg CO₂/year sequestration potential",
      timestamp: "5 hours ago",
      status: "success",
      confidence: 92,
      environmentalImpact: {
        co2Absorbed: 51.0,
        location: "Kisumu, Kenya"
      }
    },
    {
      id: "6",
      type: "community",
      title: "Community Contribution",
      description: "Shared sustainable landscaping tips in community forum",
      timestamp: "1 day ago",
      status: "info"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "plant-analysis":
        return <TreePine className="h-4 w-4" />;
      case "drone-analysis":
        return <Satellite className="h-4 w-4" />;
      case "expert-consultation":
        return <User className="h-4 w-4" />;
      case "location-search":
        return <MapPin className="h-4 w-4" />;
      case "community":
        return <Users className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-50";
      case "warning":
        return "text-yellow-600 bg-yellow-50";
      case "info":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "success":
        return "default" as const;
      case "warning":
        return "secondary" as const;
      case "info":
        return "outline" as const;
      default:
        return "outline" as const;
    }
  };

  const getCO2Color = (co2: number) => {
    if (co2 >= 100) return "text-green-600 font-bold";
    if (co2 >= 50) return "text-green-500 font-medium";
    if (co2 >= 10) return "text-blue-500";
    return "text-gray-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          Recent Environmental Activity
        </CardTitle>
        <CardDescription>
          Your latest environmental analysis and conservation activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 truncate">
                    {activity.title}
                  </h4>
                  <div className="flex items-center gap-2 ml-2">
                    {activity.confidence && (
                      <Badge variant={getStatusBadgeVariant(activity.status)} className="text-xs">
                        {activity.confidence}%
                      </Badge>
                    )}
                    <div className="flex items-center text-xs text-gray-500 gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.timestamp}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                
                {activity.environmentalImpact && (
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    {activity.environmentalImpact.co2Absorbed > 0 && (
                      <Badge variant="outline" className={`${getCO2Color(activity.environmentalImpact.co2Absorbed)} border-green-200`}>
                        🌍 {activity.environmentalImpact.co2Absorbed.toFixed(1)} kg CO₂/year
                      </Badge>
                    )}
                    {activity.environmentalImpact.location && (
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        📍 {activity.environmentalImpact.location}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <TrendingUp className="h-4 w-4" />
              <span>Total Environmental Impact This Month</span>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-200 font-medium">
              419.3 kg CO₂ sequestered
            </Badge>
          </div>
          <button className="text-sm text-green-600 hover:text-green-700 font-medium mt-2 block w-full text-center">
            View detailed environmental report →
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;