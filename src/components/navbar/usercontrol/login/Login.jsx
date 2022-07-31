import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const Login = ({ redirect }) => (
  <div>  
    <div className= "content-center">
   
      <div className = "wrap-image-discord">
       
          <input type="image" 
            src="https://cdn8.bigcommerce.com/s-prdpfsbvbl/product_images/uploaded_images/button-discord.png" 
            onClick={redirect}
            width="200" 
            height="50"
            
            />
            </div>

        </div>
   </div>


);

Login.propTypes = {
  redirect: PropTypes.func.isRequired
};

export default Login;
