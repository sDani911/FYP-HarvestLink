import React, {useContext, useState} from "react";
import { Link } from 'react-router-dom';
import logo from '../../assets/images/HarvestLink_Logo.png';
import user from '../../assets/icons/user.png';
import more from '../../assets/icons/more.png'
import adminIcon from '../../assets/icons/admin.png';
import barChartIcon from '../../assets/icons/bar-chart.png';
import blockchainIcon from '../../assets/icons/blockchain.png';
import certificateIcon from '../../assets/icons/certificate.png';
import driverIcon from '../../assets/icons/chauffeur.png';
import farmerIcon from '../../assets/icons/farmer.png';
import inspectorIcon from '../../assets/icons/inspection.png';
import invoiceIcon from '../../assets/icons/invoice.png';
import manufacturingIcon from '../../assets/icons/manufacturing.png';
import marketplaceIcon from '../../assets/icons/marketplace.png';
import routeIcon from '../../assets/icons/route.png';
import taxIcon from '../../assets/icons/tax.png';
import settingIcon from '../../assets/icons/setting.png';
import logoutIcon from '../../assets/icons/logout.png';
import profile from '../../assets/icons/profile.png';
import {AuthContext} from "../Auth/AuthContext";
import {useNavigate} from "react-router";

function Nav_Bar() {

  //////////////////////////////BACKENDONLY////////////////////////////////
    const { userLogin } = useContext(AuthContext);
    const { Type } = useContext(AuthContext);
    const { toggleUserLogin } = useContext(AuthContext);
    const role = Type;



  //handle signout for the user
    const navigate = useNavigate();

    const handleSignOut = () => {
        setUserbarOpen(false);
        toggleUserLogin()
      navigate('/')
    // Implement your sign-out logic here
  };


  //////////////////////////////FRONTEND ONLY//////////////////////////////

  //Defines Options and access to that specific options
  const sideBarItems = [
    { text: 'Inspection', link: '/Inspection', icon: inspectorIcon, access: ['Farmer', 'Manufacture', 'Driver', 'Admin','ShippingCompany'] },
    { text: 'Invoice', link: '/Invoice', icon: invoiceIcon, access: ['Farmer', 'Manufacture', 'Driver', 'Admin','ShippingCompany'] },
    { text: 'Driver', link: '/Driver', icon: driverIcon, access: ['Driver', 'Admin',] },
    { text: 'Routes', link: '/Routes', icon: routeIcon, access: ['Farmer', 'Manufacture', 'Driver', 'Admin','ShippingCompany'] },
    { text: 'Farmer', link: '/FarmerLanding', icon: farmerIcon, access: ['Farmer', 'Admin',] },
    { text: 'Marketplace', link: '/Marketplace', icon: marketplaceIcon, access: ['Farmer', 'Manufacture', 'Admin','ShippingCompany'] },
    { text: 'Certificate', link: '/Certificate', icon: certificateIcon, access: ['Farmer', 'Manufacture', 'Driver', 'Admin','ShippingCompany'] },
    { text: 'Tax / Regulation', link: '/Tax', icon: taxIcon, access: ['Farmer', 'Manufacture', 'Driver', 'Admin','ShippingCompany'] },
    { text: 'Administeration', link: '/Administeration', icon: adminIcon, access: ['Admin',] },
    { text: 'Blockchain Records', link: '/Blockchain', icon: blockchainIcon, access: ['Farmer', 'Manufacture', 'Driver', 'Admin','ShippingCompany'] },
      { text: 'ShippingCompany', link: '/ShippingCompanyLanding', icon: manufacturingIcon, access: ['ShippingCompany', 'Admin',] },
      { text: 'Manufacturer', link: '/Manufacturer', icon: manufacturingIcon, access: ['Manufacture', 'Admin',] },
    { text: 'Statistics', link: '/Statistics', icon: barChartIcon, access: ['Farmer', 'Manufacture', 'Driver', 'Admin','ShippingCompany'] },
    // Add more items as needed
  ];

  //Navigation to be shown if user not logged in
  const landingNav = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" }
  ];

  //Navigation to show it user is logged in
  const userNav = [
    { label: "Home", path: "/" },
    { label: "Create", path: "/Create" },
    { label: "Trade", path: "/Trade" },
  ];

  const [isSidebarOpen, setSidebarOpen] = useState(false); //check if sidebar is open
  const [isUserbarOpen, setUserbarOpen] = useState(false); //check if userbar is open

  //handles sidebar/userbar if open/close
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const toggleUserbar = () => {
    setUserbarOpen(!isUserbarOpen);
  };



  return (
    <nav className="flex items-center justify-between p-2 border-2 shadow-lg ">

      {/* ////////////////////////////// LEFT SIDEBAR ////////////////////////////// */}
      <ul className="flex items-center space-x-4">
      {userLogin ? (
      <li className="relative w-10 h-10 m-1 object-contain">
          {/* More button */}
          <button className="" onClick={toggleSidebar}>
            <img src={more} alt="Menu" />
          </button>
          {/* Full side bar when menu is clicked */}
          {isSidebarOpen ? (
            <aside className={`bg-gray-800 text-white w-72 absolute top-[52px] left-[-30px] h-screen px-4 border-2`}>
              <ul className="space-y-4 mt-6">
                {/* side bar filters by access and maps options accordingly */}
                {sideBarItems
                  .filter(item => item.access.includes(role))
                  .map((item, index) => (
                    <li key={index}>
                      <Link to={item.link} className="block py-2 px-2 hover:bg-gray-700">
                        <img src={item.icon} alt={item.text} className="w-6 h-6 inline-block mr-8 bg-slate-300 hover:placeholder:" />
                        {item.text}
                      </Link>
                    </li>
                  ))}
              </ul>
            </aside>
          ) : (
            <aside className={`bg-gray-800 text-white w-16 absolute top-[52px] left-[-30px] h-[100.28vh]  border-2 pl-4`} >
              <ul className="space-y-4 mt-6">
                {/* Partial side bar when menu button is not clicked */}
                {sideBarItems
                  .filter(item => item.access.includes(role))
                  .map((item, index) => (
                    <li key={index} className="pl-2 py-2">
                      <Link to={item.link} className="block hover:bg-gray-700">
                        <img src={item.icon} alt={item.text} className="w-6 h-6 inline-block bg-slate-300" />
                      </Link>
                    </li>
                  ))}
              </ul>
            </aside>
          )}
        </li>):(
          <>
          <img src={logo} alt="Harvest Link Logo" className="w-10 h-10" />
          </>
        )}
      </ul>

      {/* ////////////////////////////// USER/NON-USER NAV ////////////////////////////// */}
      <ul className='flex items-center justify-between px-4 sm:px-8 lg:px-16'>
        {/* Show nav according to user login status */}
        {(userLogin ? userNav : landingNav).map((item, index) => (
          <li key={index} className="text-lg">
            <Link to={item.path} className="link px-2 sm:px-4 lg:px-6 py-2">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* ////////////////////////////// RIGHT SIDEBAR ////////////////////////////// */}
      {/* // if user logged in then show left sidebar else show login or appointment button */}
      {userLogin ? (
        // sidebar section
        <ul className='flex items-center justify-between '>
          <li>
            <button className="btn-ca w-8 h-8 object-contain mr-2 " onClick={toggleUserbar}>
              <img src={user} alt="User Icon" />
            </button>
            {isUserbarOpen && (
              <aside className={`bg-gray-800 text-white w-72 absolute h-screen  px-10 border-2 top-[66px] right-[-2px] userBar_open`}>
                <ul className="space-y-4 mt-6">
                  <li>
                    <Link to='/profile' className="flex items-center py-2 px-4 hover:bg-gray-700">
                      <span><img src={profile} alt="profile" className="w-6 h-6 bg-slate-300 rounded-full" /></span>
                      <span className="ml-6">Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link to='/setting' className="flex items-center py-2 px-4 hover:bg-gray-700">
                      <span><img src={settingIcon} alt="settings" className="w-6 h-6 bg-slate-300 rounded-full" /></span>
                      <span className="ml-6">Setting</span>
                    </Link>
                  </li>
                  <li>
                    <p onClick={handleSignOut} className="flex items-center py-2 px-4 hover:bg-gray-700 hover:cursor-pointer">
                      <span className="mr-6"><img src={logoutIcon} alt="Logout" className="w-6 h-6 bg-slate-300 p-[1px]" /></span>
                      Logout
                    </p>
                  </li>
                </ul>
              </aside>

            )}
          </li>
        </ul>
      ) : (
        // login and book appointment button
        <ul className="flex items-center lg:justify-between">
          <li className='pr-3 pl-2'>
            <button className="bg-[#C1FF72] hover:bg-green-600 text-white py-2 px-4 rounded-xl w-20 hover:opacity-90 hover:text-white text-black"><Link to="/login">Login</Link></button>
          </li>
          <li className="pr-3">
            <button className="bg-[#C1FF72] hover:bg-green-600 text-white py-2 px-4 rounded-xl w-50 hover:opacity-90 hover:text-white text-black"><Link to="/signup">Book An Appointment</Link></button>
          </li>
        </ul>
      )}



    </nav>
  );
}

export default Nav_Bar;
