import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CartButton = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative group"
      onClick={() => navigate('/checkout')}
    >
      <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
      {totalItems > 0 && (
        <Badge 
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-scale-in"
          variant="default"
        >
          {totalItems}
        </Badge>
      )}
    </Button>
  );
};

export default CartButton;
