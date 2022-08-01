import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Notifier from './components/notifier/Notifier';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Dashboard from './pages/Dashboard/Dashboard';
import DiscordCallback from './pages/DiscordCallback/DiscordCallback';
import { Connection, PublicKey, clusterApiUrl, Keypair } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
// import { selectors } from '../../modules/_common/auth/discord';
import { useSelector } from 'react-redux';
import { selectors as authSel } from './modules/_common/auth/discord';
// const express = require("express");


const App = () => {
  // const express = require("express");

  const { publicKey, signMessage } = useWallet();
  const [data, setData] = React.useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [signInfo, setsignInfo] = useState(null);
  const auth_Discord = useSelector(authSel.authenticated);
  const route = localStorage.getItem('route');
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()

          );
   
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );
  const SignButton = () => (
    <div>
            <button
              className="cta-button sign-button"
              onClick={signingMessage}
            >
           Sign the Message
          </button>
   </div>
  );
  function buf2hex(buffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}

  const signingMessage = async () => {
    try{
      
      if (!signMessage) throw new Error('Wallet does not support message signing!');
      if (!walletAddress) throw new Error('Wallet not connected!');
      let message = `Sign this message to prove ownership of this wallet`;
      let encodedMessage = new TextEncoder().encode(message);
      let signedMessage = await window.solana.signMessage(encodedMessage, "utf-8")
      let signed_data = signedMessage.signature
      let dataToSend = JSON.stringify({
          "pubKey": signedMessage.publicKey,
          "signature": buf2hex(signed_data)
      
       });
      setsignInfo(dataToSend);
      console.log(dataToSend);
    }catch(e){
    console.log(e);
    }
  };
  


  useEffect(() => {
    const onLoad = async () => {
      
      await checkIfWalletIsConnected();
      
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);
  const renderConnectedContainer = () => {
  

   
    if (signInfo === null && window.location.pathname != "/api/discordCallback" && window.location.pathname != "/login") {
      return (
      <div className = "wrap-image-thumbnail-blog">
      <div>
      <h1 className="h1-gradient font-size-3em">  Sign to prove ownership</h1>
        {SignButton()}
        <img src="https://assets.website-files.com/611580035ad59b20437eb024/61f9dd0e9bcfb573c8ff9c6e_image-blog-2.jpg" loading="lazy" alt="" class="image-thumbnail-blog">
      </img>
      </div>
      {/* <img src ="https://assets.website-files.com/611580035ad59b20437eb024/6170e6b7587b587e289e9d75_line%20svg%20(1).png" loading="lazy" sizes="100vw" alt="" class="star">
      </img> */}

      </div>
      );
      
    }

    return (
      <Router>
        <Notifier />
   
   
          <Navbar auth={auth_Discord} />
          <Switch>
            <Route path='/api/discordCallback' component={DiscordCallback} />
  
            <PrivateRoute
              exact
              path='/dashboard'
              component={Dashboard}
              auth={auth_Discord}
              
            />
  
            <PrivateRoute
              exact
              path='/private'
              component={Dashboard}
              auth={auth_Discord}
            />
  
            <Route
              exact
              path='/login'
              render={() => <Home auth={auth_Discord} route={route} />}
            />
  
            <Route component={NotFound} />
          </Switch>

      </Router>
    );
  };
















  return (
    <div className="App">      
        {/* <div class="grid-3">
        <div class="wrap-image-thumbnail-blog">
        <img src="https://assets.website-files.com/611580035ad59b20437eb024/61f9dd0e5ebb26817a7ac96b_image-blog.jpg" loading="lazy" alt="" class="image-thumbnail-blog">
        </img>
        </div> */}
      {/* </div> */}
      <div className="div-container relative">
      <div className ="blockwrap-sdk overflow hidden">
        <div className= "content-center">
          <div className = "wraper-padding-bug">
            <div className = "max-width-60ch margin-center">
              <div className = "logo-wrapper-bug-bounty">
              <img src="https://assets.website-files.com/611580035ad59b20437eb024/62ab97b4c865d05a19ff4029_Brand%20Assets.svg" loading="lazy" alt="" class="immunef-logo drift-logo">
              </img>
              {walletAddress ? !renderConnectedContainer() :<div className = "w-embed">

                <svg width="1em" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L9 9" stroke="white"  strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M9 1L1 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>

              </div>}
              {walletAddress ? !renderConnectedContainer() :<img src="https://solana.com/src/img/branding/solanaLogo.svg" loading="lazy" alt="" className="immunef-logo solana-logo">
              </img>}
              </div>
              {walletAddress ? !renderConnectedContainer() :<h1 className="h1-gradient font-size-3em">Created by 0xCleon</h1>}
              {walletAddress ? !renderConnectedContainer() : <p>Please connect your wallet to continue</p>}
              {/* <div class ="padding-2">
              </div> */}
              <div className={walletAddress ? 'authed-container' : 'container'}></div>
              <div>{!walletAddress && renderNotConnectedContainer()}</div>
              {walletAddress ? renderConnectedContainer() : null}

            </div>
          </div>
        </div>
        {walletAddress ? !renderConnectedContainer() : <img src ="https://assets.website-files.com/611580035ad59b20437eb024/6170e6b7587b587e289e9d75_line%20svg%20(1).png" loading="lazy" sizes="100vw" alt="" className="star"></img>}
        
        
        {/* <img src ="https://assets.website-files.com/611580035ad59b20437eb024/6170e6b7587b587e289e9d75_line%20svg%20(1).png" loading="lazy" sizes="100vw" alt="" class="star">

        </img> */}
      </div>
      </div>
        {/* <div className="header-container">
        <h1 class="h1-gradient font-size-3em">&lt;Connect your Phantom Wallet 👻 &gt;</h1>
      </div> */}
 
      
              
    </div>
  );
}

 

export default App;
