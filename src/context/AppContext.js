import React, { createContext, useState } from "react";
import { ethers } from "ethers";
import { contractAddress, abi } from "../pages/constants";
import { toast } from "react-toastify";

export const AppContext = createContext();

function AppContextProvider({ children }) {
    
    const [loading, setLoading] = useState(false);
    const [isLogIn, setIsLogIn] = useState(false);
    const [atLogInPage, setAtLogInPage] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    const [provider,setProvider] = useState(null);
    const [account,setAccount] = useState(null);
    const [contractInstance, setContractInstance] = useState(null);
    const [isAdminLogIn, setIsAdminLogIn] = useState(false);

    async function connectToMetamask() {

        if (window.ethereum) {

            const provider =new ethers.BrowserProvider(window.ethereum); 
            setProvider(provider);
            await provider.send("eth_requestAccounts",[]);
            const signer =  await provider.getSigner();
            const contractInstance = new ethers.Contract(contractAddress, abi, signer);
            setContractInstance(contractInstance);

            const address = await signer.getAddress();
            setAccount(address);
            console.log("MetaMask Connected :", address);

            setIsConnected(true);

        }
        else {
            
            setIsConnected(false);
            toast.error("MetaMask is Not Installed");

        }

    }

    const value = {
        loading,setLoading,
        isLogIn, setIsLogIn,
        isConnected, setIsConnected,
        atLogInPage,setAtLogInPage,
        provider, setProvider,
        account, setAccount,
        contractInstance, setContractInstance,
        isAdminLogIn,setIsAdminLogIn,
        connectToMetamask
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>

}

export default AppContextProvider;