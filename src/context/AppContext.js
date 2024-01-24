import React, { createContext, useState } from "react";

export const AppContext = createContext();

function AppContextProvider({ children }) {
    
    const [loading, setLoading] = useState(false);
    const [isLogIn, setIsLogIn] = useState(false);
    const [atLogInPage, setAtLogInPage] = useState(true);
    const [isAdminLogIn, setIsAdminLogIn] = useState(false);

    const value = {
        loading,setLoading,
        isLogIn, setIsLogIn,
        atLogInPage,setAtLogInPage,
        isAdminLogIn,setIsAdminLogIn,
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>

}

export default AppContextProvider;