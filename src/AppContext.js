import React from 'react';
import useAppData from 'hooks/useAppData';

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const {
    app,
    getChat,
    handleSend,
    createUser,
    vid,
    setVid,
    loadUser
  } = useAppData();
  return (
    <AppContext.Provider value={{
      app,
      getChat,
      handleSend,
      createUser,
      vid,
      setVid,
      loadUser
    }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;