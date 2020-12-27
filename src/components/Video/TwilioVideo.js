import axios from 'axios'
import {Button}  from '@material-ui/core';
const { connect } = require('twilio-video');


const TwilioVideo = () => {

  const getToken = async () => {
    const data = await axios.get('/token');
    console.log(data.data);
    connect(data.data, { name: 'cool room' }).then(room => {
      console.log(`Successfully joined a Room: ${room}`);
      room.on('participantConnected', participant => {
        console.log(`A remote Participant connected: ${participant}`);
      });
    }, error => {
      console.error(`Unable to connect to Room: ${error.message}`);
    });
  }
  return (
    <div>
      <Button onClick={getToken}>Get Token</Button>
    </div>
  )
}
export default TwilioVideo;