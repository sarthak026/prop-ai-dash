import { useState } from 'react';
import { Search, Filter, MapPin, Calendar, DollarSign, Grid, X } from 'lucide-react';
import { AppSidebar } from '@/components/AppSidebar';
import { PropertyCard } from '@/components/PropertyCard';
import { PropertyFilters } from '@/components/PropertyFilters';
import { ProfileDropdown } from '@/components/ProfileDropdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePropertyData } from '@/hooks/usePropertyData';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

const Properties = () => {
  const { 
    properties, 
    filteredProperties, 
    filters, 
    updateFilters, 
    resetFilters, 
    availableZipCodes, 
    availablePropertyTypes 
  } = usePropertyData();

  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        
        <SidebarInset>
          {/* Header */}
          <header className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold text-foreground">Properties</h1>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search properties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80 bg-background border-border"
                  />
                </div>
                
                {/* Filter and View Toggle Buttons */}
                <Button
                  variant={showFilters ? "default" : "outline"}
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
                
                <div className="flex rounded-lg border border-border bg-background p-1">
                  <Button
                    variant={viewMode === 'grid' ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="flex items-center gap-1 px-3"
                  >
                    <Grid className="h-4 w-4" />
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === 'map' ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode('map')}
                    className="flex items-center gap-1 px-3"
                  >
                    <MapPin className="h-4 w-4" />
                    Map
                  </Button>
                </div>
                
                {/* Profile Dropdown */}
                <ProfileDropdown />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 bg-card border border-border">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Properties</h3>
                <p className="text-3xl font-bold text-foreground">{properties.length}</p>
              </Card>
              <Card className="p-6 bg-card border border-border">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Available</h3>
                <p className="text-3xl font-bold text-foreground">{filteredProperties.length}</p>
              </Card>
              <Card className="p-6 bg-card border border-border">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Avg Score</h3>
                <p className="text-3xl font-bold text-foreground">
                  {filteredProperties.length > 0 
                    ? Math.round(filteredProperties.reduce((acc, p) => acc + p.aiScore, 0) / filteredProperties.length)
                    : 0
                  }
                </p>
              </Card>
              <Card className="p-6 bg-card border border-border">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Value</h3>
                <p className="text-3xl font-bold text-foreground">
                  ${filteredProperties.reduce((acc, p) => acc + p.price, 0).toLocaleString()}
                </p>
              </Card>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mb-6">
                <PropertyFilters
                  filters={filters}
                  onFiltersChange={updateFilters}
                  availableZipCodes={availableZipCodes}
                  availablePropertyTypes={availablePropertyTypes}
                />
              </div>
            )}

            {/* Content based on view mode */}
            {viewMode === 'grid' ? (
              /* Property Grid */
              filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No properties found matching your criteria.</p>
                  <Button onClick={resetFilters} variant="outline">
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                </div>
              )
            ) : (
              /* Map View */
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Map View</h3>
                <p className="text-muted-foreground mb-4">
                  Interactive map showing all {filteredProperties.length} properties with location markers, 
                  pricing, and quick property details.
                </p>
                <div className="bg-muted rounded-lg p-8 text-muted-foreground">
                  Map integration will be implemented here with property markers and interactive features.
                </div>
              </div>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Properties;