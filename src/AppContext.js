import React from 'react';
import useAppData from 'hooks/useAppData';

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const {
    app,
    getChat
  } = useAppData();
  return (
    <AppContext.Provider value={{
      app,
      getChat
    }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;