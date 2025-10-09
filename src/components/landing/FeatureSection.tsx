
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Shield, BarChart, Camera, Zap, Globe } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: <Camera className="h-8 w-8" />,
      title: "🏡 Landscape Design Analysis",
      description: "Our advanced AI analyzes your entire landscape design, providing insights on plant placement, health, and aesthetic improvements for optimal outdoor living spaces.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "🌿 Plant Health Monitoring",
      description: "Comprehensive monitoring of plant health across your landscape, detecting early signs of disease, nutrient deficiencies, and environmental stressors before they become major issues.",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "🛡️ Landscape Protection Plans",
      description: "Customized protection strategies for your entire landscape, including pest management, disease prevention, and seasonal care tailored to your specific climate and plant varieties.",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "⚡ Smart Irrigation Management",
      description: "Optimize water usage across your landscape with AI-powered irrigation recommendations, reducing waste while ensuring your plants receive the perfect amount of hydration.",
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "📈 Landscape Performance Analytics",
      description: "Track the health, growth, and beauty of your landscape over time with detailed analytics, seasonal recommendations, and performance improvement insights.",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "🌍 Expert Landscaping Knowledge",
      description: "Access our extensive database of landscaping expertise, including plant selection, design principles, maintenance schedules, and sustainable practices from industry professionals.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-amber-50">
      <div className="container mx-auto px-4">
        {/* Enhanced header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200 text-emerald-800 font-medium text-sm mb-6 shadow-md">
            <span className="text-xl">🌳</span>
            <span>PROFESSIONAL LANDSCAPING FEATURES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Transform Your <span className="text-emerald-600">Outdoor Spaces</span> 🏡
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Experience professional-grade landscape management with our comprehensive AI platform. From design analysis to maintenance optimization, we help you create and maintain beautiful, thriving outdoor environments.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl"
            >
              <CardContent className="pt-6 pb-8">
                <div className={`${feature.bgColor} p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology showcase */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium text-sm mb-6">
                <span className="text-lg">🌿</span>
                <span>Professional Landscaping Technology</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Complete <span className="text-emerald-200">Landscape Solutions</span>
              </h3>
              <p className="text-lg text-emerald-100 mb-8 leading-relaxed">
                Our platform combines cutting-edge AI technology with professional landscaping expertise to deliver comprehensive solutions for residential and commercial outdoor spaces.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl font-bold mb-1">500+</div>
                  <div className="text-emerald-200 text-sm">Plant Species</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">98%</div>
                  <div className="text-emerald-200 text-sm">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">24/7</div>
                  <div className="text-emerald-200 text-sm">Expert Support</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">10K+</div>
                  <div className="text-emerald-200 text-sm">Successful Projects</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1580218769217-b3c5d8cd15b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Professional landscape design"
                  className="w-full h-80 object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-white/20 backdrop-blur-sm rounded-xl p-3 transform hover:scale-110 transition-all duration-300">
                <div className="text-center">
                  <div className="text-xl font-bold">🏡</div>
                  <div className="text-xs">Design Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
