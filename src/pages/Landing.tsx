import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import FeatureSection from "@/components/landing/FeatureSection";
import WorkflowSection from "@/components/landing/WorkflowSection";
import CtaSection from "@/components/landing/CtaSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FooterSection from "@/components/landing/FooterSection";
import { useAuth } from "@/components/AuthProvider";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight, BookOpen, Video, Play, Film } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

const Landing = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <FeatureSection />
      <WorkflowSection />
      
      {/* Enhanced Expert Chat Section */}
      <div className="py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium text-sm mb-2">
              👨‍🌾 PROFESSIONAL LANDSCAPING EXPERTS
            </span>
            <h2 className="text-3xl font-bold text-emerald-800 mb-4">
              Connect with Landscaping Specialists
            </h2>
            <p className="text-lg text-emerald-700 max-w-3xl mx-auto">
              Get personalized advice from experienced landscape designers, horticulturists, and outdoor living experts to transform your property.
            </p>
          </div>
          
          <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-3'} gap-8 mb-12`}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-emerald-800">Dr. Maria Rodriguez</h3>
                    <p className="text-sm text-emerald-600">Landscape Pathologist</p>
                  </div>
                  <span className="ml-auto w-3 h-3 bg-emerald-500 rounded-full"></span>
                </div>
                <p className="text-emerald-700 mb-4">
                  "I specialize in plant health management for residential landscapes. With over 15 years of experience, I help maintain beautiful, thriving outdoor spaces."
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JT</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-emerald-800">John Thompson</h3>
                    <p className="text-sm text-emerald-600">Sustainable Landscape Designer</p>
                  </div>
                  <span className="ml-auto w-3 h-3 bg-amber-500 rounded-full"></span>
                </div>
                <p className="text-emerald-700 mb-4">
                  "Expert in sustainable landscape design and water conservation. I create beautiful, eco-friendly outdoor spaces that thrive naturally."
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-emerald-800">Dr. Sarah Chen</h3>
                    <p className="text-sm text-emerald-600">Landscape Horticulturist</p>
                  </div>
                  <span className="ml-auto w-3 h-3 bg-emerald-500 rounded-full"></span>
                </div>
                <p className="text-emerald-700 mb-4">
                  "Specializing in ornamental plant care and landscape maintenance. I help clients achieve year-round beauty in their outdoor spaces."
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button
              asChild
              className={`bg-emerald-600 hover:bg-emerald-700 text-white ${isMobile ? 'px-4 py-4 text-base w-full' : 'px-6 py-6 rounded-lg text-lg'} shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105`}
            >
              <Link to={user ? "/specialist-chat" : "/auth"}>
                <MessageSquare className="mr-2" />
                Start Landscape Consultation
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <p className="mt-4 text-emerald-700">
              Get personalized landscaping advice from our team of experts
            </p>
          </div>
        </div>
      </div>
    
      
      <CtaSection />
      <TestimonialsSection />
      <FooterSection />
    </div>
  );
};

export default Landing;
