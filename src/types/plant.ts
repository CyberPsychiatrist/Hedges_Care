export interface Plant {
  id: string;
  species_name: string;
  common_name: string;
  plant_type: string;
  description: string;
  region: string;
  country: string;
  height_m: number;
  canopy_m2: number;
  wood_density_g_cm3: number;
  agb_kg: number; // Above Ground Biomass
  bgb_kg: number; // Below Ground Biomass
  carbon_storage_kg: number;
  total_CO2eq_stored_kg: number;
  annual_C_kg: number;
  annual_CO2_kg: number;
  annual_growth_rate_pct: number;
  co2_absorption_change_rate_pct: number;
  mortality_rate: number;
  leaf_area_index: number;
  root_depth_m: number;
  mean_temp_C: number;
  annual_rainfall_mm: number;
  soil_type: string;
  soil_carbon_percent: number;
  altitude_m: number;
  iucn_status: string;
  biodiversity_value: number;
  habitat_loss_percent: number;
  protected_area_presence: number;
  invasive_risk_score: number;
  maintenance_cost_usd_per_year: number;
  co2_absorption_impact: string;
  optimal_conditions: string;
  landscaping_uses: string[];
  environmental_benefits: string[];
  care_instructions: string[];
}