// Enhanced AI scanning service with realistic processing simulation
export interface PlantData {
  id: string;
  species_name: string;
  common_name: string;
  plant_type: string;
  description: string;
  environmental_benefits: string;
  landscaping_tips: string;
  co2_absorption: {
    daily: number;
    annual: number;
    impact: string;
  };
  growth_conditions: {
    height_m: number;
    canopy_m2: number;
    optimal_temp: number;
    rainfall_mm: number;
    soil_type: string;
  };
  confidence: number;
}

export interface AIAnalysisResult {
  plant: PlantData;
  confidence: number;
  certainty: 'very_low' | 'low' | 'medium' | 'high' | 'very_high';
  processingTime: number;
  imageQualityScore: number;
  alternativeDiagnoses?: Array<{
    species: string;
    confidence: number;
  }>;
  recommendations: {
    immediate: string[];
    followUp: string[];
    prevention: string[];
  };
}

// Comprehensive plant database with data from global dataset
const PLANTS: PlantData[] = [
  {
    id: "R000001",
    species_name: "Mangifera indica",
    common_name: "Mango Tree",
    plant_type: "tree",
    description: "Tropical fruit tree known for its delicious fruits and excellent carbon sequestration capabilities. Native to South Asia, widely cultivated in tropical regions.",
    environmental_benefits: "High CO2 absorption rate of 52.5 kg CO2 annually per healthy tree. Provides shade and improves air quality while supporting biodiversity.",
    landscaping_tips: "Plant in full sun, well-draining soil. Space 15-20 feet apart. Regular watering during fruit development. Prune to maintain shape and size.",
    co2_absorption: {
      daily: 0.144,
      annual: 52.5,
      impact: "Equivalent to offsetting 1,825 km of car driving annually"
    },
    growth_conditions: {
      height_m: 14.98,
      canopy_m2: 61.162,
      optimal_temp: 20.71,
      rainfall_mm: 530.4,
      soil_type: "Loam"
    },
    confidence: 0.95
  },
  {
    id: "R000002",
    species_name: "Jacaranda mimosifolia",
    common_name: "Jacaranda Tree",
    plant_type: "tree",
    description: "Beautiful ornamental tree with purple flowers. Excellent for urban landscaping and provides significant environmental benefits.",
    environmental_benefits: "Absorbs 28.9 kg CO2 annually. Creates beautiful canopy cover and improves urban air quality while providing aesthetic value.",
    landscaping_tips: "Prefers full sun and well-drained soil. Drought-tolerant once established. Perfect for streetscapes and large gardens.",
    co2_absorption: {
      daily: 0.079,
      annual: 28.9,
      impact: "Equivalent to offsetting 1,000 km of car driving annually"
    },
    growth_conditions: {
      height_m: 17.685,
      canopy_m2: 7.692,
      optimal_temp: 10.16,
      rainfall_mm: 335.9,
      soil_type: "Sandy"
    },
    confidence: 0.92
  },
  {
    id: "R000003",
    species_name: "Delonix regia",
    common_name: "Flame Tree",
    plant_type: "tree",
    description: "Striking ornamental tree with brilliant red-orange flowers. Fast-growing and excellent for carbon sequestration.",
    environmental_benefits: "High absorption rate of 51.0 kg CO2 annually. Provides excellent shade and habitat for birds while sequestering carbon.",
    landscaping_tips: "Plant in full sun, tolerates various soil types. Fast-growing, so provide adequate space. Beautiful flowering display in summer.",
    co2_absorption: {
      daily: 0.140,
      annual: 51.0,
      impact: "Equivalent to offsetting 1,860 km of car driving annually"
    },
    growth_conditions: {
      height_m: 6.965,
      canopy_m2: 42.891,
      optimal_temp: 26.17,
      rainfall_mm: 1377.9,
      soil_type: "Peaty"
    },
    confidence: 0.94
  },
  {
    id: "R000009",
    species_name: "Salix babylonica",
    common_name: "Weeping Willow",
    plant_type: "tree",
    description: "Graceful tree with weeping branches. Excellent for water-logged areas and provides substantial environmental benefits.",
    environmental_benefits: "Very high absorption rate of 29.0 kg CO2 annually. Excellent for soil stabilization and water filtration while sequestering carbon.",
    landscaping_tips: "Thrives near water sources, tolerates wet soil. Plant away from foundations due to extensive root systems. Beautiful ornamental value.",
    co2_absorption: {
      daily: 0.079,
      annual: 29.0,
      impact: "Equivalent to offsetting 1,060 km of car driving annually"
    },
    growth_conditions: {
      height_m: 35.116,
      canopy_m2: 57.047,
      optimal_temp: 19.58,
      rainfall_mm: 884.1,
      soil_type: "Silty"
    },
    confidence: 0.91
  },
  {
    id: "R000006",
    species_name: "Cedrus deodara",
    common_name: "Deodar Cedar",
    plant_type: "tree",
    description: "Evergreen conifer with graceful branches. Excellent for landscaping and provides year-round carbon sequestration.",
    environmental_benefits: "Absorbs 25.0 kg CO2 annually. Provides year-round green cover and improves air quality while supporting local ecosystems.",
    landscaping_tips: "Prefers well-drained soil and full sun. Excellent for windbreaks and privacy screens. Low maintenance once established.",
    co2_absorption: {
      daily: 0.069,
      annual: 25.0,
      impact: "Equivalent to offsetting 915 km of car driving annually"
    },
    growth_conditions: {
      height_m: 12.055,
      canopy_m2: 13.223,
      optimal_temp: 26.25,
      rainfall_mm: 407.7,
      soil_type: "Peaty"
    },
    confidence: 0.93
  }
];

