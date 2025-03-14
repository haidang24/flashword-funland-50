
import { useState, useEffect } from "react";
import { Flashcard, FlashcardData } from "./Flashcard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, RefreshCw, Tag } from "lucide-react";
import { toast } from "sonner";
import { categories } from "@/data/flashcards";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface FlashcardDeckProps {
  cards: FlashcardData[];
}

export function FlashcardDeck({ cards }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownCards, setKnownCards] = useState<number[]>([]);
  const [reviewCards, setReviewCards] = useState<number[]>([]);
  const [showReviewMode, setShowReviewMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [deckComplete, setDeckComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  // Filter cards based on mode and category
  const filteredCards = cards.filter(card => {
    // Apply category filter
    if (selectedCategory && card.categoryId !== selectedCategory) {
      return false;
    }
    // Apply review mode filter
    if (showReviewMode && !reviewCards.includes(card.id)) {
      return false;
    }
    return true;
  });

  const activeCards = filteredCards;

  useEffect(() => {
    // Reset current index when filters change
    setCurrentIndex(0);
    setDeckComplete(false);
  }, [selectedCategory, showReviewMode]);

  useEffect(() => {
    if (activeCards.length > 0) {
      setProgress((currentIndex / activeCards.length) * 100);
    }
    
    if (currentIndex >= activeCards.length && activeCards.length > 0) {
      setDeckComplete(true);
      if (showReviewMode) {
        toast.success("Review complete! Great work!");
      } else {
        toast.success("Deck complete! Well done!");
      }
    } else {
      setDeckComplete(false);
    }
  }, [currentIndex, activeCards.length, showReviewMode]);

  const handleNext = () => {
    if (currentIndex < activeCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setDeckComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleKnown = (id: number) => {
    if (!knownCards.includes(id)) {
      setKnownCards([...knownCards, id]);
    }
    // Remove from review if it was there
    setReviewCards(reviewCards.filter(cardId => cardId !== id));
  };

  const handleUnknown = (id: number) => {
    if (!reviewCards.includes(id)) {
      setReviewCards([...reviewCards, id]);
    }
  };

  const toggleReviewMode = () => {
    if (showReviewMode) {
      setShowReviewMode(false);
      setCurrentIndex(0);
      toast.info("Showing all cards");
    } else {
      if (reviewCards.length === 0) {
        toast.warning("No cards to review yet");
        return;
      }
      setShowReviewMode(true);
      setCurrentIndex(0);
      toast.info(`Reviewing ${reviewCards.length} cards`);
    }
  };

  const resetDeck = () => {
    setCurrentIndex(0);
    setDeckComplete(false);
    toast.info("Deck reset");
  };

  // Get category counts
  const getCategoryCounts = () => {
    const counts: Record<string, number> = {};
    categories.forEach(category => {
      counts[category.id] = cards.filter(card => card.categoryId === category.id).length;
    });
    return counts;
  };

  const categoryCounts = getCategoryCounts();

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] p-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">No flashcards found</h2>
        <p className="text-muted-foreground">The deck is empty or still loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      <div className="w-full mb-6 flex flex-col gap-3">
        {/* Filters and progress indicators */}
        <div className="flex justify-between items-center w-full px-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {!deckComplete ? `${currentIndex + 1} / ${activeCards.length}` : "Complete!"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className={selectedCategory ? "text-primary" : ""}>
                  <Tag className="h-4 w-4 mr-1" />
                  {selectedCategory ? 
                    categories.find(c => c.id === selectedCategory)?.name : 
                    "Categories"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => setSelectedCategory(null)}
                  className={selectedCategory === null ? "bg-muted" : ""}
                >
                  All Categories <span className="ml-auto">{cards.length}</span>
                </DropdownMenuItem>
                {categories.map(category => (
                  <DropdownMenuItem 
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? "bg-muted" : ""}
                    disabled={categoryCounts[category.id] === 0}
                  >
                    <span className={`w-2 h-2 rounded-full mr-2 ${category.color}`}></span>
                    {category.name}
                    <span className="ml-auto">{categoryCounts[category.id]}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleReviewMode}
              className={showReviewMode ? "text-primary" : ""}
            >
              {showReviewMode ? (
                <BookmarkCheck className="h-4 w-4 mr-1" />
              ) : (
                <Bookmark className="h-4 w-4 mr-1" />
              )}
              {showReviewMode ? "Reviewing" : "Review mode"}
              {reviewCards.length > 0 && !showReviewMode && (
                <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full px-1.5 py-0.5">
                  {reviewCards.length}
                </span>
              )}
            </Button>
          </div>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      {deckComplete ? (
        <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in">
          <h2 className="text-2xl font-semibold mb-2">
            {showReviewMode ? "Review Complete!" : "Deck Complete!"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {showReviewMode
              ? `You've reviewed all ${activeCards.length} cards.`
              : `You've completed all ${activeCards.length} cards!`}
          </p>
          <Button onClick={resetDeck} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Start Again
          </Button>
        </div>
      ) : (
        <>
          {/* Display message when no cards match filters */}
          {activeCards.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px] p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">No matching flashcards</h2>
              <p className="text-muted-foreground">Try changing your filters</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSelectedCategory(null);
                  setShowReviewMode(false);
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              {/* Flashcard container */}
              <div className="relative w-full">
                {activeCards.map((card, index) => (
                  <Flashcard
                    key={card.id}
                    card={card}
                    onNext={handleNext}
                    onKnown={handleKnown}
                    onUnknown={handleUnknown}
                    isActive={currentIndex === index}
                  />
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between w-full mt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNext}
                  className="gap-2"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
