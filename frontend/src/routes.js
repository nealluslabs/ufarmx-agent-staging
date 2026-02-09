import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

//SUPERADMIN PAGES
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import HomePage from './pages/HomePage';

import RegisterPage from './pages/RegisterPage';



import PitchesPage from './pages/FarmersPage';

import ProfilePage from './pages/ProfilePage';


import LogoutPage from './pages/LogoutPage';

import CropProfilePage from './pages/CropProfilePage';
import FarmerProfilePage from './pages/FarmerProfilePage';


import AddDepositPage from './pages/AddDepositPage';
//import ResponsesPage from './pages/ResponsesPage';
import ViewResponsePage from './pages/ViewResponsesPage';
import AddFarmerPage from './pages/AddFarmerPage';



//AGENT PAGES
import HomePageAgent from './pages/HomePageAgent';
import LoginPageAgent from './pages/LoginPageAgent';
import AllFarmersOneAgentPage from './pages/AllFarmersOneAgentPage';
import AllRetailersOneAgentPage from './pages/AllRetailersOneAgentPage';
import LoginPageFarmer from './pages/LoginPageFarmer';
import HomePageFarmer from './pages/HomePageFarmer';
import FarmerProductsPage from './pages/FarmerProductsPage';
import DepositsPage from './pages/DepositsFarmerPage';
import SettingsPage from './pages/SettingsPage';
import ViewFormsPage from './pages/ViewFormsPage';
import FormsPage from './pages/FormsPage';


import FillFormsPage from './pages/FillFormsPage';
import FarmerIntakeFillFormsPage from './pages/FarmerIntakeFillFormsPage';
import AdminsPage from './pages/AdminsPage';
import ProductsPage from './pages/ProductsPage';
import FarmersProductsPage from './pages/FarmersProductsPage';


import FarmerFollowUpFillFormsPage from './pages/FarmerFollowUpFillFormsPage';
import FarmerInputFillFormsPage from './pages/FarmerInputFillFormsPage';
import FarmerProduceFillFormsPage from './pages/FarmerProduceFillFormsPage';
import FarmerInputUpdatePage from './pages/FarmerInputUpdatePage';
import FarmerCreditAnalysisFormsPage from './pages/FarmeCreditAnalysisFormsPage';
import AddNewProductPage from './pages/AddNewProductPage';
import EditProductPage from './pages/EditProductPage';
import FarmerHarvestCycleFormsPage from './pages/FarmerHarvestCycleFormsPage';
import MarketInsightsPage from './pages/MarketInsightsPage';
import FarmerCreditAnalysisFormsTwoPage from './pages/FarmeCreditAnalysisFormsTwoPage';
import CreditScorePage from './pages/CreditScorePage';
import FarmProductsPage from './pages/FarmProductsPage';
import AddProductsPage from './pages/AddProductsPage';

import RequestsPage from './pages/RequestsPage';
import InvoicesPage from './pages/InvoicesPage';
import CreateAccountPage from './pages/CreateAccountPage';
import CompleteProfilePage from './pages/CompleteProfilePage';
import RegisteredBusinessSuccessForm from './components/registeredBusiness/RegisteredBusinessSuccessForm';
import ApplicationSuccessPage from './components/success/ApplicationSuccessPage';
import FarmerRequestPage from './pages/FarmerRequestPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

import RequestProductsPage from './pages/RequestsProductsPage';
import DepositsFarmerPage from './pages/DepositsFarmerPage';
import AddRequestsPage from './pages/AddRequestPage';



