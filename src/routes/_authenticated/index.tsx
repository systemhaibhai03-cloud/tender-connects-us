import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/vishal-technopower-logo.webp";

export const Route = createFileRoute("/_authenticated/")({
  component: Home,
});

function Home() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <img src={logo} alt="Vishal Technopower" className="h-10 object-contain" />
          <button
            onClick={signOut}
            className="text-sm font-medium px-3 py-1.5 rounded-md border border-input hover:bg-accent transition"
          >
            Sign out
          </button>
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">Signed in as {user.email}</p>
      </main>
    </div>
  );
}