// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import './index.css';
import { ToastContainer } from 'react-toastify';
import OfflineStatusBanner from './components/offline/OfflineStatusBanner';
// import InstallAppPrompt from './components/offline/InstallAppPrompt';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
       <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
      <ScrollToTop />
      <OfflineStatusBanner />
      {/* <InstallAppPrompt /> */}
      <StyledChart />
      <Router />
    </ThemeProvider>
  );
}
