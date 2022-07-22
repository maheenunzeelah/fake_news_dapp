import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";
import { ToastContainer,toast} from 'react-toastify';

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const listenToTheShareEvent=(contract)=>{
    contract?.events?.NewsShared().on("data",async(evt)=>{
      if(evt.returnValues){
        
            return toast.success("News Shared");
        
      //  alert(evt)
       
      }
      
    })
  }
  const init = useCallback(
    async artifact => {
      if (artifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const { abi } = artifact;
        let address, contract;
        try {
          address = artifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract }
        });
        listenToTheShareEvent(contract)
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/News.json");
        init(artifact);
        // window.location.reload();

      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      <ToastContainer style={{ fontSize:"1.4rem" }} />

      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
