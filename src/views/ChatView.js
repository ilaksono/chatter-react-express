import React, { useContext, useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import 'styles/ChatPage.scss';
import CustomInput from "components/CustomInput/CustomInput.js";

import Button from "components/CustomButtons/Button.js";
import SendIcon from '@material-ui/icons/Send';
import AppContext from 'AppContext';
import MessageItem from 'components/MessageItem';
import MessageHeader from 'components/MessageItem/MessageHeader';
import MessageFooter from 'components/MessageItem/MessageFooter';
import Username from 'components/Username';
import styles from "assets/jss/material-dashboard-react/views/ChatView.js";

const useStyles = makeStyles(styles);

const colors = [
  '#32a8a8',
  '#b5387b',
  '#8b9c7e',
  '#d6a365',
  '#0a1638'
];
const initErr = {
  type: '',
  msg: ''
};

export default function ChatView() {

  const [err, setErr] = useState(initErr);
  const classes = useStyles();
  const {
    app,
    getChat,
    handleSend,
    createUser,
    loadUser
  } = useContext(AppContext);

  const [ins, setIns] = useState('');

  useEffect(() => {
    getChat();
  }, []);
  let parsedMsgs = [];
  if (app.chat.length) {
    let mem = '';
    let repeat = false;
    parsedMsgs = app.chat.map((msg) => {
      if (mem === msg.user_id) repeat = true;
      else {
        repeat = false;
        mem = msg.user_id;
      };
      const mine = msg.user_id === app.currentUser.id;
      return <>
        {
          !repeat &&
          <MessageHeader {...msg} mine={mine} color={colors[msg.user_id % 5]} />
        }
        <MessageItem msg={msg} mine={mine} />
        <MessageFooter {...msg} mine={mine} />
      </>;
    }
    );
  }
  const handleClick = (val) => {
    setErr({ type: '', msg: '' });
    if (!ins) return setErr({ type: 'bot', msg: 'Message shouldn\'t be blank' });

    if (!app.currentUser.id) return setErr({ type: 'bot', msg: 'Choose a name first' });
    handleSend(val);
    setIns('');
  };

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Public Chat Room</h4>
        <p className={classes.cardCategoryWhite}>
          Say hi to all{app.currentUser.username && ', ' + app.currentUser.username}
        </p>
      </CardHeader>
      <CardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
        <Username
          createUser={createUser}
          loadUser={loadUser}
          setErr={setErr}
        />
        {err.type === 'top' && <div className='public-err-container'>
          {err.msg}
        </div>}
        <div className='chat-box'>
          {parsedMsgs}
        </div>
        <div className={classes.searchWrapper}>
          <CustomInput
            formControlProps={{
              className: classes.margin + " " + classes.search + " " + 'msg-input'
            }}
            inputProps={{
              placeholder: "Message",
              inputProps: {
                "aria-label": "Search",
                value: ins,
                onChange: (e) => {
                  setErr('');
                  setIns(e.target.value);
                },
                style: {
                  color: 'black'
                }
              }
            }}
          />
          <Button
            color="white"
            aria-label="edit"
            justIcon
            round
            onClick={() => handleClick(ins)}
          >
            <SendIcon color='primary' />
          </Button>
        </div>
        {err.type === 'bot' && <div className='public-err-container'>
          {err.msg}
        </div>}
      </CardBody>
    </Card>
  );
}