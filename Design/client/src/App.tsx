import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import ProductsPage from "./pages/ProductsPage";
import CasesPage from "./pages/CasesPage";
import AdvantagesPage from "./pages/AdvantagesPage";
import ReviewsPage from "./pages/ReviewsPage";
import ContactPage from "./pages/ContactPage";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/products"} component={ProductsPage} />
      <Route path={"/products/:slug"} component={ProductPage} />
      <Route path={"/cases"} component={CasesPage} />
      <Route path={"/advantages"} component={AdvantagesPage} />
      <Route path={"/reviews"} component={ReviewsPage} />
      <Route path={"/contact"} component={ContactPage} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
