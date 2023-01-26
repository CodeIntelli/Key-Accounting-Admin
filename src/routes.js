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
import ProfilePage from './pages/ProfilePage';
import CreateBlog from './pages/AddBlog';
import CategoriesPage from './pages/CategoriesPage';
import SubCategoriesPage from './pages/SubCategoriesPage';
import CommentPage from './pages/CommentPage';
import HomePageContent from './pages/ContentPage/HomePageContent';
import NavbarContent from './pages/ContentPage/NavbarContent';
import FooterPageContent from './pages/ContentPage/FooterPageContent';
import ServicePageContent from './pages/ContentPage/ServicePageContent';
import ContactPageContent from './pages/ContentPage/ContactPageContent';
import IndustriesPageContent from './pages/ContentPage/IndustriesPageContent';
import CaseStudiesPageContent from './pages/ContentPage/CaseStudiesPageContent';
import InfoGraphicsPageContent from './pages/ContentPage/InfoGraphicsPageContent';
import ChecklistPageContent from './pages/ContentPage/ChecklistPageContent';
import FAQPageContent from './pages/ContentPage/FAQPageContent';
import BlogPageContent from './pages/ContentPage/BlogPageContent';
import PartnerPageContent from './pages/ContentPage/PartnerPageContent';
import CarrierApplyPageContent from './pages/ContentPage/CarrierApplyPageContent';
import CarrierPageContent from './pages/ContentPage/CarrierPageContent';
import OurStoryPageContent from './pages/ContentPage/OurStoryPageContent';
import EbookPageContent from './pages/ContentPage/EbookPageContent';
import ContactPage from './pages/ContactPage';

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
        { path: 'pages/navbar', element: <NavbarContent /> },
        { path: 'pages/footer', element: <FooterPageContent /> },
        { path: 'pages/home', element: <HomePageContent /> },
        { path: 'pages/service', element: <ServicePageContent /> },
        { path: 'pages/contact', element: <ContactPageContent /> },
        { path: 'pages/industries', element: <IndustriesPageContent /> },
        { path: 'pages/casestudy', element: <CaseStudiesPageContent /> },
        { path: 'pages/infographics', element: <InfoGraphicsPageContent /> },
        { path: 'pages/checklist', element: <ChecklistPageContent /> },
        { path: 'pages/faq', element: <FAQPageContent /> },
        { path: 'pages/blog', element: <BlogPageContent /> },
        { path: 'pages/partner', element: <PartnerPageContent /> },
        { path: 'pages/carrierapply', element: <CarrierApplyPageContent /> },
        { path: 'pages/carrier', element: <CarrierPageContent /> },
        { path: 'pages/ourstory', element: <OurStoryPageContent /> },
        { path: 'pages/ebook', element: <EbookPageContent /> },
        { path: 'pages', element: <ContentAppPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'activity', element: <ActivityAppPage /> },
        { path: 'checklist', element: <ChecklistPage /> },
        { path: 'ebook', element: <EbookPage /> },
        { path: 'adduser', element: <AddUser /> },
        { path: 'addblog', element: <CreateBlog /> },
        { path: 'casestudies', element: <CaseStudiesPage /> },
        { path: 'infographics', element: <InfoGraphicsPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'category', element: <CategoriesPage /> },
        { path: 'subcategory', element: <SubCategoriesPage /> },
        { path: 'edit/:id', element: <CreateBlog /> },
        { path: 'comments', element: <CommentPage /> },
        { path: 'feedback', element: <ContactPage /> },
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
