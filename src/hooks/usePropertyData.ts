import { useState, useEffect, useMemo } from 'react';
import { Property, PropertyFilters, MarketAnalytics } from '@/types/property';
import { PropertyAIEngine } from '@/services/aiEngine';
import { mockProperties } from '@/data/mockProperties';

export const usePropertyData = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<PropertyFilters>({});

  // Process properties with AI engine
  useEffect(() => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const processedProperties = PropertyAIEngine.processAndRankProperties(mockProperties);
      setProperties(processedProperties);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter properties based on current filters
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Price filters
      if (filters.minPrice && property.price < filters.minPrice) return false;
      if (filters.maxPrice && property.price > filters.maxPrice) return false;
      
      // AI Score filters
      if (filters.minAiScore && property.aiScore < filters.minAiScore) return false;
      if (filters.maxAiScore && property.aiScore > filters.maxAiScore) return false;
      
      // ZIP codes filter
      if (filters.zipCodes && filters.zipCodes.length > 0 && 
          !filters.zipCodes.includes(property.zipCode)) return false;
      
      // Property types filter
      if (filters.propertyTypes && filters.propertyTypes.length > 0 && 
          !filters.propertyTypes.includes(property.propertyType)) return false;
      
      // Cap rate filter
      if (filters.minCapRate && property.capRate < filters.minCapRate) return false;
      
      // Crime index filter
      if (filters.maxCrimeIndex && property.crimeIndex > filters.maxCrimeIndex) return false;
      
      // Job growth filter
      if (filters.minJobGrowth && property.jobGrowthPercent < filters.minJobGrowth / 100) return false;
      
      return true;
    });
  }, [properties, filters]);

  // Calculate market analytics
  const marketAnalytics = useMemo((): MarketAnalytics => {
    if (properties.length === 0) {
      return {
        totalProperties: 0,
        averagePrice: 0,
        averageRent: 0,
        averageCapRate: 0,
        averageAiScore: 0,
        topPerformingZips: [],
        marketTrends: {
          priceChange30Days: 0,
          rentChange30Days: 0,
          inventoryChange: 0
        }
      };
    }

    // Calculate averages
    const totalProperties = properties.length;
    const averagePrice = properties.reduce((sum, p) => sum + p.price, 0) / totalProperties;
    const averageRent = properties.reduce((sum, p) => sum + p.estimatedRent, 0) / totalProperties;
    const averageCapRate = properties.reduce((sum, p) => sum + p.capRate, 0) / totalProperties;
    const averageAiScore = properties.reduce((sum, p) => sum + p.aiScore, 0) / totalProperties;

    // Find top performing ZIP codes
    const zipPerformance = properties.reduce((acc, property) => {
      if (!acc[property.zipCode]) {
        acc[property.zipCode] = { total: 0, count: 0 };
      }
      acc[property.zipCode].total += property.aiScore;
      acc[property.zipCode].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    const topPerformingZips = Object.entries(zipPerformance)
      .map(([zip, data]) => ({ zip, average: data.total / data.count }))
      .sort((a, b) => b.average - a.average)
      .slice(0, 5)
      .map(item => item.zip);

    // Simulate market trends (would come from historical data in real app)
    const marketTrends = {
      priceChange30Days: 2.3,
      rentChange30Days: 1.8,
      inventoryChange: -5.2
    };

    return {
      totalProperties,
      averagePrice,
      averageRent,
      averageCapRate,
      averageAiScore,
      topPerformingZips,
      marketTrends
    };
  }, [properties]);

  // Get unique values for filters
  const availableZipCodes = useMemo(() => 
    [...new Set(properties.map(p => p.zipCode))].sort(),
    [properties]
  );

  const availablePropertyTypes = useMemo(() => 
    [...new Set(properties.map(p => p.propertyType))].sort(),
    [properties]
  );

  // Get top deals (highest AI scores)
  const topDeals = useMemo(() => 
    filteredProperties.slice(0, 10),
    [filteredProperties]
  );

  return {
    properties: filteredProperties,
    allProperties: properties,
    topDeals,
    marketAnalytics,
    loading,
    filters,
    setFilters,
    availableZipCodes,
    availablePropertyTypes
  };
};