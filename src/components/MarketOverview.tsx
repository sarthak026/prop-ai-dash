import { Property, MarketAnalytics } from '@/types/property';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Home, Target, BarChart3 } from 'lucide-react';

interface MarketOverviewProps {
  properties: Property[];
  analytics: MarketAnalytics;
}

export const MarketOverview = ({ properties, analytics }: MarketOverviewProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    const formatted = `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
    return formatted;
  };

  const getTrendIcon = (value: number) => {
    return value >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
  };

  const getTrendColor = (value: number) => {
    return value >= 0 ? 'text-success' : 'text-destructive';
  };

  const topPerformers = properties
    .sort((a, b) => b.aiScore - a.aiScore)
    .slice(0, 5);

  const averageMetrics = {
    capRate: properties.reduce((sum, p) => sum + p.capRate, 0) / properties.length,
    cocReturn: properties.reduce((sum, p) => sum + p.cocReturn, 0) / properties.length,
    cashFlow: properties.reduce((sum, p) => sum + p.cashFlow, 0) / properties.length,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Market Summary Cards */}
      <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Home className="w-4 h-4 mr-2" />
              Properties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {analytics.totalProperties}
            </div>
            <p className="text-xs text-muted-foreground">Available listings</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Avg Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(analytics.averagePrice)}
            </div>
            <p className={`text-xs flex items-center gap-1 ${getTrendColor(analytics.marketTrends.priceChange30Days)}`}>
              {getTrendIcon(analytics.marketTrends.priceChange30Days)}
              {formatPercentage(analytics.marketTrends.priceChange30Days)} 30d
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Avg Rent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {formatCurrency(analytics.averageRent)}
            </div>
            <p className={`text-xs flex items-center gap-1 ${getTrendColor(analytics.marketTrends.rentChange30Days)}`}>
              {getTrendIcon(analytics.marketTrends.rentChange30Days)}
              {formatPercentage(analytics.marketTrends.rentChange30Days)} 30d
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Avg Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {analytics.averageAiScore.toFixed(0)}/100
            </div>
            <p className="text-xs text-muted-foreground">AI investment score</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Top Performers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topPerformers.map((property, index) => (
            <div key={property.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
              <div>
                <div className="font-medium text-sm">{property.address}</div>
                <div className="text-xs text-muted-foreground">{property.city}, {property.state}</div>
              </div>
              <div className="text-right">
                <Badge className="bg-gradient-success text-success-foreground">
                  {property.aiScore}
                </Badge>
                <div className="text-xs text-muted-foreground mt-1">
                  {property.capRate.toFixed(1)}% cap
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Market Metrics */}
      <Card className="lg:col-span-3 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Market Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-muted-foreground">Average Returns</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Cap Rate:</span>
                  <span className="font-bold text-primary">{averageMetrics.capRate.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">CoC Return:</span>
                  <span className="font-bold text-primary">{averageMetrics.cocReturn.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Cash Flow:</span>
                  <span className={`font-bold ${averageMetrics.cashFlow >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {formatCurrency(averageMetrics.cashFlow)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-muted-foreground">Top Markets</h4>
              <div className="space-y-2">
                {analytics.topPerformingZips.slice(0, 5).map((zip, index) => (
                  <div key={zip} className="flex items-center justify-between">
                    <span className="text-sm">{zip}</span>
                    <Badge variant="outline">#{index + 1}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-muted-foreground">Market Trends</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Inventory:</span>
                  <span className={`font-bold flex items-center gap-1 ${getTrendColor(analytics.marketTrends.inventoryChange)}`}>
                    {getTrendIcon(analytics.marketTrends.inventoryChange)}
                    {formatPercentage(analytics.marketTrends.inventoryChange)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Avg Days on Market:</span>
                  <span className="font-bold">
                    {Math.round(properties.reduce((sum, p) => sum + p.daysOnMarket, 0) / properties.length)} days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Properties Under $300k:</span>
                  <span className="font-bold">
                    {Math.round((properties.filter(p => p.price < 300000).length / properties.length) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};