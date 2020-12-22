import { useReducer } from 'react';
import axios from 'axios';
const SET_CHAT = 'SET_CHAT';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CHAT: {
      return { ...state };
    }
    default:
      throw new Error('invalid type');

  }
};

const initApp = {
  currentUser: '',
  chat: []
};

const useAppData = () => {
  const [app, dispatch] = useReducer();
  const getChat = async () => {
    const data = await axios.get('/api/chat');
    
  };

};