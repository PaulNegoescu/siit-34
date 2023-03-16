import React, { useContext, useState } from 'react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState/useLocalStorageState';

// We'll use this in several places as the default value for the state that is shared
const defaultAuthState = {
  token: null,
  user: null,
};

// We create a new context using React, this returns an
// object that contains two components, a Provider and a Consumer, we only need
// the Provider, but we also need the whole object with both lower down.
// We set the initial context value to null so that we can check if it was not used
// in the correct place
export const AuthContext = React.createContext(null);

// We now create a component who's role it is to manage the state of the context and to
// wrap all of the children inside the Provider we created above.
export function AuthContextProvider({ children }) {
  // We now create the state variable that this component manages, it takes the default value
  // from above as the initial value
  const [auth, setAuth] = useLocalStorageState(defaultAuthState);

  // We create specialized login and logout functions which set the state in a very precise manner
  function login(token, user) {
    setAuth({
      token,
      user,
    });
  }

  function logout() {
    setAuth(defaultAuthState);
  }

  // We wrap the children of the current component inside the Provider we created above
  // We also configure the Provider with a value prop (it has to be named value!)
  // The value prop's value needs to be whatever state and stateful logic we want to share
  // with the children in our case we spread the token and user values and add the login
  // and logout functions, now all children have access to all of these.
  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// The last thing we create is a custom hook, it needs to be named with "use" at the begining.
// The custom hook will use React's built in useContext hook, configure it with the AuthContext
// we created above and then will simply return the value the built in hook returned.
export function useAuthContext() {
  // Here we configure it and take its value
  const ctx = useContext(AuthContext);

  // We check if the value is still null (remember how we created the context with null above?)
  // If it is it means the hook was not used in a component that is a child of the Provider
  // We throw an error to let the programmer know how they messed up.
  if (!ctx) {
    throw new Error(
      'Please always use the useAuthContext Hook inside the AuthContextProvider component or its descendents.'
    );
  }

  // We now return the value returned by the built in hook that was configured.
  return ctx;
}
