import React, { createContext, useState } from "react";

export const AppContext = createContext();

function AppContextProvider({ children }) {
    
    const [loading, setLoading] = useState(false);
    const [isLogIn, setIsLogIn] = useState(false);
    const [isRegister,setIsRegister] = useState(false);
    const [atLogInPage, setAtLogInPage] = useState(true);
    const [isAdminLogIn, setIsAdminLogIn] = useState(false);
    const [isVotingStart, setIsVotingStart] = useState(false);
    const [candidate, setCandidate] = useState([]);
    const [allSignUp, setAllSignUp] = useState([]);
    const [voters, setVoters] = useState([]);
    const [remainingTime, setRemainingTime] = useState("12:00:00");
    const [searchInput, setSearchInput] = useState("");
    const [trackStudent, setTrackStudent] = useState({
        enrollmentNumber: ""
    });
    const [successRegistration, setSuccessRegistration] = useState(false);
    
    const value = {
        loading,setLoading,
        isLogIn, setIsLogIn,
        isRegister,setIsRegister,
        atLogInPage,setAtLogInPage,
        isAdminLogIn, setIsAdminLogIn,
        isVotingStart, setIsVotingStart,
        candidate, setCandidate,
        remainingTime, setRemainingTime,
        allSignUp, setAllSignUp,
        voters, setVoters,
        successRegistration, setSuccessRegistration,
        trackStudent, setTrackStudent,
        searchInput, setSearchInput,
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>

}

export default AppContextProvider;