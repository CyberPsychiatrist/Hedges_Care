
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NFTGallery from "./pages/NFTGallery";
import Auth from "./pages/Auth";
import SpecialistChat from "./pages/SpecialistChat";
import PlantLibrary from "./pages/PlantLibrary";
import CommunityForum from "./pages/CommunityForum";
import VideoLibrary from "./pages/VideoLibrary";
import ProfilePage from "./pages/ProfilePage";
import Subscription from "./pages/Subscription";
import PlantTimeline from "./pages/PlantTimeline";
import CartPage from "./pages/CartPage";
import PlantStore from "./pages/PlantStore";
import { AuthProvider } from "./components/AuthProvider";
import { RequireAuth } from "./components/RequireAuth";
import { NotificationProvider } from "./components/NotificationProvider";
import { LanguageProvider } from "./contexts/LanguageContext";
import { TimelineProvider } from "./hooks/use-timeline";
import DroneAnalysis from "./pages/DroneAnalysis";
import PestPrediction from "./pages/Prediction";
import Partnerships from "./pages/Partnerships";

// Page transition wrapper
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div className="page-transition">
      {children}
    </div>
  );
};

// Create a React component to wrap the application
const App = () => {
  // Create a new QueryClient instance within the component
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <NotificationProvider>
            <TimelineProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/scan" element={
                      <PageTransition>
                        <RequireAuth>
                          <Index />
                        </RequireAuth>
                      </PageTransition>
                    } />
                    <Route path="/history" element={
                      <PageTransition>
                        <RequireAuth>
                          <Index />
                        </RequireAuth>
                      </PageTransition>
                    } />
                    <Route path="/plant-store" element={
                      <PageTransition>
                        <PlantStore />
                      </PageTransition>
                    } />
                    <Route path="/about" element={
                      <PageTransition>
                        <Index />
                      </PageTransition>
                    } />
                    <Route path="/specialist-chat" element={
                      <PageTransition>
                        <RequireAuth>
                          <SpecialistChat />
                        </RequireAuth>
                      </PageTransition>
                    } />
                    <Route path="/plant-library" element={
                      <PageTransition>
                        <PlantLibrary />
                      </PageTransition>
                    } />
                    <Route path="/community-forum" element={
                      <PageTransition>
                        <CommunityForum />
                      </PageTransition>
                    } />
                    <Route path="/video-library" element={
                      <PageTransition>
                        <VideoLibrary />
                      </PageTransition>
                    } />
                    <Route path="/profile" element={
                      <PageTransition>
                        <RequireAuth>
                          <ProfilePage />
                        </RequireAuth>
                      </PageTransition>
                    } />
                    <Route path="/subscription" element={
                      <PageTransition>
                        <Subscription />
                      </PageTransition>
                    } />
                    <Route path="/plant-timeline" element={
                      <PageTransition>
                        <RequireAuth>
                          <PlantTimeline />
                        </RequireAuth>
                      </PageTransition>
                    } />
                    <Route path="/drone-analysis" element={
                      <PageTransition>
                        <DroneAnalysis />
                      </PageTransition>
                    } />
                    <Route path="/pest-prediction" element={
                      <PageTransition>
                        <PestPrediction />
                      </PageTransition>
                    } />
                    <Route path="/partnerships" element={
                      <PageTransition>
                        <Partnerships />
                      </PageTransition>
                    } />
                    <Route path="/nft-gallery" element={
                      <PageTransition>
                        <RequireAuth>
                          <NFTGallery />
                        </RequireAuth>
                      </PageTransition>
                    } />
                    <Route path="/cart" element={
                      <PageTransition>
                        <CartPage />
                      </PageTransition>
                    } />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </TimelineProvider>
          </NotificationProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
