import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ContentAppPage from './pages/ContentPage';
import DashboardAppPage from './pages/DashboardAppPage';
import ActivityAppPage from './pages/ActivityPage';
import ChecklistPage from './pages/ChecklistPage';
import EbookPage from './pages/EbookPage';
import CaseStudiesPage from './pages/caseStudiesPage';
import InfoGraphicsPage from './pages/infoGraphicsPage';
import AddUser from './pages/AddUser';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'pages', element: <ContentAppPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'activity', element: <ActivityAppPage /> },
        { path: 'checklist', element: <ChecklistPage /> },
        { path: 'ebook', element: <EbookPage /> },
        { path: 'adduser', element: <AddUser /> },
        { path: 'casestudies', element: <CaseStudiesPage /> },
        { path: 'infographics', element: <InfoGraphicsPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
