import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'
import { BrowserRouter } from "react-router-dom";
import Navbar from './components/Navbar';
import AppRouter from './routes/AppRouter';
import { ToastProvider } from './lib/providers/ToastContext';
import Toast from './components/Toast';
import { SigninProvider } from './lib/providers/SigninContext';
import { PaginationProvider } from './lib/providers/PaginationContext';

function App() {


  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SigninProvider>
        <ToastProvider>
          <PaginationProvider>
            <BrowserRouter>
              <Navbar />
              <Toast />
              <AppRouter />
            </BrowserRouter>
          </PaginationProvider>
        </ToastProvider>
      </SigninProvider>
    </QueryClientProvider>
  )
}

export default App
