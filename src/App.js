/* eslint-disable */

// routes
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './redux/Actions/userAction';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import store from './redux/Store';
import { errorToast } from './utils/Toast';

// ----------------------------------------------------------------------

export default function App() {
  const { isAuthenticated, user, isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.pathname ? location.pathname.split('=')[1] : '/dashboard/app';
  React.useEffect(() => {
    if (error && error) {
      errorToast(error);
      return navigate('/login', { replace: true });
    }
    if (!isLoading) {
      store.dispatch(loadUser());
      navigate(redirect, { replace: true });
    }
  }, [error, redirect]);
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ThemeProvider>
  );
}
