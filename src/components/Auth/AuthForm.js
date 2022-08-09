import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import AuthContext from '../../store/auth-context.js'
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory()

  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    let url = ''
    if(isLogin){
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD-PjGnJ-TGyGPQg4jko0vs9Ekdi6XtznA'
    }
    else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD-PjGnJ-TGyGPQg4jko0vs9Ekdi6XtznA'
    }
    fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(res => {
      if(res.ok) {
        return res.json()
      }
      else {
        // console.log(res)
        return res.json().then(data => {
          let errorMessage = 'Authentication Failed!!!'
          throw new Error(errorMessage)
          // console.log(data)
        })
      }
    }).then(data => {
      authCtx.login(data.idToken)
      history.replace('/')
    })
    .catch(err => {
      alert(err.message);
    });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordRef} required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
