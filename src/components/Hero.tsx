import { Button } from "@/components/ui/button";
import { MessageCircle, Mic } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

interface HeroProps {
  onStartChat: () => void;
  onStartVoice: () => void;
}

export const Hero = ({ onStartChat, onStartVoice }: HeroProps) => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Artisan workspace" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40" />
      </div>
      
      <div className="container relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
          Handcrafted
          <span className="block text-primary">Excellence</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover unique artisanal products crafted with care. Order through our intelligent 
          chat or voice assistant for a personalized shopping experience.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={onStartChat}
            size="lg"
            className="bg-chat-primary hover:bg-chat-primary/90 text-white shadow-button hover:shadow-lg hover:scale-105 transition-all duration-300 min-w-48"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Order through Chat
          </Button>
          <Button 
            onClick={onStartVoice}
            variant="outline"
            size="lg"
            className="border-voice-primary text-voice-primary hover:bg-voice-secondary hover:text-voice-primary shadow-soft hover:shadow-button hover:scale-105 transition-all duration-300 min-w-48"
          >
            <Mic className="mr-2 h-5 w-5" />
            Order through Voice
          </Button>
        </div>
      </div>
    </section>
  );
};