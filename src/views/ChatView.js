import React, { useContext, useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import 'styles/ChatPage.scss';
import CustomInput from "components/CustomInput/CustomInput.js";
import dropdownStyle from "assets/jss/material-dashboard-react/dropdownStyle.js";
import {
  defaultFont,
  dangerColor,
  whiteColor
} from "assets/jss/material-dashboard-react.js";
import Button from "components/CustomButtons/Button.js";
import SendIcon from '@material-ui/icons/Send';
import AppContext from 'AppContext';
import MessageItem from 'components/MessageItem';
import MessageHeader from 'components/MessageItem/MessageHeader';
import MessageFooter from 'components/MessageItem/MessageFooter';
import Username from 'components/Username';

const styles = (theme) =>
  ({
    ...dropdownStyle(theme),
    search: {
      "& > div": {
        marginTop: "0"
      },
      [theme.breakpoints.down("sm")]: {
        margin: "10px 15px !important",
        float: "none !important",
        paddingTop: "1px",
        paddingBottom: "1px",
        padding: "0!important",
        width: "60%",
        marginTop: "40px",
        "& input": {
          color: whiteColor
        },
        
      },
      [theme.breakpoints.up("sm")]: {
        margin: "10px 15px !important",
        float: "none !important",
        paddingTop: "1px",
        paddingBottom: "1px",
        padding: "0!important",
        width: "400px",
        marginTop: "40px",
        "& input": {
          color: whiteColor
        }
      },
    },
    linkText: {
      zIndex: "4",
      ...defaultFont,
      fontSize: "14px",
      margin: "0px"
    },
    buttonLink: {
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        margin: "10px 15px 0",
        width: "-webkit-fill-available",
        "& svg": {
          width: "24px",
          height: "30px",
          marginRight: "15px",
          marginLeft: "-15px"
        },
        "& .fab,& .fas,& .far,& .fal,& .material-icons": {
          fontSize: "24px",
          lineHeight: "30px",
          width: "24px",
          height: "30px",
          marginRight: "15px",
          marginLeft: "-15px"
        },
        "& > span": {
          justifyContent: "flex-start",
          width: "100%"
        }
      }
    },
    searchButton: {
      [theme.breakpoints.down("sm")]: {
        top: "-50px !important",
        marginRight: "22px",
        float: "right"
      },
    },
    margin: {
      zIndex: "4",
      margin: "0"
    },
    searchIcon: {
      width: "17px",
      zIndex: "4"
    },
    notifications: {
      zIndex: "4",
      [theme.breakpoints.up("md")]: {
        position: "absolute",
        top: "2px",
        border: "1px solid " + whiteColor,
        right: "4px",
        fontSize: "9px",
        background: dangerColor[0],
        color: whiteColor,
        minWidth: "16px",
        height: "16px",
        borderRadius: "10px",
        textAlign: "center",
        lineHeight: "16px",
        verticalAlign: "middle",
        display: "block"
      },
      [theme.breakpoints.down("sm")]: {
        ...defaultFont,
        fontSize: "14px",
        marginRight: "8px"
      }
    },
    manager: {
      [theme.breakpoints.down("sm")]: {
        width: "100%"
      },
      display: "inline-block"
    },
    searchWrapper: {
      [theme.breakpoints.down("sm")]: {
        width: "-webkit-fill-available",
        margin: "10px 15px 0"
      },
      display: "inline-block",
      textAlign: 'center'
    },
    typo: {
      paddingLeft: "25%",
      marginBottom: "40px",
      position: "relative"
    },
    note: {
      fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
      bottom: "10px",
      color: "#c0c1c2",
      display: "block",
      fontWeight: "400",
      fontSize: "13px",
      lineHeight: "13px",
      left: "0",
      marginLeft: "20px",
      position: "absolute",
      width: "260px"
    },
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Poppins', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    }
  });


const useStyles = makeStyles(styles);

const colors = [
  '#32a8a8',
  '#b5387b',
  '#8b9c7e',
  '#d6a365',
  '#0a1638'
]

export default function ChatView() {

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
          <MessageHeader {...msg} mine={mine} color={colors[msg.user_id % 5]}/>
        }
        <MessageItem msg={msg} mine={mine} />
        <MessageFooter {...msg} mine={mine} />
      </>;
    }
    );
  }
  const handleClick = (val) => {
    if (!ins || !app.currentUser.id) return;
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
        <Username createUser={createUser} loadUser={loadUser}/>
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
                onChange: (e) =>
                  setIns(e.target.value),
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
      </CardBody>
    </Card>
  );
}