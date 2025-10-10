
// Define the possible specialist status values
export type SpecialistStatus = "online" | "away" | "busy";

// Define the Specialist interface
export interface Specialist {
  id: string;
  name: string;
  role: string;
  specialty: string;
  avatar: string;
  status: SpecialistStatus;
  bio: string;
  isAI?: boolean;
  experience: number; // years of experience
  rating: number; // 1-5 rating
  consultationFee?: number; // in USD
  languages: string[];
  certifications: string[];
  expertiseAreas: string[];
  environmentalFocus?: boolean; // for SDG 15 alignment
  carbonSequestrationExpertise?: boolean;
  landscapingSpecialization?: boolean;
}

// Export the specialists array
export const specialists: Specialist[] = [
  {
    id: "s1",
    name: "Dr. Sarah Chen",
    role: "Senior Plant Scientist",
    specialty: "Environmental Plant Analysis",
    avatar: "/placeholder.svg",
    status: "online",
    experience: 12,
    rating: 4.9,
    consultationFee: 85,
    languages: ["English", "Mandarin", "Spanish"],
    certifications: ["Ph.D. Plant Biology", "Certified Environmental Scientist", "Sustainable Land Management"],
    expertiseAreas: [
      "Plant species identification",
      "CO2 absorption analysis",
      "Environmental impact assessment",
      "Carbon sequestration measurement",
      "Sustainable landscaping"
    ],
    bio: "Leading plant scientist with 12+ years experience in environmental plant analysis and carbon sequestration research. Expert in using AI and machine learning for plant species identification and environmental impact measurement. Specializes in sustainable landscaping practices that maximize biodiversity and carbon capture.",
    environmentalFocus: true,
    carbonSequestrationExpertise: true,
    landscapingSpecialization: true
  },
  {
    id: "s2",
    name: "Michael Rodriguez",
    role: "Sustainable Landscaping Expert",
    specialty: "Eco-Friendly Landscape Design",
    avatar: "/placeholder.svg",
    status: "busy",
    experience: 8,
    rating: 4.8,
    consultationFee: 75,
    languages: ["English", "Spanish", "French"],
    certifications: ["Certified Landscape Architect", "Sustainable Design Professional", "Water Conservation Specialist"],
    expertiseAreas: [
      "Sustainable landscape design",
      "Native plant selection",
      "Drought-resistant landscaping",
      "Rain garden design",
      "Urban green spaces"
    ],
    bio: "Award-winning landscape architect specializing in eco-friendly designs that support local biodiversity and environmental sustainability. Expert in selecting plants that maximize CO2 absorption while minimizing water usage. Creates beautiful, sustainable landscapes that contribute positively to urban ecosystems.",
    environmentalFocus: true,
    landscapingSpecialization: true
  },
  {
    id: "s3",
    name: "Dr. Priya Patel",
    role: "Environmental Horticulturist",
    specialty: "Urban Plant Ecology",
    avatar: "/placeholder.svg",
    status: "online",
    experience: 10,
    rating: 4.7,
    consultationFee: 90,
    languages: ["English", "Hindi", "German"],
    certifications: ["Ph.D. Environmental Science", "Urban Forestry Certification", "Green Roof Professional"],
    expertiseAreas: [
      "Urban plant ecology",
      "Green infrastructure",
      "Air quality improvement",
      "Heat island mitigation",
      "Biodiversity enhancement"
    ],
    bio: "Environmental horticulturist specializing in urban plant ecosystems and their role in environmental remediation. Research focuses on how urban plants can improve air quality, reduce urban heat islands, and enhance biodiversity. Expert in designing green spaces that provide maximum environmental benefits while maintaining aesthetic appeal.",
    environmentalFocus: true,
    carbonSequestrationExpertise: true
  },
  {
    id: "s4",
    name: "Emma Thompson",
    role: "Carbon Footprint Specialist",
    specialty: "Plant-Based Carbon Sequestration",
    avatar: "/placeholder.svg",
    status: "online",
    experience: 6,
    rating: 4.6,
    consultationFee: 65,
    languages: ["English", "Portuguese", "Italian"],
    certifications: ["Carbon Management Specialist", "Environmental Auditor", "Sustainability Consultant"],
    expertiseAreas: [
      "Carbon footprint calculation",
      "CO2 offset strategies",
      "Plant selection for carbon capture",
      "Environmental impact reporting",
      "Sustainability planning"
    ],
    bio: "Carbon footprint specialist with expertise in using plants and green spaces for carbon sequestration. Helps individuals and organizations calculate their environmental impact and develop strategies to offset carbon emissions through strategic plant selection and landscaping. Expert in communicating complex environmental data in actionable insights.",
    environmentalFocus: true,
    carbonSequestrationExpertise: true
  },
  {
    id: "ai-assistant",
    name: "EcoAI Assistant",
    role: "AI Environmental Consultant",
    specialty: "Plant Analysis & Environmental Impact",
    avatar: "/placeholder.svg",
    status: "online",
    experience: 5, // Simulated AI experience
    rating: 4.8,
    consultationFee: 0, // Free AI consultation
    languages: ["English", "Spanish", "French", "German", "Chinese"],
    certifications: ["AI Environmental Analysis", "Machine Learning Specialist", "Data Science for Sustainability"],
    expertiseAreas: [
      "Instant plant identification",
      "CO2 absorption calculation",
      "Environmental impact analysis",
      "Landscaping recommendations",
      "Sustainability planning"
    ],
    bio: "AI-powered environmental consultant providing instant analysis of plant images and environmental impact calculations. Can identify plant species, estimate CO2 absorption capabilities, and provide data-driven landscaping recommendations. Available 24/7 for quick environmental assessments and sustainability advice.",
    isAI: true,
    environmentalFocus: true,
    carbonSequestrationExpertise: true,
    landscapingSpecialization: true
  }
];
