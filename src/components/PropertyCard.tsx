import { Property } from '@/types/property';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Square, Calendar, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  rank?: number;
}

export const PropertyCard = ({ property, rank }: PropertyCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-gradient-success text-success-foreground';
    if (score >= 60) return 'bg-primary text-primary-foreground';
    if (score >= 40) return 'bg-warning text-warning-foreground';
    return 'bg-neutral text-neutral-foreground';
  };

  const getCashFlowIcon = (cashFlow: number) => {
    return cashFlow >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <Card className="shadow-card hover:shadow-investment transition-all duration-300 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-card-foreground">
              {property.address}
            </CardTitle>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {property.city}, {property.state} {property.zipCode}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            {rank && (
              <Badge variant="outline" className="text-xs">
                #{rank}
              </Badge>
            )}
            <Badge className={`${getScoreColor(property.aiScore)} font-bold text-sm px-3 py-1`}>
              {property.aiScore}/100
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Property Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(property.price)}
            </div>
            <div className="text-lg text-success font-semibold">
              {formatCurrency(property.estimatedRent)}/mo
            </div>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-center justify-end text-sm text-muted-foreground">
              <Bed className="w-4 h-4 mr-1" />
              {property.bedrooms} bed
            </div>
            <div className="flex items-center justify-end text-sm text-muted-foreground">
              <Bath className="w-4 h-4 mr-1" />
              {property.bathrooms} bath
            </div>
            <div className="flex items-center justify-end text-sm text-muted-foreground">
              <Square className="w-4 h-4 mr-1" />
              {property.sqft.toLocaleString()} sqft
            </div>
          </div>
        </div>

        {/* Investment Metrics */}
        <div className="grid grid-cols-3 gap-3 p-3 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Cap Rate</div>
            <div className="font-bold text-primary">{formatPercentage(property.capRate)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">CoC Return</div>
            <div className="font-bold text-primary">{formatPercentage(property.cocReturn)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Cash Flow</div>
            <div className={`font-bold flex items-center justify-center gap-1 ${
              property.cashFlow >= 0 ? 'text-success' : 'text-destructive'
            }`}>
              {getCashFlowIcon(property.cashFlow)}
              {formatCurrency(property.cashFlow)}
            </div>
          </div>
        </div>

        {/* Market Insights */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Crime Index:</span>
            <span className={`font-medium ${property.crimeIndex <= 30 ? 'text-success' : 
              property.crimeIndex <= 60 ? 'text-warning' : 'text-destructive'}`}>
              {property.crimeIndex}/100
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Job Growth:</span>
            <span className="font-medium text-success">
              +{formatPercentage(property.jobGrowthPercent * 100)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">School Rating:</span>
            <span className="font-medium">{property.schoolRating}/10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Walk Score:</span>
            <span className="font-medium">{property.walkScore}/100</span>
          </div>
        </div>

        {/* Property Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {property.daysOnMarket} days on market
          </div>
          <div className="flex items-center">
            <DollarSign className="w-3 h-3 mr-1" />
            Built {property.yearBuilt}
          </div>
        </div>

        {/* Property Type & MLS */}
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{property.propertyType}</Badge>
          {property.mls && (
            <span className="text-xs text-muted-foreground">{property.mls}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};