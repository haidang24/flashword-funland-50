
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { defaultTopics, getFlashcards } from "@/data/flashcards";
import { FlashcardDeck } from "@/components/FlashcardDeck";
import { FlashcardData } from "@/components/Flashcard";

const TopicLearningPage = () => {
  const navigate = useNavigate();
  const { topicId } = useParams<{ topicId: string }>();
  const [topic, setTopic] = useState(defaultTopics.find(t => t.id === topicId));
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!topicId) {
      navigate("/topics");
      return;
    }

    const foundTopic = defaultTopics.find(t => t.id === topicId);
    if (!foundTopic) {
      navigate("/topics");
      return;
    }

    setTopic(foundTopic);
    
    // Get all flashcards
    const allCards = getFlashcards();
    
    // Filter flashcards by categories included in this topic
    const topicFlashcards = allCards.filter(card => 
      foundTopic.categoryIds.includes(card.categoryId || "")
    );
    
    setFlashcards(topicFlashcards);
    setLoading(false);
  }, [topicId, navigate]);

  if (loading || !topic) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="flex-1 container py-8 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1 overflow-x-hidden">
        <div className="container py-8 md:py-12 animate-slide-up">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/topics")}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-serif font-semibold">Learning: {topic.name}</h1>
          </div>
          
          {topic.description && (
            <p className="text-muted-foreground max-w-2xl mb-8">{topic.description}</p>
          )}
          
          {flashcards.length > 0 ? (
            <FlashcardDeck cards={flashcards} />
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center max-w-md mx-auto">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">No flashcards available</h2>
              <p className="text-muted-foreground mb-6">
                There are no flashcards in this topic's categories. Add some flashcards to get started!
              </p>
              <Button onClick={() => navigate("/manage")}>
                Add Flashcards
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <footer className="border-t border-border/40 py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>WordFlow — Learn English with elegance and efficiency.</p>
        </div>
      </footer>
    </div>
  );
};

export default TopicLearningPage;
