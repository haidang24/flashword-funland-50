
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { FlashcardDeck } from "@/components/FlashcardDeck";
import { flashcardData } from "@/data/flashcards";
import { Button } from "@/components/ui/button";
import { BookOpen, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [started, setStarted] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1 overflow-x-hidden">
        {!started ? (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 animate-fade-in">
            <div className="relative w-full max-w-4xl mx-auto p-8 md:p-12 rounded-2xl glass text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl -z-10"></div>
              <div className="flex flex-col space-y-6 max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <BookOpen className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight">
                  WordFlow
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  Enhance your English vocabulary with beautifully designed flashcards. 
                  Flip, learn, and master new words at your own pace.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button 
                    size="lg" 
                    onClick={() => setStarted(true)}
                    className="animate-float"
                  >
                    Start Learning
                  </Button>
                  <Link to="/manage" className="animate-float">
                    <Button 
                      size="lg"
                      variant="outline"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Manage Flashcards
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              <FeatureCard 
                title="Intuitive Learning"
                description="Flip cards with a simple tap to reveal definitions, examples, and pronunciations."
              />
              <FeatureCard 
                title="Track Progress"
                description="Mark words as known or for review to customize your learning journey."
              />
              <FeatureCard 
                title="Review Mode"
                description="Focus on challenging words with a dedicated review mode for efficient learning."
              />
            </div>
          </div>
        ) : (
          <div className="container py-8 md:py-12 animate-slide-up">
            <div className="flex flex-col items-center pb-8">
              <h1 className="text-3xl font-serif font-semibold mb-4">English Flashcards</h1>
              <p className="text-muted-foreground text-center max-w-md">
                Tap on a card to reveal its meaning, then mark it as known or for review.
              </p>
            </div>
            
            <FlashcardDeck cards={flashcardData} />
            
            <div className="flex justify-center gap-4 mt-8">
              <Button 
                variant="outline" 
                onClick={() => setStarted(false)}
              >
                Back to Home
              </Button>
              <Link to="/manage">
                <Button variant="secondary">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Manage Flashcards
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
      
      <footer className="border-t border-border/40 py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>WordFlow — Learn English with elegance and efficiency.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="bg-card p-6 rounded-xl shadow-sm border border-border/50 flex flex-col space-y-2">
      <h3 className="font-medium text-lg">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default Index;
