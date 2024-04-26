import React, {useContext} from "react";
import { Link } from 'react-router-dom';

import adminIcon from '../assets/icons/admin.png';
import barChartIcon from '../assets/icons/bar-chart.png';
import blockchainIcon from '../assets/icons/blockchain.png';
import certificateIcon from '../assets/icons/certificate.png';
import driverIcon from '../assets/icons/chauffeur.png';
import farmerIcon from '../assets/icons/farmer.png';
import inspectorIcon from '../assets/icons/inspection.png';
import invoiceIcon from '../assets/icons/invoice.png';
import manufacturingIcon from '../assets/icons/manufacturing.png';
import marketplaceIcon from '../assets/icons/marketplace.png';
import routeIcon from '../assets/icons/route.png';
import taxIcon from '../assets/icons/tax.png';
import {AuthContext} from "./Auth/AuthContext";

function Homepage() {

    const { Type } = useContext(AuthContext);
    const user = Type; //To be handled by backend developer; Tip fetch user type from backend
    const homepageItems = [
        { text: 'Administeration', link: '/AdminLanding', icon: adminIcon, access: ['Admin',] },
        { text: 'Driver', link: '/DriverLanding', icon: driverIcon, access: ['Driver', 'Admin',] },
        { text: 'Farmer', link: '/FarmerLanding', icon: farmerIcon, access: ['Farmer', 'Admin',] },
        { text: 'Manufacture', link: '/ManufactureLanding', icon: manufacturingIcon, access: ['Manufacture', 'Admin',] },
        { text: 'ShippingCompany', link: '/ShippingCompanyLanding', icon: manufacturingIcon, access: ['ShippingCompany', 'Admin',] },
        { text: 'Inspection', link: '/InspectionLanding', icon: inspectorIcon, access: ['Farmer', 'Manufacture', 'Driver', 'Admin'] },
        { text: 'Routes', link: '/RouteLanding', icon: routeIcon, access: [ 'Admin','ShippingCompany'] },
        { text: 'Marketplace', link: '/MarketPlace', icon: marketplaceIcon, access: ['Farmer', 'Manufacture', 'Admin','ShippingCompany'] },
        { text: 'Invoice', link: '/Invoice', icon: invoiceIcon, access: ['Farmer', 'Manufacture', 'Driver', 'Admin','ShippingCompany'] },
        { text: 'Blockchain Records', link: '/Blockchain', icon: blockchainIcon, access: ['Farmer', 'Manufacture', 'Driver', 'Admin','ShippingCompany'] },
        { text: 'Certificate', link: '/CertificateLanding', icon: certificateIcon, access: ['Farmer', 'Manufacture', 'Driver', 'Admin','ShippingCompany'] },
        { text: 'Tax / Regulation', link: '/Tax', icon: taxIcon, access: ['Farmer', 'Manufacture', 'Driver', 'Admin','ShippingCompany'] },
        { text: 'Statistics', link: '/Statistics', icon: barChartIcon, access: ['Farmer', 'Manufacture', 'Driver', 'Admin','ShippingCompany'] },
        // Add more items as needed
    ];

    const filteredItems = homepageItems.filter(item => item.access.includes(user));

    return (
        <div className="text-white grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-screen p-10 ml-6">
            {filteredItems.map((item, index) => (
                <div key={index} className="flex text-center flex-col justify-center border border-red-100 aspect-w-4 aspect-h-5 bg-blue-500 floating-box">
                    <Link to={item.link}>
                        <div className="h-[200] flex flex-col items-center just">
                            <img src={item.icon} alt={item.text} className="w-6 h-6 inline-block mr-2" />
                            <br />
                            {item.text}
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );

}

export default Homepage;
