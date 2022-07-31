
import React, { useState, useEffect, useCallback } from "react";
import styled from 'styled-components';
import '../../App.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { user_GET } from '../../api/discord/data';
import { selectors as authSel} from '../../modules/_common/auth/discord';
import App from '../../App.jsx';


const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState(null);
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
  const accessToken = useSelector(authSel.accessToken);
  const [data, setData] = React.useState(null);
  const getUserName = async () => {
      const req = user_GET(accessToken);
      const result = await axios.get(req.url, req.headers);
      setData(result.data);
    };
  useEffect(() => {
    checkIfWalletIsConnected();
    getUserName();
    
      // eslint-disable-next-line

    // POST request using fetch inside useEffect React hook
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  console.log(data ? data.username : '');
  console.log(data ? data.email:'');
  console.log(data ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`: '');

  

  return (

    <div className = "max-width-60ch margin-center">
      {/* <h1 className="h1-gradient font-size-3em">
          ACCESSTOKEN:  {useSelector(authSel.accessToken)} 
                      
      </h1> */}
      <h1 className="h1-gradient font-size-3em">
       Hello {data ? data.username : ''}, this is your Dashboard
      </h1>
      
      <img
        src={
          data
            ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
            : ''
        }
        data-test='logoIMG'
      />

      <h1 className="normal-text">
        {data ? data.email: ''}
      </h1>
      {/* <h1>
        hello
        </h1> */}
        
        <h1 className="h1-gradient font-size-05em">
          {walletAddress ? walletAddress.slice(0,4):''}..{walletAddress ? walletAddress.slice(-4):''}
        </h1>
      {/* <h1 className="h1-gradient font-size-05em">
      {walletAddress.slice(0,4)}..{walletAddress.slice(-4)}
      </h1> */}
      
     
      

      
         
    
    </div>
        
        
         );


  
  
};

export default Dashboard;
