import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { OrderModal } from "@/components/OrderModal";
import coffeeScoopImage from "@/assets/coffee-scoop.jpg";
import ceramicVaseImage from "@/assets/ceramic-vase.jpg";
import cuttingBoardImage from "@/assets/cutting-board.jpg";

const Index = () => {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderMode, setOrderMode] = useState<'chat' | 'voice'>('chat');

  const handleStartChat = () => {
    setOrderMode('chat');
    setOrderModalOpen(true);
  };

  const handleStartVoice = () => {
    setOrderMode('voice');
    setOrderModalOpen(true);
  };

  const handleOrderNow = () => {
    setOrderMode('chat');
    setOrderModalOpen(true);
  };

  const products = [
    {
      name: "Handmade Coffee Scoop",
      description: "As rich and unique as the coffee beans it is intended for, this little scoop will make your morning ritual a special occasion every day.",
      price: "$24.99",
      image: coffeeScoopImage,
    },
    {
      name: "Ceramic Artisan Vase",
      description: "Hand-thrown ceramic vase with natural texture, perfect for dried flowers or as a standalone decorative piece.",
      price: "$89.99",
      image: ceramicVaseImage,
    },
    {
      name: "Wooden Cutting Board",
      description: "Sustainably sourced hardwood cutting board with rope handle, designed for both function and beauty in your kitchen.",
      price: "$45.99",
      image: cuttingBoardImage,
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <Hero onStartChat={handleStartChat} onStartVoice={handleStartVoice} />
      
      <section className="py-16 px-4">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trending Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our collection of handcrafted items, each piece telling its own story of artisanal excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
                onOrderNow={handleOrderNow}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary/30">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Experience Smart Shopping
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Our innovative voice and chat ordering system makes shopping effortless. Simply describe what you want, 
            and our AI assistant will guide you through a personalized ordering experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card rounded-lg p-8 shadow-card">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Voice Ordering</h3>
              <p className="text-muted-foreground">
                Speak naturally to place your order. Our voice recognition technology understands your preferences 
                and creates a seamless hands-free shopping experience.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 shadow-card">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Chat Assistant</h3>
              <p className="text-muted-foreground">
                Type your way through an intelligent conversation. Our chat bot asks the right questions 
                to ensure your order is exactly what you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      <OrderModal 
        open={orderModalOpen} 
        onOpenChange={setOrderModalOpen} 
        mode={orderMode}
      />
    </div>
  );
};

export default Index;