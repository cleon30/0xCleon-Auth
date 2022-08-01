
import React, { useState, useEffect, useCallback } from "react";
import styled from 'styled-components';
import '../../App.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { user_GET } from '../../api/discord/data';
import { selectors as authSel} from '../../modules/_common/auth/discord';
import App from '../../App.jsx';
import { Connection, PublicKey, clusterApiUrl, Keypair } from '@solana/web3.js';
import Axios from "axios";

const Dashboard = () => {
  const LAMPORTS_PER_SOL = 1000000000;
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(0);
  const [datasend, setDatasend] = useState([]);
  const [array, setArray] = useState([]);
 
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
          const response = await solana.connect({ onlyIfTrusted: true });
          const balance = await connection.getBalance(response.publicKey)/LAMPORTS_PER_SOL;
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()

          );
          setBalance(balance);
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };
  // const fetchData = async() =>{
  //   const result2 =  await fetch('http://localhost:3000/dashboard')
  //   const jsonResult = await result2.json()
  //   setDatasend(jsonResult)
  // }
  
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
    
        
    // fetchData();
    
      // eslint-disable-next-line

    // POST request using fetch inside useEffect React hook
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  var today = new Date(),
   date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  console.log(data ? data.username : '');
  console.log(data ? data.email:'');
  console.log(data ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`: '');
  console.log(balance);
  console.log(
    { username:data ? data.username:'',
      address:walletAddress , 
      email:data ? data.email:'',
      balance:balance,
      id:data ? data.id:'',
      avatar:data ? data.avatar:'',
      picture:data ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`: '',
      time:date,
    });
  

  // try{
  // Axios.post('http://localhost:3001/api', {username:data ? data.username:'',address:walletAddress , email:data ? data.email:'',balance:balance, id:data ? data.id:'', avatar:data ? data.avatar:''})
  // }catch(e){
  //   console.log(e)
  // }
  
  return (
    
    <div className = "max-width-60ch margin-center">
      {/* <h1 className="h1-gradient font-size-3em">
          ACCESSTOKEN:  {useSelector(authSel.accessToken)} 
                      
      </h1> */}
      <h1 className="h1-gradient font-size-3em">
       Hello {data ? data.username : ''}, this is your Dashboard
      </h1>
      <img src ="https://seeklogo.com/images/S/solana-sol-logo-9AA58519FE-seeklogo.com.png" className="solana-logo2" >
      </img>
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
        <h1 className="normal-text">
          Balance: {balance} SOL
        </h1>
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
