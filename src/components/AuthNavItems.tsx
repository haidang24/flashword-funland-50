
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Bookmark, PlusCircle, User } from "lucide-react";

export const AuthNavItems = () => {
  return (
    <div className="flex items-center gap-2">
      <SignedIn>
        <Link to="/manage">
          <Button variant="ghost" size="sm" className="gap-2">
            <PlusCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Manage Cards</span>
          </Button>
        </Link>
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <Bookmark className="h-4 w-4" />
            <span className="hidden sm:inline">Study</span>
          </Button>
        </Link>
        <UserButton 
          afterSignOutUrl="/"
          appearance={{
            elements: {
              userButtonBox: "h-9 w-9",
              userButtonTrigger: "h-9 w-9"
            }
          }}
        />
      </SignedIn>
      <SignedOut>
        <Link to="/sign-in">
          <Button variant="ghost" size="sm" className="gap-2">
            <User className="h-4 w-4" />
            <span>Sign In</span>
          </Button>
        </Link>
        <Link to="/sign-up">
          <Button size="sm">Sign Up</Button>
        </Link>
      </SignedOut>
    </div>
  );
};
