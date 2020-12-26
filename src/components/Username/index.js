import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {useState} from 'react';
import {Button} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Username = ({createUser}) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  return (
    <form onSubmit={(e) => e.preventDefault()} className={classes.root} noValidate autoComplete="off">
      <TextField 
      value={name}
      onChange={event => setName(event.target.value)}
      id="standard-basic" label="Standard" />
      <Button type='submit' onClick={() => createUser(name)}>Change Name</Button>
    </form>

  )
}

export default Username;