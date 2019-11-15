import React from 'react';
import coda from '../images/coda.svg';

const Judge1 = () => {
  return (
    <div >
        <img class='logo-img' src={coda} alt='CODA logo' />
        <form action='' class='login-form'>
          <div class='login-email'>
            <label for='email'></label>
            <input type='email' id='email' required />
          </div>
          <div class='login-password'>
            <label for='password'></label>
            <input type='password' id='password' required />
          </div>
          <div class='form-submit'>
            <input type='submit' value='login' />
          </div>
        </form>
    </div>
  );
}

export default Judge1;
