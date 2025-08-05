import { useState } from 'react';
import { PropertyFilters as FilterType } from '@/types/property';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Filter, Search } from 'lucide-react';

interface PropertyFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  availableZipCodes: string[];
  availablePropertyTypes: string[];
}

export const PropertyFilters = ({ 
  filters, 
  onFiltersChange, 
  availableZipCodes, 
  availablePropertyTypes 
}: PropertyFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [zipCodeInput, setZipCodeInput] = useState('');

  const updateFilter = (key: keyof FilterType, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const addZipCode = () => {
    if (zipCodeInput && !filters.zipCodes?.includes(zipCodeInput)) {
      const newZipCodes = [...(filters.zipCodes || []), zipCodeInput];
      updateFilter('zipCodes', newZipCodes);
      setZipCodeInput('');
    }
  };

  const removeZipCode = (zipCode: string) => {
    const newZipCodes = filters.zipCodes?.filter(z => z !== zipCode) || [];
    updateFilter('zipCodes', newZipCodes.length > 0 ? newZipCodes : undefined);
  };

  const addPropertyType = (type: string) => {
    if (!filters.propertyTypes?.includes(type)) {
      const newTypes = [...(filters.propertyTypes || []), type];
      updateFilter('propertyTypes', newTypes);
    }
  };

  const removePropertyType = (type: string) => {
    const newTypes = filters.propertyTypes?.filter(t => t !== type) || [];
    updateFilter('propertyTypes', newTypes.length > 0 ? newTypes : undefined);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== undefined && 
    value !== null && 
    (Array.isArray(value) ? value.length > 0 : true)
  ).length;

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Filters - Always Visible */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <Label className="text-xs text-muted-foreground">Min AI Score</Label>
            <Input
              type="number"
              placeholder="0-100"
              value={filters.minAiScore || ''}
              onChange={(e) => updateFilter('minAiScore', e.target.value ? Number(e.target.value) : undefined)}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Max Price</Label>
            <Input
              type="number"
              placeholder="$"
              value={filters.maxPrice || ''}
              onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Min Cap Rate</Label>
            <Input
              type="number"
              step="0.1"
              placeholder="%"
              value={filters.minCapRate || ''}
              onChange={(e) => updateFilter('minCapRate', e.target.value ? Number(e.target.value) : undefined)}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Max Crime</Label>
            <Input
              type="number"
              placeholder="0-100"
              value={filters.maxCrimeIndex || ''}
              onChange={(e) => updateFilter('maxCrimeIndex', e.target.value ? Number(e.target.value) : undefined)}
              className="mt-1"
            />
          </div>
        </div>

        {/* Advanced Filters - Expandable */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t">
            {/* ZIP Codes */}
            <div>
              <Label className="text-sm font-medium">ZIP Codes</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Enter ZIP code"
                  value={zipCodeInput}
                  onChange={(e) => setZipCodeInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addZipCode()}
                />
                <Button onClick={addZipCode} size="sm">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              {filters.zipCodes && filters.zipCodes.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {filters.zipCodes.map(zipCode => (
                    <Badge key={zipCode} variant="secondary" className="flex items-center gap-1">
                      {zipCode}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => removeZipCode(zipCode)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Property Types */}
            <div>
              <Label className="text-sm font-medium">Property Types</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {availablePropertyTypes.map(type => (
                  <Button
                    key={type}
                    variant={filters.propertyTypes?.includes(type) ? "default" : "outline"}
                    size="sm"
                    onClick={() => 
                      filters.propertyTypes?.includes(type) 
                        ? removePropertyType(type)
                        : addPropertyType(type)
                    }
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium">Min Price</Label>
                <Input
                  type="number"
                  placeholder="$0"
                  value={filters.minPrice || ''}
                  onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Max Price</Label>
                <Input
                  type="number"
                  placeholder="No limit"
                  value={filters.maxPrice || ''}
                  onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Advanced Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium">Min Job Growth (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="0%"
                  value={filters.minJobGrowth || ''}
                  onChange={(e) => updateFilter('minJobGrowth', e.target.value ? Number(e.target.value) : undefined)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">AI Score Range</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minAiScore || ''}
                    onChange={(e) => updateFilter('minAiScore', e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxAiScore || ''}
                    onChange={(e) => updateFilter('maxAiScore', e.target.value ? Number(e.target.value) : undefined)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};