import { useState } from 'react';
import { PropertyCard } from '@/components/PropertyCard';
import { MarketOverview } from '@/components/MarketOverview';
import { PropertyFilters } from '@/components/PropertyFilters';
import { usePropertyData } from '@/hooks/usePropertyData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, Download, BarChart3, TrendingUp, Brain, Search } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const {
    properties,
    topDeals,
    marketAnalytics,
    loading,
    filters,
    setFilters,
    availableZipCodes,
    availablePropertyTypes
  } = usePropertyData();

  const [view, setView] = useState<'overview' | 'properties'>('overview');

  const handleRefresh = () => {
    toast.info('Refreshing property data...', {
      description: 'Fetching latest market insights and AI scores'
    });
    // In a real app, this would trigger a data refresh
    setTimeout(() => {
      toast.success('Data refreshed successfully!');
    }, 2000);
  };

  const handleExport = () => {
    toast.success('Exporting top deals...', {
      description: 'Generating PDF report with investment analysis'
    });
    // In a real app, this would generate and download a PDF
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>

          {/* Overview Skeletons */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
            <Skeleton className="h-64" />
          </div>

          {/* Property Cards Skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Skeleton key={i} className="h-96" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Brain className="w-8 h-8" />
                PropAI Investment Dashboard
              </h1>
              <p className="text-primary-foreground/80 mt-2">
                AI-powered real estate investment analysis • {properties.length} properties analyzed
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary" onClick={handleRefresh} className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
              <Button variant="secondary" onClick={handleExport} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-4">
          <Button
            variant={view === 'overview' ? 'default' : 'outline'}
            onClick={() => setView('overview')}
            className="flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            Market Overview
          </Button>
          <Button
            variant={view === 'properties' ? 'default' : 'outline'}
            onClick={() => setView('properties')}
            className="flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            All Properties
            <Badge variant="secondary" className="ml-1">
              {properties.length}
            </Badge>
          </Button>
        </div>

        {view === 'overview' ? (
          <>
            {/* Market Overview */}
            <MarketOverview properties={properties} analytics={marketAnalytics} />

            {/* Top Investment Opportunities */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Top Investment Opportunities
                  <Badge className="bg-gradient-success text-success-foreground">
                    AI Ranked
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topDeals.slice(0, 6).map((property, index) => (
                    <PropertyCard 
                      key={property.id} 
                      property={property} 
                      rank={index + 1}
                    />
                  ))}
                </div>
                {topDeals.length > 6 && (
                  <div className="text-center mt-6">
                    <Button 
                      variant="outline" 
                      onClick={() => setView('properties')}
                      className="flex items-center gap-2"
                    >
                      View All {topDeals.length} Properties
                      <TrendingUp className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Filters */}
            <PropertyFilters
              filters={filters}
              onFiltersChange={setFilters}
              availableZipCodes={availableZipCodes}
              availablePropertyTypes={availablePropertyTypes}
            />

            {/* Properties Grid */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    All Properties
                  </span>
                  <Badge variant="secondary">
                    {properties.length} results
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {properties.length === 0 ? (
                  <div className="text-center py-12">
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                      No properties match your filters
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search criteria to see more results
                    </p>
                    <Button variant="outline" onClick={() => setFilters({})}>
                      Clear All Filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property, index) => (
                      <PropertyCard 
                        key={property.id} 
                        property={property} 
                        rank={index + 1}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;