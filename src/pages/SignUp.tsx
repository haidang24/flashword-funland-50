
import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import { Navbar } from "@/components/Navbar";

const SignUp = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 container py-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-semibold mb-2">Sign Up</h1>
            <p className="text-muted-foreground">Create your WordFlow account</p>
          </div>
          <ClerkSignUp 
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "shadow-md rounded-lg bg-card border border-border",
                headerTitle: "text-xl font-serif font-semibold",
                headerSubtitle: "text-muted-foreground",
                formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
              }
            }}
          />
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

export default SignUp;