// Simulate image quality analysis
function analyzeImageQuality(): { score: number; factors: string[] } {
  const factors = [];
  const scores = [];

  // Simulate various quality factors
  const lighting = Math.random() * 0.4 + 0.6; // 0.6-1.0
  const focus = Math.random() * 0.3 + 0.7; // 0.7-1.0
  const resolution = Math.random() * 0.2 + 0.8; // 0.8-1.0
  const angle = Math.random() * 0.3 + 0.7; // 0.7-1.0

  scores.push(lighting, focus, resolution, angle);

  if (lighting < 0.7) factors.push('Lighting could be improved');
  if (focus < 0.8) factors.push('Image appears slightly blurred');
  if (resolution < 0.9) factors.push('Higher resolution would help analysis');
  if (angle < 0.8) factors.push('Try capturing from multiple angles');

  if (factors.length === 0) factors.push('Excellent image quality for analysis');

  return {
    score: scores.reduce((a, b) => a + b) / scores.length,
    factors
  };
}

// Enhanced AI processing with realistic stages
export class EnhancedAIService {
  static async analyzeImage(
    imageData: string, 
    onProgress?: (stage: number, message: string) => void
  ): Promise<AIAnalysisResult> {
    const startTime = Date.now();

    // Stage 1: Image preprocessing
    if (onProgress) onProgress(1, 'Preprocessing image and checking quality...');
    await new Promise(resolve => setTimeout(resolve, 800));

    const imageQuality = analyzeImageQuality();

    // Stage 2: Feature extraction
    if (onProgress) onProgress(2, 'Extracting visual features using CNN model...');
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Stage 3: Disease pattern matching
    if (onProgress) onProgress(3, 'Analyzing disease patterns and symptoms...');
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Stage 4: Confidence calculation
    if (onProgress) onProgress(4, 'Calculating confidence scores and alternatives...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Stage 5: Generating recommendations
    if (onProgress) onProgress(5, 'Generating treatment recommendations...');
    await new Promise(resolve => setTimeout(resolve, 800));

    const processingTime = Date.now() - startTime;

    // Select plant based on weighted probability (more realistic than pure random)
    const weightedPlants = PLANTS.map(plant => ({
      plant,
      weight: plant.confidence * Math.random()
    }));

    weightedPlants.sort((a, b) => b.weight - a.weight);
    const primaryPlant = weightedPlants[0].plant;

    // Calculate confidence based on image quality and plant factors
    const baseConfidence = primaryPlant.confidence * imageQuality.score;
    const randomVariation = (Math.random() - 0.5) * 0.2; // ±10% variation
    const finalConfidence = Math.max(0.5, Math.min(0.99, baseConfidence + randomVariation));

    // Generate alternative species
    const alternatives = weightedPlants.slice(1, 3).map(item => ({
      species: item.plant.common_name,
      confidence: Math.max(0.2, finalConfidence * (0.4 + Math.random() * 0.3))
    }));

    // Determine certainty level
    let certainty: AIAnalysisResult['certainty'] = 'medium';
    if (finalConfidence >= 0.9) certainty = 'very_high';
    else if (finalConfidence >= 0.8) certainty = 'high';
    else if (finalConfidence >= 0.6) certainty = 'medium';
    else if (finalConfidence >= 0.4) certainty = 'low';
    else certainty = 'very_low';

    return {
      plant: primaryPlant,
      confidence: Math.round(finalConfidence * 100) / 100,
      certainty,
      processingTime,
      imageQualityScore: Math.round(imageQuality.score * 100),
      alternativeDiagnoses: alternatives,
      recommendations: {
        immediate: [
          primaryPlant.landscaping_tips,
          'Monitor plant health regularly',
          'Ensure proper watering and soil conditions'
        ],
        followUp: [
          'Track growth and CO2 absorption over time',
          'Consider professional landscaping consultation',
          'Update care routine based on seasonal changes'
        ],
        prevention: [
          'Regular soil testing and nutrient management',
          'Proper pruning and maintenance',
          'Seasonal care adjustments'
        ]
      }
    };
  }

  private static getCurrentSeason(): string {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'fall';
    return 'winter';
  }

  static getCertaintyDescription(certainty: AIAnalysisResult['certainty']): string {
    switch (certainty) {
      case 'very_high': return 'Very confident - Clear diagnosis with strong symptom match';
      case 'high': return 'High confidence - Good symptom match, recommended treatment';
      case 'medium': return 'Moderate confidence - Consider alternative diagnoses';
      case 'low': return 'Low confidence - Multiple possibilities, expert consultation recommended';
      case 'very_low': return 'Very uncertain - Image quality or symptoms unclear, retake photo recommended';
      default: return 'Analysis complete';
    }
  }

  static getSeverityColor(severity: string): string {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  }
}