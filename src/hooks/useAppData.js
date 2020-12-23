import { useReducer, useEffect } from 'react';
import axios from 'axios';

const GET_CHAT = 'GET_CHAT';

const reducer = (state, action) => {
  switch (action.type) {
    case GET_CHAT: {
      return { ...state, chat: action.data };
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
  const [app, dispatch] = useReducer(reducer, initApp);
  const getChat = async () => {
    const data = await axios.get('/api/chat');
    dispatch({ type: GET_CHAT, data: data.data });
};
useEffect(() => {
  const baseURL = process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:8001';
  const socket = new WebSocket(baseURL);
  socket.onopen = () => {
    socket.send('ping');
  };
  socket.addEventListener('message', function (event) {
    const update = JSON.parse(event.data);
    console.log(update);
    // if (update.type) { // check type of parsed message to filter messages
    //   const { type, msg, user } = update;
    //   axios.get('api/days')
    //     .then(data => setChat(prev => [...prev, { msg, user, date: new Date() }]))
    //     .catch(er => console.log(er));
    // }
  });
  return () => socket.close();
}, []);

return {
  app,
  getChat
}

};
export default useAppData;