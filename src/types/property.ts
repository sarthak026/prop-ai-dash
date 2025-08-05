export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  estimatedRent: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
  propertyType: 'Single Family' | 'Condo' | 'Duplex' | 'Multi-Family' | 'Townhouse';
  status: 'For Sale' | 'For Rent' | 'Sold' | 'Off Market';
  
  // Investment Metrics
  monthlyExpenses: number;
  taxesAnnual: number;
  insuranceAnnual: number;
  maintenanceAnnual: number;
  
  // Market Data
  crimeIndex: number; // 0-100 (lower is better)
  jobGrowthPercent: number;
  schoolRating: number; // 1-10
  walkScore: number; // 0-100
  
  // Legal/Risk Data
  zoning: string;
  taxOwed: number;
  violations: number;
  
  // Calculated Metrics (will be computed by AI engine)
  aiScore: number;
  noi: number; // Net Operating Income
  capRate: number; // Capitalization Rate
  cocReturn: number; // Cash on Cash Return
  cashFlow: number; // Monthly cash flow
  
  // Meta
  listingDate: string;
  daysOnMarket: number;
  mls?: string;
  
  // Predictions (AI generated)
  rentGrowthPrediction?: number;
  appreciationPrediction?: number;
  riskScore?: number;
}

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  minAiScore?: number;
  maxAiScore?: number;
  zipCodes?: string[];
  propertyTypes?: string[];
  minCapRate?: number;
  maxCrimeIndex?: number;
  minJobGrowth?: number;
}

export interface MarketAnalytics {
  totalProperties: number;
  averagePrice: number;
  averageRent: number;
  averageCapRate: number;
  averageAiScore: number;
  topPerformingZips: string[];
  marketTrends: {
    priceChange30Days: number;
    rentChange30Days: number;
    inventoryChange: number;
  };
}