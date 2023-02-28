import './Login.scss';
// import useLocalStorage, { getDefaultStorageValue } from "../../../hooks/useLocalStorage";

import { useNavigate } from "react-router";
import LoginForm from '../../../forms/login-form';
import { useState } from 'react';

function Login () {

  const navigate = useNavigate();

  const [passwordToggle, setPasswordToggle] = useState(false);
  // const [userData, setUserData] = useLocalStorage('user', getDefaultStorageValue('user'));
  
  const submitCallback = (submitState) => {
    console.log('Calback value Received ==> ', submitState);
    if (submitState === true) {
      navigate('/dashboard');
    } else {
      alert('Incorrect Credentials ... \nTry with this: \n\nemail: graham@test.com \npassword: password');
    }
  }

  const loginForm = LoginForm(submitCallback);

  return (
    <div className="section-login flex-center">
      <div className="login-container">
        <div className="login-brand-wrapper">
          <div className="brand-container px-2">
            <img
              className="brand-logo"
              src="/images/logo_placeholder.png"
              alt="brand logo"
            />
            <span className="icon-wrapper py-3">
              <i className="fa-solid fa-user-secret"></i>
            </span>
            <div className="title c-font-20">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <p className="subtitle">
              Sed ut facilisis nulla, non aliquam libero. Nunc pretium massa nec
              massa consectetur, vel ullamcorper nunc laoreet.
            </p>
          </div>
        </div>
        <div className="login-form-wrapper px-2">
          <div className="form-container">
            <div className="title c-font-18">Log In</div>
            <form className="login-form my-3 c-font-14">
              <div className="mb-3 custom-form-block">
                <label htmlFor="login-email" className="form-label">
                  Email Address *
                </label>
                <div className="input-group has-validation">
                  <span className="input-group-text">
                    <i className="fa-solid fa-at"></i>
                  </span>
                  <input
                    type="email"
                    name="email"
                    id="login-email"
                    className={(loginForm.touched.email && loginForm.errors.email) 
                      ? 'form-control is-invalid' 
                      : 'form-control'}
                    placeholder='Enter Email Address'
                    onChange={loginForm.handleChange}
                    onBlur={loginForm.handleBlur}
                    value={loginForm.values.email}
                  />
                  {
                    loginForm.touched.email && loginForm.errors.email 
                    ? <div className='invalid-feedback'>{loginForm.errors.email}</div>
                    : null
                  }
                </div>
              </div>

              <div className="mb-3 custom-form-block">
                <label htmlFor="login-password" className="form-label">
                  Password *
                </label>
                <div className="input-group has-validation">
                  <span className="input-group-text">
                    <i className="fa-solid fa-lock"></i> 
                  </span>
                  <input
                    type={passwordToggle ? "text" : "password"}
                    name="password"
                    id="login-password"
                    className={(loginForm.touched.password && loginForm.errors.password) 
                      ? 'form-control is-invalid' 
                      : 'form-control'}
                    placeholder='Enter Password'
                    onChange={loginForm.handleChange}
                    onBlur={loginForm.handleBlur}
                    value={loginForm.values.password}
                  />
                  <span className="input-group-text eye-icon-wrapper" onClick={() => setPasswordToggle(!passwordToggle)}>
                    {
                      passwordToggle ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>
                    } 
                  </span>
                  {
                    loginForm.touched.password && loginForm.errors.password 
                    ? <div className='invalid-feedback'>{loginForm.errors.password}</div>
                    : null
                  }
                </div>
              </div>

              <div className="action-wrapper flex-center">
                <div className="password-link c-font-14">Forgot Password ?</div>
                <button
                  type="submit"
                  className="btn btn-primary btn-filled"
                  onClick={loginForm.handleSubmit}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;