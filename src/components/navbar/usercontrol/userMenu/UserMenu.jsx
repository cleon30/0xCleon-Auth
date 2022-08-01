import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import '../../../../App.css';
import { operations } from '../../../../modules/_common/auth/discord';
import { useSelector } from 'react-redux';
import { selectors as authSel } from '../../../../modules/_common/auth/discord';
import { user_GET } from '../../../../api/discord/data';

const Layout = styled.div`
  display: flex;
  div {
    position:relative;
    
    bottom:180px;
    width: 80px;
    height: 80px;
    margin-left:50px;

  }
`;

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const logout = () => operations.logout();

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
    <div className="div-container relative">
    {/* <div className ="blockwrap-sdk overflow hidden"> */}
    <div className= "content-center">
    <div className = "wraper-padding-bug">
      <Layout>
      <Avatar
        src={
          data
            ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
            : ''
        }
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
        data-test='logoIMG'
      />
    
      {/* <Button
        variant='contained'
        color='primary'
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        {data ? data.username : ''}
      </Button> */}
      <Menu 
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Menu Option 1</MenuItem>
        <MenuItem onClick={handleClose}>Menu Option 2</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
      </Layout>
     
    </div>
    </div>
    {/* </div> */}
    </div>
  
  );
};

export default UserMenu;
