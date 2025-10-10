
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle, Users, Calendar, Award, Target, Leaf, Database,
  Camera, BookOpen, MessageSquare, Plane, Bug, Heart, Zap,
  TrendingUp, Globe, Shield, Award as AwardIcon
} from "lucide-react";

const AboutContent = () => {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-green-800">About Hedges Care AI</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-green max-w-none">
        <p>Hedges Care is an all-in-one intelligent plant care platform that combines AI-powered diagnostics, expert consultations, environmental monitoring, and blockchain technology to provide comprehensive plant health solutions for gardeners, farmers, and environmental enthusiasts.</p>
        
        <h3 className="text-xl font-semibold text-green-700 mt-6">Our Mission</h3>
        <p>Founded in 2025 by a team of agricultural scientists, AI engineers, and environmental experts, Hedges Care emerged from the vision of making advanced plant care accessible to everyone. We believe that technology can help us build a more sustainable future by optimizing plant health, maximizing carbon sequestration, and fostering environmental stewardship.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center text-center">
            <Users className="h-8 w-8 text-green-600 mb-2" />
            <h4 className="font-semibold text-green-800">Global Community</h4>
            <p className="text-sm">50,000+ users across 120+ countries working together for better plant care</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center text-center">
            <Calendar className="h-8 w-8 text-green-600 mb-2" />
            <h4 className="font-semibold text-green-800">Launched</h4>
            <p className="text-sm">Platform launched in early 2025 with continuous innovation and feature additions</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center text-center">
            <AwardIcon className="h-8 w-8 text-green-600 mb-2" />
            <h4 className="font-semibold text-green-800">Recognition</h4>
            <p className="text-sm">Multiple sustainability awards and partnerships with leading agricultural organizations</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center text-center">
            <Target className="h-8 w-8 text-green-600 mb-2" />
            <h4 className="font-semibold text-green-800">Environmental Impact</h4>
            <p className="text-sm">Reducing agricultural waste by 30% and increasing carbon sequestration by 25%</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-green-700 mt-6">Our Comprehensive Platform</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <Camera className="h-6 w-6 text-green-600 mb-2" />
            <h4 className="font-semibold text-green-800">AI-Powered Plant Scanning</h4>
            <p className="text-sm text-gray-600">Advanced image recognition identifies plant species, diseases, and provides actionable care recommendations with 96% accuracy.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <MessageSquare className="h-6 w-6 text-green-600 mb-2" />
            <h4 className="font-semibold text-green-800">Expert Consultation Network</h4>
            <p className="text-sm text-gray-600">Connect with certified plant specialists, agronomists, and botanists for personalized advice and treatment plans.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <BookOpen className="h-6 w-6 text-green-600 mb-2" />
            <h4 className="font-semibold text-green-800">Plant Library & Education</h4>
            <p className="text-sm text-gray-600">Access to a comprehensive database of 1000+ plant species with detailed care guides, environmental benefits, and growing conditions.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <Plane className="h-6 w-6 text-green-600 mb-2" />
            <h4 className="font-semibold text-green-800">Drone & Satellite Analysis</h4>
            <p className="text-sm text-gray-600">Advanced aerial imaging and satellite data analysis for large-scale agricultural monitoring and crop health assessment.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <TrendingUp className="h-6 w-6 text-green-600 mb-2" />
            <h4 className="font-semibold text-green-800">Environmental Analytics</h4>
            <p className="text-sm text-gray-600">Track carbon sequestration, environmental impact, and plant health metrics with real-time analytics and reporting.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <Heart className="h-6 w-6 text-green-600 mb-2" />
            <h4 className="font-semibold text-green-800">NFT Plant Certificates</h4>
            <p className="text-sm text-gray-600">Digital certificates using blockchain technology to authenticate plant health history and environmental impact achievements.</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-green-700 mt-6">Our AI Technology Stack</h3>
        <p>Our multi-layered AI system combines computer vision, deep learning, and environmental data analysis to provide unparalleled plant care insights. Trained on millions of images and environmental data points from our global hybrid plants emissions database.</p>
        
        <div className="bg-green-50 p-4 rounded-md my-4 flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-green-800 font-medium">AI Technology Disclaimer</p>
            <p className="text-xs text-green-700 mt-1">While our AI systems provide highly accurate insights, they should be used as diagnostic aids. For critical agricultural or environmental decisions, we recommend consulting with certified professionals and following local regulations.</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-green-700 mt-6">How Our Platform Works</h3>
        <ol className="space-y-2 list-decimal list-inside">
          <li><strong>Smart Scanning:</strong> Upload plant images or use drone/satellite data for instant analysis</li>
          <li><strong>AI Analysis:</strong> Advanced algorithms identify species, diseases, and environmental conditions</li>
          <li><strong>Expert Verification:</strong> AI results are enhanced with specialist knowledge and best practices</li>
          <li><strong>Personalized Recommendations:</strong> Get tailored care plans based on your specific environment and goals</li>
          <li><strong>Impact Tracking:</strong> Monitor environmental contributions and plant health over time</li>
          <li><strong>Community Engagement:</strong> Share knowledge, ask questions, and learn from other plant enthusiasts</li>
        </ol>
        
        <h3 className="text-xl font-semibold text-green-700 mt-6">Platform Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Comprehensive Care:</strong> All-in-one solution for plant identification, disease treatment, and maintenance</li>
            <li><strong>Expert Access:</strong> Connect with certified specialists and botanists worldwide</li>
            <li><strong>Environmental Impact:</strong> Track and maximize your plants' carbon sequestration capabilities</li>
            <li><strong>Cost Savings:</strong> Optimize resource usage and reduce plant losses through early detection</li>
            <li><strong>Educational Resources:</strong> Learn about plant care, environmental benefits, and sustainable practices</li>
          </ul>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Global Community:</strong> Join a worldwide network of plant enthusiasts and experts</li>
            <li><strong>Advanced Analytics:</strong> Detailed insights and trend analysis for better decision-making</li>
            <li><strong>Blockchain Integration:</strong> Secure digital certificates and transparent impact tracking</li>
            <li><strong>Multi-Platform Support:</strong> Web, mobile, and drone integration for comprehensive monitoring</li>
            <li><strong>Data-Driven Insights:</strong> Leverage our global database for optimal plant care strategies</li>
          </ul>
        </div>
        
        <h3 className="text-xl font-semibold text-green-700 mt-6">Our Global Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
          <div className="p-4 border border-green-200 rounded-lg text-center">
            <Leaf className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-3xl font-bold text-green-700">250,000+</p>
            <p className="text-sm text-green-600">Plants analyzed</p>
          </div>
          <div className="p-4 border border-green-200 rounded-lg text-center">
            <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-3xl font-bold text-green-700">50,000+</p>
            <p className="text-sm text-green-600">Active users</p>
          </div>
          <div className="p-4 border border-green-200 rounded-lg text-center">
            <Database className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-3xl font-bold text-green-700">1000+</p>
            <p className="text-sm text-green-600">Plant species</p>
          </div>
          <div className="p-4 border border-green-200 rounded-lg text-center">
            <Globe className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-3xl font-bold text-green-700">120+</p>
            <p className="text-sm text-green-600">Countries</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mt-6">
          <h3 className="text-lg font-semibold text-green-700 mb-3">Our Commitment to Sustainability</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Zap className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Carbon Sequestration</p>
                <p className="text-sm text-green-600">Tracking and enhancing plants' natural carbon capture abilities</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Biodiversity Support</p>
                <p className="text-sm text-green-600">Promoting diverse plant ecosystems and sustainable practices</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Bug className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Eco-Friendly Solutions</p>
                <p className="text-sm text-green-600">Reducing chemical usage through precision plant care</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-md mt-6">
          <h3 className="text-lg font-semibold text-green-700">Get Started with Hedges Care</h3>
          <p className="text-green-600 mb-3">Join our community of plant enthusiasts and environmental stewards working together for a greener future.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="bg-white p-3 rounded border border-green-200">
              <p className="font-medium text-green-800">For Support</p>
              <p className="text-sm text-green-600">support@hedgescare.com</p>
            </div>
            <div className="bg-white p-3 rounded border border-green-200">
              <p className="font-medium text-green-800">For Partnerships</p>
              <p className="text-sm text-green-600">partnerships@hedgescare.com</p>
            </div>
            <div className="bg-white p-3 rounded border border-green-200">
              <p className="font-medium text-green-800">General Inquiries</p>
              <p className="text-sm text-green-600">hello@hedgescare.com</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutContent;
