
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Check, X } from "lucide-react";

export interface FlashcardData {
  id: number;
  word: string;
  definition: string;
  example: string;
  pronunciation?: string;
}

interface FlashcardProps {
  card: FlashcardData;
  onNext: () => void;
  onKnown: (id: number) => void;
  onUnknown: (id: number) => void;
  isActive: boolean;
}

export function Flashcard({ card, onNext, onKnown, onUnknown, isActive }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      // Play a subtle sound when flipping (if desired)
    }
  };

  const handleKnown = () => {
    setIsExiting(true);
    setTimeout(() => {
      onKnown(card.id);
      onNext();
      setIsExiting(false);
      setIsFlipped(false);
    }, 300);
    toast.success("Word marked as known!");
  };

  const handleUnknown = () => {
    setIsExiting(true);
    setTimeout(() => {
      onUnknown(card.id);
      onNext();
      setIsExiting(false);
      setIsFlipped(false);
    }, 300);
    toast.info("Word added for review");
  };

  if (!isActive) return null;

  return (
    <div className={cn(
      "w-full max-w-lg perspective-1000 transition-opacity duration-300",
      isExiting ? "opacity-0" : "opacity-100",
    )}>
      <Card
        className={cn(
          "flashcard relative w-full h-[400px] cursor-pointer transition-all duration-500 shadow-lg",
          isFlipped ? "flipped" : ""
        )}
        onClick={handleFlip}
      >
        <div className="flashcard-front p-6 flex flex-col justify-center items-center text-center rounded-lg bg-card">
          <div className="absolute top-4 left-4 text-xs font-medium text-muted-foreground">
            <span className="bg-muted px-2 py-1 rounded-full">Tap to flip</span>
          </div>
          <div className="space-y-4 w-full">
            <h2 className="text-4xl font-serif font-semibold tracking-tight">{card.word}</h2>
            {card.pronunciation && (
              <p className="text-lg text-muted-foreground">{card.pronunciation}</p>
            )}
          </div>
        </div>
        <div className="flashcard-back p-6 flex flex-col justify-between rounded-lg bg-card">
          <div className="space-y-4 w-full">
            <h2 className="text-2xl font-serif font-semibold">{card.word}</h2>
            <p className="text-lg leading-relaxed">{card.definition}</p>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Example:</p>
              <p className="text-md italic border-l-2 border-primary/40 pl-3 py-1">
                {card.example}
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                handleUnknown();
              }}
              className="flex-1 gap-2"
            >
              <X className="h-4 w-4" /> Need to review
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleKnown();
              }}
              className="flex-1 gap-2"
            >
              <Check className="h-4 w-4" /> Know it
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
