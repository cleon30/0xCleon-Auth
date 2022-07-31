
import React, { useEffect } from 'react';
import styled from 'styled-components';
import '../../App.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { user_GET } from '../../api/discord/data';
import { selectors as authSel} from '../../modules/_common/auth/discord';
import Avatar from '@material-ui/core/Avatar';
const User = () => {
  // const accessToken = useSelector(authSel.accessToken);
  // const [data, setData] = React.useState(null);
  // const getUserName = async () => {
  //     const req = user_GET(accessToken);
  //     const result = await axios.get(req.url, req.headers);
  //     setData(result.data);
  //   };
  }

const Dashboard = () => {
  const accessToken = useSelector(authSel.accessToken);
  const [data, setData] = React.useState(null);
  const getUserName = async () => {
      const req = user_GET(accessToken);
      const result = await axios.get(req.url, req.headers);
      setData(result.data);
    };
  useEffect(() => {
    getUserName();
      // eslint-disable-next-line
  }, []);

  return (
    <div className = "max-width-60ch margin-center">
      {/* <h1 className="h1-gradient font-size-3em">
          ACCESSTOKEN:  {useSelector(authSel.accessToken)} 
                      
      </h1> */}
      <h1 className="h1-gradient font-size-3em">
        You are currently log in as {data ? data.username : ''}
      </h1>
      <img
        src={
          data
            ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
            : ''
        }
        data-test='logoIMG'
      />
      <h1 className="h1-gradient font-size-3em">
        {data ? data.email: ''}
      </h1>

      
         
        
    </div>
        
        
         );


  
  
};

export default Dashboard;
