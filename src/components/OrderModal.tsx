import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Send, Edit3, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OrderDetails {
  product: string;
  quantity: string;
  color: string;
  size: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface OrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'chat' | 'voice';
}

export const OrderModal = ({ open, onOpenChange, mode }: OrderModalProps) => {
  const [step, setStep] = useState(1);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    product: '',
    quantity: '',
    color: '',
    size: '',
    name: '',
    address: '',
    phone: '',
    email: ''
  });
  const [currentInput, setCurrentInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'bot' | 'user', text: string }>>([]);
  const [recognition, setRecognition] = useState<any>(null);
  const { toast } = useToast();

  const questions = [
    "What product would you like to order? Please describe it.",
    "How many would you like?",
    "What color would you prefer?",
    "What size do you need?",
    "What's your full name?",
    "What's your delivery address?",
    "What's your phone number?",
    "What's your email address?"
  ];

  const fields: (keyof OrderDetails)[] = ['product', 'quantity', 'color', 'size', 'name', 'address', 'phone', 'email'];

  useEffect(() => {
    if (mode === 'voice' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setCurrentInput(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Please try again or switch to text input.",
          variant: "destructive",
        });
      };

      setRecognition(recognitionInstance);
    }
  }, [mode, toast]);

  useEffect(() => {
    if (open) {
      setStep(1);
      setOrderDetails({
        product: '', quantity: '', color: '', size: '',
        name: '', address: '', phone: '', email: ''
      });
      setMessages([{ type: 'bot', text: questions[0] }]);
      setCurrentInput('');
    }
  }, [open]);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleSubmit = () => {
    if (!currentInput.trim()) return;

    const fieldIndex = step - 1;
    const field = fields[fieldIndex];
    
    setMessages(prev => [...prev, { type: 'user', text: currentInput }]);
    setOrderDetails(prev => ({ ...prev, [field]: currentInput }));
    setCurrentInput('');

    if (step < questions.length) {
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: questions[step] }]);
        setStep(step + 1);
      }, 500);
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: 'Perfect! Let me show you a summary of your order.' }]);
        setStep(step + 1);
      }, 500);
    }
  };

  const confirmOrder = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://hemanth-mariserla18.app.n8n.cloud/webhook-test/27bd26b5-0c53-4813-a356-bad56b1f3b10', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          ...orderDetails,
          timestamp: new Date().toISOString(),
          orderSource: mode,
        }),
      });

      toast({
        title: "Order Submitted!",
        description: "Your order has been sent successfully. You will receive a confirmation soon.",
      });

      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: 'Thank you! Your order has been submitted successfully. You will receive a payment link and confirmation details shortly.' 
      }]);
      
      setTimeout(() => onOpenChange(false), 3000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const editField = (fieldIndex: number) => {
    setStep(fieldIndex + 1);
    setCurrentInput(orderDetails[fields[fieldIndex]]);
    setMessages(prev => [...prev, { type: 'bot', text: `Let's update: ${questions[fieldIndex]}` }]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {mode === 'voice' ? <Mic className="h-5 w-5 text-voice-primary" /> : <Send className="h-5 w-5 text-chat-primary" />}
            {mode === 'voice' ? 'Voice Order Assistant' : 'Chat Order Assistant'}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground'
              }`}>
                {message.text}
              </div>
            </div>
          ))}

          {step > questions.length && (
            <Card className="p-6 bg-gradient-card">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Order Summary
              </h3>
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field} className="flex justify-between items-center">
                    <span className="capitalize font-medium">{field}:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{orderDetails[field]}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => editField(index)}
                        className="h-6 w-6 p-0"
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t">
                <Button 
                  onClick={confirmOrder} 
                  className="w-full bg-gradient-button shadow-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting Order...
                    </>
                  ) : (
                    'Confirm Order'
                  )}
                </Button>
              </div>
            </Card>
          )}
        </div>

        {step <= questions.length && (
          <div className="border-t pt-4 space-y-3">
            <div className="flex gap-2">
              <Textarea
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder={mode === 'voice' ? "Speak or type your response..." : "Type your response..."}
                className="flex-1 min-h-[80px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
            </div>
            <div className="flex gap-2">
              {mode === 'voice' && (
                <Button
                  onClick={isListening ? stopListening : startListening}
                  variant={isListening ? "destructive" : "outline"}
                  className={isListening ? "animate-pulse" : ""}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  {isListening ? 'Stop' : 'Speak'}
                </Button>
              )}
              <Button 
                onClick={handleSubmit} 
                disabled={!currentInput.trim()}
                className="flex-1 bg-gradient-button shadow-button"
              >
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};