import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { BrowserRouter } from "react-router-dom";
import Navbar from './components/Navbar';
import AppRouter from './routes/AppRouter';
import { AuthProvider } from './lib/providers/AuthCOntext';

function App() {


  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <AppRouter />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
