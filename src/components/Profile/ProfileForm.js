import React, { useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory()
  const authCtx = useContext(AuthContext)
  const newPasswordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const newPassword = newPasswordInputRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD-PjGnJ-TGyGPQg4jko0vs9Ekdi6XtznA', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: newPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      history.replace('/')
      console.log(res)
    })
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' ref={newPasswordInputRef} minLength="7" id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
