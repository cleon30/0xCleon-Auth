import React from 'react';
import styled from 'styled-components';
import '../../App.css';
import { useSelector } from 'react-redux';
import { selectors } from '../../modules/_common/auth/discord';


export const Dashboard = () => {
  return (<h1 className="h1-gradient font-size-3em">
                  ACCESSTOKEN:  {useSelector(selectors.accessToken)}
         </h1>);


  
  
};

export default Dashboard;
