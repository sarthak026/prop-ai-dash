import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, Square } from 'lucide-react';

interface PropertyListCardProps {
  image: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  price: string;
  status: string;
}

export const PropertyListCard = ({ 
  image, 
  address, 
  bedrooms, 
  bathrooms, 
  area, 
  price, 
  status 
}: PropertyListCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video bg-muted relative">
        <img 
          src={image} 
          alt={address}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-3 right-3 bg-card text-card-foreground">
          {status}
        </Badge>
      </div>
      
      <div className="p-4 space-y-3">
        <h4 className="font-heading font-semibold text-foreground">
          {address}
        </h4>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span className="font-body">{bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span className="font-body">{bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            <span className="font-body">{area} sqft</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="font-heading font-bold text-lg text-foreground">
            {price}
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Auction 1.30pm Saturday 15 April
          </p>
        </div>
      </div>
    </Card>
  );
};