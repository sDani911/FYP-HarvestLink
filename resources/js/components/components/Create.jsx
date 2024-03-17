import React, {useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "./Auth/AuthContext";

function Create() {

    const { Type } = useContext(AuthContext);
    const user = Type; //To be handled by backend developer; Tip fetch user type from backend

  const navigate = useNavigate();
  const userType = [
    { text: 'Farmer', to: '/FarmerCreate' },
    { text: 'Manufacture', to: '/ManufactureCreate' },
    { text: 'ShippingCompany', to: '/ShippingCompanyCreate' },
    { text: 'Admin', to: '/AdminCreate' },
    { text: '', to: '/' },
  ];

  useEffect(() => {
    for (let i = 0; i < userType.length; i++) {
      if (user === userType[i].text) {
        navigate(userType[i].to);
        return; // Exit the loop once a match is found
      }
    }

    // If no match is found, navigate to an error page or handle it as needed
    navigate('/error');
  }, [user, userType, navigate]);

  return null;
}

export default Create;
