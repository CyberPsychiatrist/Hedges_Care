
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, MessageSquare } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

const CtaSection = () => {
  const { user } = useAuth();
  
  return (
    <div className="py-16 bg-gradient-to-r from-emerald-600 to-green-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium text-sm mb-6">
          <span className="text-lg">🌿</span>
          <span>PROFESSIONAL LANDSCAPING SOLUTIONS</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Transform Your Outdoor Spaces Today 🏡</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
          Join thousands of homeowners and landscape professionals who trust our AI-powered platform to create stunning, sustainable outdoor environments. Get expert guidance and personalized recommendations for your unique landscaping needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button
            asChild
            className="bg-white text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
          >
            <Link to={user ? "/scan" : "/auth"}>
              Start Landscape Analysis
              <Zap className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-lg text-lg transition-all duration-300 hover:bg-white/20 flex items-center gap-2"
          >
            <Link to={user ? "/specialist-chat" : "/auth"}>
              Consult Landscape Experts
              <MessageSquare className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 text-emerald-100 text-sm">
          <p>🌟 Free landscape analysis • 🏡 Design consultation • 🌿 Plant health monitoring</p>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
