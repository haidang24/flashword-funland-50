
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Plus, Save, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { flashcardData } from "@/data/flashcards";
import { FlashcardData } from "@/components/Flashcard";

const ManageFlashcards = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<FlashcardData[]>(flashcardData);
  const [newCard, setNewCard] = useState<Partial<FlashcardData>>({
    word: "",
    pronunciation: "",
    definition: "",
    example: ""
  });
  const [editMode, setEditMode] = useState(false);

  const handleNewCardChange = (field: keyof FlashcardData, value: string) => {
    setNewCard({
      ...newCard,
      [field]: value
    });
  };

  const handleAddCard = () => {
    if (!newCard.word || !newCard.definition || !newCard.example) {
      toast.error("Please fill in all required fields");
      return;
    }

    const id = Math.max(0, ...cards.map(card => card.id)) + 1;
    const cardToAdd: FlashcardData = {
      id,
      word: newCard.word || "",
      pronunciation: newCard.pronunciation || "",
      definition: newCard.definition || "",
      example: newCard.example || ""
    };

    const updatedCards = [...cards, cardToAdd];
    setCards(updatedCards);
    updateFlashcardData(updatedCards);
    
    // Reset the form
    setNewCard({
      word: "",
      pronunciation: "",
      definition: "",
      example: ""
    });
    
    toast.success("Flashcard added successfully!");
  };

  const handleDeleteCard = (id: number) => {
    const updatedCards = cards.filter(card => card.id !== id);
    setCards(updatedCards);
    updateFlashcardData(updatedCards);
    toast.info("Flashcard deleted");
  };

  const handleUpdateCard = (id: number, field: keyof FlashcardData, value: string) => {
    const updatedCards = cards.map(card => 
      card.id === id ? { ...card, [field]: value } : card
    );
    setCards(updatedCards);
  };

  const handleSaveChanges = () => {
    updateFlashcardData(cards);
    toast.success("Changes saved successfully!");
  };

  // In a real application, this would send data to a backend
  // For now, we're just updating the local state
  const updateFlashcardData = (updatedCards: FlashcardData[]) => {
    // This is a placeholder for where you'd normally persist data
    // In a production app, you would use an API call to save to a database
    console.log("Flashcard data updated:", updatedCards);
    // Since we can't directly modify the imported data in this demo,
    // in a real app you would save this to localStorage or a database
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
            <h1 className="text-3xl font-serif font-semibold">Manage Flashcards</h1>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "View Mode" : "Edit Mode"}
            </Button>
            {editMode && (
              <Button onClick={handleSaveChanges}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            )}
          </div>
        </div>

        {/* Add new flashcard section */}
        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl">Add New Flashcard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label htmlFor="word" className="block text-sm font-medium mb-1">
                    Word <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="word"
                    value={newCard.word}
                    onChange={(e) => handleNewCardChange("word", e.target.value)}
                    placeholder="Enter a word"
                  />
                </div>
                <div>
                  <label htmlFor="pronunciation" className="block text-sm font-medium mb-1">
                    Pronunciation
                  </label>
                  <Input
                    id="pronunciation"
                    value={newCard.pronunciation}
                    onChange={(e) => handleNewCardChange("pronunciation", e.target.value)}
                    placeholder="e.g. /sɪmplɪsɪti/"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label htmlFor="definition" className="block text-sm font-medium mb-1">
                    Definition <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="definition"
                    value={newCard.definition}
                    onChange={(e) => handleNewCardChange("definition", e.target.value)}
                    placeholder="Enter the definition"
                    rows={2}
                  />
                </div>
                <div>
                  <label htmlFor="example" className="block text-sm font-medium mb-1">
                    Example <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="example"
                    value={newCard.example}
                    onChange={(e) => handleNewCardChange("example", e.target.value)}
                    placeholder="Enter an example sentence"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddCard} className="ml-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Flashcard
            </Button>
          </CardFooter>
        </Card>

        {/* List of existing flashcards */}
        <h2 className="text-xl font-medium mb-4">Your Flashcards ({cards.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Card key={card.id} className="border border-border/50 hover:border-primary/20 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-center">
                  {editMode ? (
                    <Input
                      value={card.word}
                      onChange={(e) => handleUpdateCard(card.id, "word", e.target.value)}
                      className="font-semibold"
                    />
                  ) : (
                    <span>{card.word}</span>
                  )}
                  {editMode && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCard(card.id)}
                      className="h-7 w-7 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
                {editMode ? (
                  <Input
                    value={card.pronunciation || ""}
                    onChange={(e) => handleUpdateCard(card.id, "pronunciation", e.target.value)}
                    className="text-sm text-muted-foreground"
                    placeholder="Pronunciation"
                  />
                ) : (
                  card.pronunciation && <p className="text-sm text-muted-foreground">{card.pronunciation}</p>
                )}
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Definition:</p>
                  {editMode ? (
                    <Textarea
                      value={card.definition}
                      onChange={(e) => handleUpdateCard(card.id, "definition", e.target.value)}
                      rows={2}
                    />
                  ) : (
                    <p className="text-sm">{card.definition}</p>
                  )}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Example:</p>
                  {editMode ? (
                    <Textarea
                      value={card.example}
                      onChange={(e) => handleUpdateCard(card.id, "example", e.target.value)}
                      rows={2}
                    />
                  ) : (
                    <p className="text-sm italic">{card.example}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
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

export default ManageFlashcards;
