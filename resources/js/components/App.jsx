import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './components/Auth/AuthContext.jsx';
import { AuthContext } from './components/Auth/AuthContext.jsx';
import Footer from './components/Guide/Footer';
import LandingPage from './components/LandingPage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Farmer_Landing from './components/Farmer/FarmerLanding';
import Homepage from './components/homepage';
import Nav_Bar from './components/Guide/Navbar';
import Create from './components/Create';
import Trade from './components/Trade';
import FarmerCreate from './components/Farmer/FarmerCreate';
import ManufactureCreate from './components/Manufacture/ManufactureCreate';
import ShippingCompanyCreate from './components/ShippingCompany/ShippingCompanyCreate';
import DriverCreate from './components/Driver/DriverCreate';
import DriverViewRoute from './components/Driver/DriverViewRoute';
import AdminCreate from './components/Admin/AdminCreate';
import Invoice from './components/Invoice/Invoice';
import InvoiceNew from './components/Invoice/InvoiceNew';
import InvoiceView from './components/Invoice/InvoiceView';
import InspectionLanding from './components/Inspection/InspectionLanding';
import InspectionRequest from './components/Inspection/InspectionRequest';
import DriverLanding from './components/Driver/DriverLanding';
import DriverView from './components/Driver/DriverView';
import RouteLanding from './components/Route/RouteLanding';
import CreateDriver from './components/Driver/DriverCreate';
import RouteView from './components/Route/RouteView';
import Manufacture_Landing from './components/Manufacture/ManufactureLanding';
import ShippingCompany_Landing from './components/ShippingCompany/ShippingCompanyLanding';
import CertificateLanding from './components/Certification/CertificationLanding';
import CertificateDetail from './components/Certification/CertificateDetail';
import AdminLanding from './components/Admin/AdminLanding';
import EditUser from './components/Admin/EditUser';
import ViewUser from './components/Admin/ViewUser';
// import DeleteRole from './components/Admin/DeleteRole';
import AddRole from './components/Admin/AddRole';
// import AddFormComponent from './components/Admin/AddRole';
import AddCropToMarketPlace from './components/Farmer/AddCropToMarketPlace';
import UpdateDriver from './components/ShippingCompany/UpdateDriver';
import MarketPlace from './components/MarketPlace/MarketPlace';
import ProductPage from './components/MarketPlace/ProductPage';
import OrderPage from './components/MarketPlace/OrderPage';
import Tax from './components/Taxes/Tax';
import Stats from './components/Statistics/Statistics';
import UserBlockChain from './components/BlockChain/BlockChain';
import Appointment from './components/Admin/Appointements';
import './assets/styles/index.css'
import { ToastContainer } from "react-toastify";
import NotFound from './Error.jsx';

function MyApp() {
    const { userLogin } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <div className='app-body'>
                <header>
                    <Nav_Bar />
                </header>
                <Routes>
                    {/* <Route path="*" element={<NotFound />} /> */}

                    {!userLogin ? (
                        <>
                            <Route exact path="/" element={<LandingPage />} />
                            <Route path="/HarvestLink" element={<LandingPage />} />
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<Homepage />} />
                            <Route path="/HarvestLink" element={<Homepage />} />
                        </>
                    )}
                    <Route exact path="/Login" element={<Login />} />
                    <Route exact path="/Signup" element={<Signup />} />
                    <Route exact path="/About" element={<></>} />
                    <Route exact path="/Contact" element={<></>} />
                    <Route exact path="/FarmerLanding" element={<Farmer_Landing />} />
                    <Route exact path="/Create" element={<Create />} />
                    <Route exact path="/FarmerCreate" element={<FarmerCreate />} />
                    <Route exact path="/ManufactureCreate" element={<ManufactureCreate />} />
                    <Route exact path="/ShippingCompanyCreate" element={<ShippingCompanyCreate />} />
                    <Route exact path="/DriverCreate" element={<DriverCreate />} />
                    <Route exact path="/AdminCreate" element={<AdminCreate />} />
                    <Route exact path="/Trade" element={<Trade />} />
                    <Route exact path="/Invoice" element={<Invoice />} />
                    <Route exact path="/InvoiceNew" element={<InvoiceNew />} />
                    <Route exact path="/InvoiceView" element={<InvoiceView />} />
                    <Route exact path="/InspectionLanding" element={<InspectionLanding />} />
                    <Route exact path="/InspectionRequest" element={<InspectionRequest />} />
                    <Route exact path="/DriverLanding" element={<DriverLanding />} />
                    <Route exact path="/DriverView" element={<DriverView />} />
                    <Route exact path="/DriverViewRoute/:id" element={<DriverViewRoute />} />
                    <Route exact path="/RouteLanding" element={<RouteLanding />} />
                    <Route exact path="/RouteView/:id" element={<RouteView />} />
                    <Route exact path="/CreateDriver" element={<CreateDriver />} />
                    <Route exact path="/ManufactureLanding" element={<Manufacture_Landing />} />
                    <Route exact path="/ShippingCompanyLanding" element={<ShippingCompany_Landing />} />
                    <Route exact path="/CertificateLanding" element={<CertificateLanding />} />
                    <Route exact path="/CertificateDetail" element={<CertificateDetail />} />
                    <Route exact path="/AdminLanding" element={<AdminLanding />} />
                    <Route exact path="/EditUser" element={<EditUser />} />
                    <Route exact path="/ViewUser" element={<ViewUser />} />
                    <Route exact path="/AddRole" element={<AddRole />} />
                    <Route exact path="/Appointment" element={<Appointment />} />
                    <Route exact path="/AddCropToMarketPlace/:id" element={<AddCropToMarketPlace />} />
                    <Route exact path="/UpdateDriver/:id" element={<UpdateDriver />} />
                    <Route exact path="/MarketPlace" element={<MarketPlace />} />
                    <Route exact path="/ProductPage" element={<ProductPage />} />
                    <Route exact path="/OrderPage" element={<OrderPage />} />
                    <Route exact path="/Tax" element={<Tax />} />
                    <Route exact path="/Statistics" element={<Stats />} />
                    <Route exact path="/BlockChain" element={<UserBlockChain />} />
                    <Route path="*" element={<NotFound />} />

                </Routes>
                <footer>
                    <Footer />
                </footer>
            </div>
        </BrowserRouter>
    );
}
ReactDOM.createRoot(document.getElementById('app')).render(
    <AuthProvider>
        <ToastContainer />
        <MyApp />
    </AuthProvider>
);
