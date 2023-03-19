import clsx from 'clsx';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Alert } from '../../components';
import { useAuthContext } from './Auth.context';
import styles from './Auth.module.css';

export function Auth() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    retype_password: '',
    fName: '',
    lName: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    retype_password: '',
    fName: '',
    lName: '',
  });

  const [globalMessage, setGlobalMessage] = useState({
    message: '',
    type: 'error',
  });

  const { login, user } = useAuthContext();
  const { pathname, state } = useLocation();
  const isLogin = pathname === '/login';

  // If the user has logged in successfully we redirect them from the login page
  // to where they came from or the homepage if there was nothing in the state.
  // state?.from means something like if there is state and it is not null then try
  // to get the "from" property from state, this is called the elvis operator or optional chaining operator (MDN)
  const from = state?.from ? state.from : '/';
  if (user) {
    return <Navigate to={from} />;
  }

  function isFormValid() {
    let isValid = true;
    const newErrors = { ...errors };

    if (!values.email.trim()) {
      isValid = false;
      newErrors.email = 'Please type a valid email.';
    }

    if (!values.password.trim()) {
      isValid = false;
      newErrors.password = 'Please type a valid password.';
    }

    if (!isLogin) {
      if (values.retype_password !== values.password) {
        isValid = false;
        newErrors.retype_password = 'The two passwords did not match.';
      }

      if (!values.fName.trim()) {
        isValid = false;
        newErrors.fName = 'Please type a valid first name.';
      }

      if (!values.lName.trim()) {
        isValid = false;
        newErrors.lName = 'Please type a valid last name.';
      }
    }

    setErrors(newErrors);

    return isValid;
  }

  function handleInputChange(e) {
    // const inputName = e.target.name;
    // const newValues = { ...values };
    // newValues[inputName] = e.target.value;
    // setValues(newValues);

    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    let userObj;
    if (isLogin) {
      userObj = {
        email: values.email,
        password: values.password,
      };
    } else {
      userObj = { ...values };
      delete userObj.retype_password;
    }

    const res = await fetch(
      `http://localhost:3000/${isLogin ? 'login' : 'register'}`,
      {
        method: 'POST',
        body: JSON.stringify(userObj),
        headers: {
          'Content-type': 'application/json',
        },
      }
    );

    if (res.ok === false) {
      const errorMessage = await res.json();
      setGlobalMessage({ message: errorMessage, type: 'error' });
      return;
    }

    setGlobalMessage({
      message: isLogin
        ? 'You logged in successfully'
        : 'User created successfully',
      type: 'success',
    });

    const data = await res.json();
    login(data.accessToken, data.user);
  }

  return (
    <>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      <Alert
        type={globalMessage.type}
        onMessageClosed={() => setGlobalMessage({ message: '', type: 'error' })}
      >
        {globalMessage.message}
      </Alert>
      <form onSubmit={handleSubmit}>
        <p className={clsx({ [styles['has-error']]: errors.email })}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />
        </p>
        {/* Conditional Rendering */}
        {errors.email && (
          <p className={styles['error-message']}>{errors.email}</p>
        )}
        <p className={clsx({ [styles['has-error']]: errors.password })}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
          />
        </p>
        {errors.password && (
          <p className={styles['error-message']}>{errors.password}</p>
        )}

        {!isLogin && (
          <>
            <p
              className={clsx({
                [styles['has-error']]: errors.retype_password,
              })}
            >
              <label htmlFor="retype_password">Retype Password</label>
              <input
                type="password"
                id="retype_password"
                name="retype_password"
                value={values.retype_password}
                onChange={handleInputChange}
              />
            </p>
            {errors.retype_password && (
              <p className={styles['error-message']}>
                {errors.retype_password}
              </p>
            )}
            <p className={clsx({ [styles['has-error']]: errors.fName })}>
              <label htmlFor="fName">First Name</label>
              <input
                type="text"
                id="fName"
                name="fName"
                value={values.fName}
                onChange={handleInputChange}
              />
            </p>
            {errors.fName && (
              <p className={styles['error-message']}>{errors.fName}</p>
            )}
            <p className={clsx({ [styles['has-error']]: errors.lName })}>
              <label htmlFor="lName">Last Name</label>
              <input
                type="text"
                id="lName"
                name="lName"
                value={values.lName}
                onChange={handleInputChange}
              />
            </p>
            {errors.lName && (
              <p className={styles['error-message']}>{errors.lName}</p>
            )}
          </>
        )}
        <p>
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </p>
      </form>
    </>
  );
}
