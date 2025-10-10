
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Camera, History, MessageSquare, BookOpen, Users, Video, Info,
  Plane, Bug, HandHeart, ChevronDown, Settings, MoreHorizontal, Calendar, Wallet
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItemsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobile?: boolean;
  closeMenu?: () => void;
}

// Primary navigation items (always visible)
export const primaryNavItems = [
  { 
    name: "Scan", 
    path: "/scan", 
    icon: <Camera className="h-4 w-4 mr-1" />,
    authRequired: true
  },
  { 
    name: "History", 
    path: "/history", 
    icon: <History className="h-4 w-4 mr-1" />,
    authRequired: true
  },

  { 
    name: "Expert Chat", 
    path: "/specialist-chat", 
    icon: <MessageSquare className="h-4 w-4 mr-1" />,
    authRequired: true
  }
];

// Learning resources group
export const learningNavItems = [
  { 
    name: "Plant Library", 
    path: "/plant-library", 
    icon: <BookOpen className="h-4 w-4 mr-1" />,
    authRequired: false
  },
  { 
    name: "Video Library", 
    path: "/video-library", 
    icon: <Video className="h-4 w-4 mr-1" />,
    authRequired: false
  },
  { 
    name: "Community Forum", 
    path: "/community-forum", 
    icon: <Users className="h-4 w-4 mr-1" />,
    authRequired: false
  }
];

// Advanced tools group
export const advancedNavItems = [
  { 
    name: "Satellite", 
    path: "/drone-analysis", 
    icon: <Plane className="h-4 w-4 mr-1" />,
    authRequired: false
  },
  { 
    name: "Partnerships", 
    path: "/partnerships", 
    icon: <HandHeart className="h-4 w-4 mr-1" />,
    authRequired: false
  },
  { 
    name: "About", 
    path: "/about", 
    icon: <Info className="h-4 w-4 mr-1" />,
    authRequired: false
  }
];

// NFT Navigation items
export const nftNavItems = [
  {
    name: "NFT Gallery",
    path: "/nft-gallery",
    icon: <Wallet className="h-4 w-4 mr-1" />,
    authRequired: false
  }
];

// All navigation items for mobile
export const allNavItems = [...primaryNavItems, ...learningNavItems, ...advancedNavItems, ...nftNavItems];

const NavItems: React.FC<NavItemsProps> = ({ activeTab, setActiveTab, isMobile = false, closeMenu }) => {
  const navigate = useNavigate();
  const [isLearningOpen, setIsLearningOpen] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  const handleNavigation = (path: string, tabName: string) => {
    navigate(path);
    setActiveTab(tabName.toLowerCase());
    if (isMobile && closeMenu) {
      closeMenu();
    }
  };

  const isActive = (itemName: string, itemPath: string) => {
    return (activeTab === itemName.toLowerCase() || 
            (window.location.pathname === itemPath && activeTab === ""));
  };
  
  // Mobile view - show all items in a simple list
  if (isMobile) {
    return (
      <div className="flex flex-col space-y-1">
        {allNavItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            size="sm"
            className={`justify-start w-full px-4 py-3 rounded-lg transition-all duration-300 ${
              isActive(item.name, item.path)
                ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md"
                : "text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
            } flex items-center space-x-3`}
            onClick={() => handleNavigation(item.path, item.name)}
          >
            <div className="flex items-center justify-center w-5 h-5">
              {item.icon}
            </div>
            <span className="font-medium ml-1">{item.name}</span>
            {item.path === "/nft-gallery" && (
              <div className="ml-auto px-2 py-0.5 text-xs bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full">
                NFT
              </div>
            )}
          </Button>
        ))}
      </div>
    );
  }

  // Desktop view - organized dropdowns
  return (
    <div className="flex items-center gap-2">
      {/* Primary Navigation */}
      {primaryNavItems.map((item) => (
        <Button
          key={item.name}
          variant="ghost"
          size="sm"
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            isActive(item.name, item.path)
              ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md"
              : "text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
          } flex items-center space-x-2`}
          onClick={() => handleNavigation(item.path, item.name)}
        >
          {item.icon}
          <span>{item.name}</span>
        </Button>
      ))}

      {/* Learning Resources Dropdown */}
      <DropdownMenu open={isLearningOpen} onOpenChange={setIsLearningOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
              learningNavItems.some(item => isActive(item.name, item.path))
                ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md"
                : "text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Learn</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-52 glass-morphism shadow-xl border border-emerald-200/50">
          {learningNavItems.map((item) => (
            <DropdownMenuItem
              key={item.name}
              onClick={() => handleNavigation(item.path, item.name)}
              className="cursor-pointer transition-all duration-200 hover:bg-emerald-50 text-emerald-700 font-medium"
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span>{item.name}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Advanced Tools Dropdown */}
      <DropdownMenu open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
              advancedNavItems.some(item => isActive(item.name, item.path))
                ? "bg-gradient-to-r from-sapphire-500 to-sapphire-600 text-white shadow-md"
                : "text-sapphire-700 hover:bg-sapphire-50 hover:text-sapphire-800"
            }`}
          >
            <MoreHorizontal className="h-4 w-4" />
            <span>More</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-52 glass-morphism shadow-xl border border-sapphire-200/50">
          {advancedNavItems.map((item) => (
            <DropdownMenuItem
              key={item.name}
              onClick={() => handleNavigation(item.path, item.name)}
              className="cursor-pointer transition-all duration-200 hover:bg-sapphire-50 text-sapphire-700 font-medium"
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span>{item.name}</span>
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem className="border-t border-sapphire-200/50 pt-2">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {nftNavItems[0].icon}
                <span className="font-medium text-amber-700">{nftNavItems[0].name}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="premium-border-amber text-amber-700 hover:bg-amber-50"
                onClick={() => handleNavigation(nftNavItems[0].path, nftNavItems[0].name)}
              >
                View
              </Button>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavItems;
