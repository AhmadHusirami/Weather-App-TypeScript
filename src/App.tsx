import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./pages/HomePage";
import Footer from "./pages/Footer";
import "./App.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-wrapper">
        <main className="main-content">
          <HomePage />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
