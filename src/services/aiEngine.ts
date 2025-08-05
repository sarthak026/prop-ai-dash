import { Property } from '@/types/property';

export class PropertyAIEngine {
  /**
   * Calculate Net Operating Income (NOI)
   * Formula: Annual Rent - Annual Operating Expenses
   */
  static calculateNOI(property: Property): number {
    const annualRent = property.estimatedRent * 12;
    const annualExpenses = property.taxesAnnual + property.insuranceAnnual + property.maintenanceAnnual + (property.monthlyExpenses * 12);
    return annualRent - annualExpenses;
  }

  /**
   * Calculate Capitalization Rate (Cap Rate)
   * Formula: NOI / Property Price
   */
  static calculateCapRate(property: Property): number {
    const noi = this.calculateNOI(property);
    return (noi / property.price) * 100;
  }

  /**
   * Calculate Cash on Cash Return
   * Assumes 20% down payment for simplicity
   */
  static calculateCoCReturn(property: Property): number {
    const downPayment = property.price * 0.2;
    const noi = this.calculateNOI(property);
    const annualMortgage = this.calculateAnnualMortgagePayment(property.price - downPayment);
    const cashFlow = noi - annualMortgage;
    return (cashFlow / downPayment) * 100;
  }

  /**
   * Calculate monthly cash flow
   */
  static calculateMonthlyCashFlow(property: Property): number {
    const monthlyRent = property.estimatedRent;
    const monthlyMortgage = this.calculateMonthlyMortgagePayment(property.price * 0.8);
    const monthlyExpenses = property.monthlyExpenses + (property.taxesAnnual + property.insuranceAnnual + property.maintenanceAnnual) / 12;
    return monthlyRent - monthlyMortgage - monthlyExpenses;
  }

  /**
   * Calculate mortgage payment (simplified)
   * Assumes 6.5% interest rate, 30-year loan
   */
  private static calculateMonthlyMortgagePayment(loanAmount: number): number {
    const monthlyRate = 0.065 / 12;
    const numPayments = 30 * 12;
    return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
           (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  private static calculateAnnualMortgagePayment(loanAmount: number): number {
    return this.calculateMonthlyMortgagePayment(loanAmount) * 12;
  }

  /**
   * Calculate comprehensive AI score (0-100)
   * Weighted composite of multiple factors
   */
  static calculateAIScore(property: Property): number {
    const capRate = this.calculateCapRate(property);
    const cocReturn = this.calculateCoCReturn(property);
    const cashFlow = this.calculateMonthlyCashFlow(property);
    
    // Normalize metrics (0-100 scale)
    const capRateScore = Math.min(Math.max((capRate - 2) * 10, 0), 100); // 2% = 0, 12% = 100
    const cocScore = Math.min(Math.max((cocReturn - 5) * 5, 0), 100); // 5% = 0, 25% = 100
    const cashFlowScore = Math.min(Math.max((cashFlow + 500) / 15, 0), 100); // -$500 = 0, $1000 = 100
    
    // Market factors
    const crimeScore = 100 - property.crimeIndex; // Lower crime = higher score
    const jobGrowthScore = Math.min(Math.max(property.jobGrowthPercent * 10, 0), 100);
    const schoolScore = property.schoolRating * 10;
    const walkabilityScore = property.walkScore;
    
    // Risk factors
    const riskPenalty = (property.violations * 5) + (property.taxOwed / 1000);
    const ageBonus = property.yearBuilt > 1990 ? 10 : property.yearBuilt > 1970 ? 5 : 0;
    
    // Weighted score calculation
    const score = (
      capRateScore * 0.25 +           // 25% - Profitability
      cocScore * 0.20 +               // 20% - Return on investment
      cashFlowScore * 0.20 +          // 20% - Cash flow
      crimeScore * 0.10 +             // 10% - Safety
      jobGrowthScore * 0.08 +         // 8% - Economic growth
      schoolScore * 0.07 +            // 7% - Education quality
      walkabilityScore * 0.05 +       // 5% - Walkability
      ageBonus * 0.05                 // 5% - Property condition bonus
    ) - riskPenalty;
    
    return Math.min(Math.max(Math.round(score), 0), 100);
  }

  /**
   * Calculate risk score (0-100, higher = more risky)
   */
  static calculateRiskScore(property: Property): number {
    let riskScore = 0;
    
    // Market risk factors
    riskScore += property.crimeIndex * 0.3;
    riskScore += Math.max(0, (property.daysOnMarket - 30) * 0.1);
    riskScore += property.violations * 5;
    riskScore += (property.taxOwed / property.price) * 100;
    
    // Property age risk
    const currentYear = new Date().getFullYear();
    const age = currentYear - property.yearBuilt;
    if (age > 50) riskScore += 15;
    else if (age > 30) riskScore += 8;
    else if (age > 20) riskScore += 3;
    
    // Job market risk
    riskScore += Math.max(0, (0 - property.jobGrowthPercent) * 10);
    
    return Math.min(Math.round(riskScore), 100);
  }

  /**
   * Predict rent growth (simplified ML simulation)
   */
  static predictRentGrowth(property: Property): number {
    const baseGrowth = 0.03; // 3% baseline
    const jobGrowthFactor = property.jobGrowthPercent * 0.5;
    const schoolFactor = (property.schoolRating - 5) * 0.005;
    const walkabilityFactor = (property.walkScore - 50) * 0.0002;
    const crimeFactor = (50 - property.crimeIndex) * 0.0001;
    
    const predictedGrowth = baseGrowth + jobGrowthFactor + schoolFactor + walkabilityFactor + crimeFactor;
    return Math.min(Math.max(predictedGrowth, -0.05), 0.15); // -5% to 15% range
  }

  /**
   * Predict property appreciation
   */
  static predictAppreciation(property: Property): number {
    const baseAppreciation = 0.04; // 4% baseline
    const locationFactor = property.jobGrowthPercent * 0.3;
    const qualityFactor = (property.schoolRating - 5) * 0.003;
    const ageFactor = property.yearBuilt > 2000 ? 0.01 : property.yearBuilt > 1980 ? 0 : -0.005;
    
    const predictedAppreciation = baseAppreciation + locationFactor + qualityFactor + ageFactor;
    return Math.min(Math.max(predictedAppreciation, -0.02), 0.12); // -2% to 12% range
  }

  /**
   * Process a property with all AI calculations
   */
  static processProperty(property: Property): Property {
    return {
      ...property,
      noi: this.calculateNOI(property),
      capRate: this.calculateCapRate(property),
      cocReturn: this.calculateCoCReturn(property),
      cashFlow: this.calculateMonthlyCashFlow(property),
      aiScore: this.calculateAIScore(property),
      riskScore: this.calculateRiskScore(property),
      rentGrowthPrediction: this.predictRentGrowth(property),
      appreciationPrediction: this.predictAppreciation(property)
    };
  }

  /**
   * Process and rank multiple properties
   */
  static processAndRankProperties(properties: Property[]): Property[] {
    const processedProperties = properties.map(property => this.processProperty(property));
    return processedProperties.sort((a, b) => b.aiScore - a.aiScore);
  }
}