import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
  onOrderNow: () => void;
}

export const ProductCard = ({ name, description, price, image, onOrderNow }: ProductCardProps) => {
  return (
    <Card className="group cursor-pointer bg-gradient-card shadow-card hover:shadow-button transition-all duration-300 border-0 overflow-hidden">
      <div className="aspect-square overflow-hidden bg-gradient-to-br from-secondary to-accent">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">{price}</span>
          <Button 
            variant="default"
            size="sm"
            onClick={onOrderNow}
            className="bg-gradient-button shadow-button hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Order Now
          </Button>
        </div>
      </div>
    </Card>
  );
};