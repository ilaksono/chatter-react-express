import { useReducer, useEffect } from 'react';
import axios from 'axios';

const GET_CHAT = 'GET_CHAT';
const MY_MSG = 'MY_MSG'
const NEW_USER = 'NEW_USER';

const reducer = (state, action) => {
  switch (action.type) {
    case GET_CHAT: {
      return { ...state, chat: action.data };
    }
    case MY_MSG: {
      return {...state, chat:[...state.chat, {username: state.currentUser.username, 
        description: action.msg, 
        time: new Date(),
        user_id: state.currentUser.id
      }]}
    }
    case NEW_USER:
      return {...state, currentUser:{username: action.name, id: action.id, profile_pic:action.profile_pic}}
    default:
      throw new Error('invalid type');
  }
};

const initApp = {
  currentUser: {},
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
const createUser = async (name) => {
  try {
    const data = await axios.post('/api/users', {data: {name}})
    console.log(data.data);
    const {id, profile_pic} = data.data[0];
    dispatch({type: NEW_USER, name, id, profile_pic })
  }catch(er) {
    console.log(er);
  }
}

const handleSend = async (msg) => {
  await axios
  .post('/api/public', {data: {msg, id: app.currentUser.id}});
  dispatch({type: MY_MSG, msg})
}

return {
  app,
  getChat,
  handleSend,
  createUser
}

};
export default useAppData;