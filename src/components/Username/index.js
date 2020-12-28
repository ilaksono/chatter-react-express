import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useCookies } from 'react-cookie';
import 'styles/Scrollbars.scss';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: 0,
      width: '80vw',
      display: 'flex',
      flexDirection:'row'
    },
    margin: 10,
    padding: 10,
    width: '70vw',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
}));

const Username = ({ createUser, loadUser }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['name']);
  const handleSubmit = async () => {
    const { id, profile_pic } = await createUser(name);
    setCookie('name', name, { path: '/' });
    setCookie('profile_pic', profile_pic, { path: '/' });
    setCookie('id', id, { path: '/' });
  };
  useEffect(() => {
    if (cookies.name && cookies.profile_pic && cookies.id)
      loadUser(cookies.name, cookies.id, cookies.profile_pic );
  }, []);
  return (
    <form onSubmit={(e) => e.preventDefault()} className={classes.root} noValidate autoComplete="off">
      <TextField
        value={name}
        className='username-input'
        onChange={event => setName(event.target.value)}
        id="standard-basic" label="Username" />
      <Button type='submit' 
      style={{
        width:'100px',
        margin: 0,
        fontSize: '30px',
        color: 'grey'
      }}
        onClick={handleSubmit}><i class="fas fa-user"></i></Button>
    </form>

  );
};

export default Username;