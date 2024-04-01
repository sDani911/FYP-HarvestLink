import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userLogin, setUserLogin] = useState(() => {
        // Check if user is logged in from cookies on initial load
        const token = Cookies.get('harvestLink-token');
        if (token){
            return  true;
        }else {
            return  false;
        }
    });
    const [Token, setToken] = useState(() => {
        // Check if user is logged in from cookies on initial load
        return  Cookies.get('harvestLink-token');
    });
    const [Type, setType] = useState(() => {
        // Check if user is logged in from cookies on initial load
        return  Cookies.get('harvestLink-userType') ;
    });
    const [Name, setName] = useState(() => {
        // Check if user is logged in from cookies on initial load
        // return  JSON.parse(Cookies.get('harvestLink-userData')) ;
        return  false ;
    });

    const toggleUserLogin = (data,token,type) => {
        const updatedLogin = !userLogin;
        setUserLogin(updatedLogin);

        // Store login state in a cookie
        if (updatedLogin){
            Cookies.set('harvestLink-userType', type, { expires: 7 }); // Expires in 7 days (adjust as needed)
            Cookies.set('harvestLink-userData', JSON.stringify(data));
            Cookies.set('harvestLink-token', token);
            setType(type)
            setName(data)
            setToken(token)
        }else{

            Cookies.remove('harvestLink-userType'); // Expires in 7 days (adjust as needed)
            Cookies.remove('harvestLink-userData');
            Cookies.remove('harvestLink-token');
            setType(null)
            setName(null)
            setToken(null)

        }
        };

    return (
        <AuthContext.Provider value={{ userLogin,Token, Type, Name, toggleUserLogin }}>
            {children}
        </AuthContext.Provider>
    );
};
