
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { defaultTopics, getCategories, Topic } from "@/data/flashcards";
import { ArrowLeft, BookOpen, Plus } from "lucide-react";
import { SignedIn } from "@clerk/clerk-react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

const TopicsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const categories = getCategories();
  const topics = defaultTopics;

  const filteredTopics = topics.filter(topic => 
    topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : "";
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : "";
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/")}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-serif font-semibold">Learning Topics</h1>
          </div>
          <SignedIn>
            <Link to="/manage-topics">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Topic
              </Button>
            </Link>
          </SignedIn>
        </div>

        <div className="relative w-full max-w-sm mb-8 mx-auto">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search topics..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <TopicCard 
              key={topic.id}
              topic={topic}
              getCategoryName={getCategoryName}
              getCategoryColor={getCategoryColor}
              onSelect={() => navigate(`/learn/${topic.id}`)}
            />
          ))}

          {filteredTopics.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No topics found matching your search.</p>
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

interface TopicCardProps {
  topic: Topic;
  getCategoryName: (id: string) => string;
  getCategoryColor: (id: string) => string;
  onSelect: () => void;
}

const TopicCard = ({ topic, getCategoryName, getCategoryColor, onSelect }: TopicCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      {topic.image && (
        <div className="w-full h-40 overflow-hidden">
          <img 
            src={topic.image} 
            alt={topic.name} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{topic.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topic.description && (
          <p className="text-muted-foreground text-sm">{topic.description}</p>
        )}
        
        <div className="flex flex-wrap gap-2">
          {topic.categoryIds.map(categoryId => (
            <span 
              key={categoryId}
              className={`text-xs px-2 py-1 rounded-full text-white ${getCategoryColor(categoryId)}`}
            >
              {getCategoryName(categoryId)}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onSelect} 
          variant="secondary"
          className="w-full gap-2"
        >
          <BookOpen className="h-4 w-4" />
          Start Learning
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TopicsPage;
