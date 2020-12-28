import { useReducer, useEffect, useState } from 'react';
import axios from 'axios';

const GET_CHAT = 'GET_CHAT';
const MY_MSG = 'MY_MSG';
const NEW_USER = 'NEW_USER';
const NEW_MSG = 'NEW_MSG';
const LOAD_USER = 'LOAD_USER_FROM_COOKIES'
const reducer = (state, action) => {
  switch (action.type) {
    case GET_CHAT: {
      return { ...state, chat: action.data };
    }
    case MY_MSG: {
      return {
        ...state, chat: [...state.chat, {
          username: state.currentUser.username,
          description: action.msg,
          time: new Date(),
          user_id: state.currentUser.id,
          profile_pic: state.currentUser.profile_pic
        }]
      };
    }
    case LOAD_USER: 
      return {...state, currentUser:{
        username: action.name,
        id: action.id,
        profile_pic: action.profile_pic
      }}
    case NEW_MSG: {
      if (state.currentUser.id !== action.id)
        return {
          ...state, chat: [...state.chat, {
            description: action.msg,
            time: action.date,
            username: action.username,
            user_id: action.id,
            profile_pic: action.profile_pic
          }]
        };
      else return state;
    }
    case NEW_USER:
      return { ...state, currentUser: { username: action.name, id: action.id, profile_pic: action.profile_pic } };
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
  const [vid, setVid] = useState({ ready: false, data: {} });
  const getChat = async () => {
    const data = await axios.get('/api/chat');
    dispatch({ type: GET_CHAT, data: data.data });
  };

  useEffect(() => { // on mount - add websocket listener to trigger render on update
    const baseURL = process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:8001';
    const socket = new WebSocket(baseURL);
    socket.onopen = () => {
      socket.send('ping');
    };
    socket.addEventListener('message', function (event) {
      const update = JSON.parse(event.data);
      if (update.type === 'PUBLIC_CHAT') { // check type of parsed message to filter messages
        const { msg, id, profile_pic, username, date } = update;
        dispatch({ type: NEW_MSG, msg, id, profile_pic, username, date });
      }
    });
    return () => socket.close(() => console.log('socket closed  '));
  }, []);

  const createUser = async (name) => {
    try {
      const data = await axios.post('/api/users', { data: { name } });
      const { id, profile_pic } = data.data[0];
      dispatch({ type: NEW_USER, name, id, profile_pic });
      return {id, profile_pic};
    } catch (er) {
      console.log(er);
    }
  };
  const loadUser = (name, id, profile_pic) => {
    dispatch({type:LOAD_USER, name, id, profile_pic})
  }

  const handleSend = async (msg) => {
    await axios
      .post('/api/public', { data: { msg, id: app.currentUser.id } });
    // socket.send(JSON.stringify)
    dispatch({ type: MY_MSG, msg });
  };

  return {
    app,
    getChat,
    handleSend,
    createUser,
    vid,
    setVid,
    loadUser
  };

};
export default useAppData;