export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/" />, index: true },
        { path: 'home', element: <HomePage /> },
        
        { path: 'home-agent', element: <HomePageAgent /> },
        { path: 'home-farmer', element: <HomePageFarmer /> },
        { path: 'farm-products',element: <RequestProductsPage /> },
        { path: 'credit-score', element: <CreditScorePage /> },
        { path: 'deposits', element: <DepositsPage /> },
        
        { path: 'deposits-farmer', element: <DepositsFarmerPage /> },
        { path: 'add-deposit', element: <AddDepositPage /> },
        { path: 'add-farmer', element:  <FarmerIntakeFillFormsPage /> },
        { path: 'add-product', element:  <AddNewProductPage /> },
        { path: 'edit-product', element:  <EditProductPage /> },
        
        
        { path: 'crop-profile', element: <CropProfilePage /> },
        { path: 'farmer-profile', element: <FarmerProfilePage /> },
        { path: 'farmer-request', element: <FarmerRequestPage /> },
        { path: 'farmer-products', element: <FarmersProductsPage /> },
        {/* path: 'agent-profile', element: <AgentProfilePage /> */},

      /*  { path: 'agent-profile',element: <AgentProfilePage /> ,


        children: [
          {path: ':page',  element: <AgentProfilePage /> }
        ]
  },*/

  /*{ path: 'farmer-settings', element: <SettingsPageOld /> },*/
  { path: 'settings', element: <SettingsPage /> },
  { path: 'farmers-products', element: <FarmersProductsPage /> },

        { path: 'profile', element: <ProfilePage /> },

       
        
       /* { path: 'containers', element: <ContainersPage /> },
        

        { path: 'container-profile', element: <ContainerProfilePage /> },*/

        { path: 'admins',element: <AdminsPage /> },

        { path: 'products',element: <ProductsPage />} ,


        { path: 'farmers',element: <PitchesPage /> ,

        


            children: [
              {path: ':page',  element: <PitchesPage /> }
            ]
      },

     



      { path: 'all-retailers-one-agent',element: <AllRetailersOneAgentPage />} ,

      { path: 'all-farmers-one-agent',element: <AllFarmersOneAgentPage /> ,

      


      children: [
        {path: ':page',  element: <AllFarmersOneAgentPage /> }
      ]
},
     { path: 'forms',element: <FormsPage /> },
     { path: 'requests',element: <RequestsPage /> },
     { path: 'invoices',element: <InvoicesPage /> },

    


      /*{ path: 'responses',element: <ResponsesPage /> ,


      children: [
        {path: ':page',  element: <ResponsesPage /> }
      ]
   },*/
 
   { path: 'view-response', element: <ViewResponsePage /> },
   { path: 'view-form', element: <ViewFormsPage /> },
   { path: 'fill-form', element: <FillFormsPage /> },
   { path: 'farmer-follow-up-fill-form', element: <FarmerFollowUpFillFormsPage /> },
   { path: 'farmer-input-fill-form', element: <FarmerInputFillFormsPage /> },
   { path: 'farmer-harvest-cycle-form', element: <FarmerHarvestCycleFormsPage /> },
   { path: 'farmer-credit-analysis-form', element: <FarmerCreditAnalysisFormsPage /> },
   { path: 'farmer-credit-analysis-form-2', element: <FarmerCreditAnalysisFormsTwoPage /> },
   { path: 'farmer-produce-fill-form', element: <FarmerProduceFillFormsPage /> },
   { path: 'farmer-input-update', element: <FarmerInputUpdatePage /> },
   { path: 'farmers-intake-fill-form', element: <FarmerIntakeFillFormsPage /> },

   { path: 'add-request', element: <AddRequestsPage /> },
   

   { path: 'add-new-product', element: <AddNewProductPage /> },

      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'login-agent',
      element: <LoginPageAgent />,
    },
    {
      path: 'login-farmer',
      element: <LoginPageFarmer />,
    },
    {
      path: 'logout',
      element: <LogoutPage />,
    },
  
    {
      path: 'register',
      element: <RegisterPage />,
    },


    {
      path: 'forgot-password',
      element: <ForgotPasswordPage />,
    },
    {
      path: 'create-account',
      element: <CreateAccountPage />,
    },

    {
      path: 'complete-profile',
      element: <CompleteProfilePage />,
    },

    {
      path: 'application-success',
      element: <ApplicationSuccessPage />,
    },

    {
      path: 'registered-business-success',
      element: <RegisteredBusinessSuccessForm />,
    },
    {/*
      path: '/',
      index: true, 
      element: <WelcomePage />,
  */},
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { element: <Navigate to="/dashboard/home" />, index: true },
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
