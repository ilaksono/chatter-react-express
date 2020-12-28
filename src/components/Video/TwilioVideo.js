import axios from 'axios';
import { useRef } from 'react';
import { Button } from '@material-ui/core';
const { connect, createLocalVideoTrack } = require('twilio-video');


const TwilioVideo = () => {
  const ref = useRef();
  const removePreview = () => {
    const localMediaContainer = document.getElementById('local-media').children[0];
    if (localMediaContainer)
      localMediaContainer.remove();
  };
  const getPreview = () => {
    createLocalVideoTrack().then(track => {
      const localMediaContainer = document.getElementById('local-media');
      localMediaContainer.appendChild(track.attach());
    });
  };
  const getToken = async () => {
    const data = await axios.get('/token');
    return connect(data.data.jwt, { name: data.data.rm, video: { width: 480 } })
      .then(room => {
        // if (data.data.cntr === 1) {
        createLocalVideoTrack({ width: 480 }).then(track => {
          const localMediaContainer = document.getElementById('remote-media-div');
          localMediaContainer.appendChild(track.attach());
        });
        // }
        ref.current = room;
        if (room.participants.length) {
          room.participants.forEach(participant => {
            participant.tracks.forEach(pub => {

              if (pub.isSubscribed) {
                const track = pub.track;
                document.getElementById('remote-media-div')
                  .appendChild(track.attach());
              }
              participant.on('trackSubscribed', track => {
                document.getElementById('remote-media-div')
                  .appendChild(track.attach());
              });
            });
          });
        }

        // console.log(`Successfully joined a Room: ${room}`);
        room.on('participantConnected', participant => {

          participant.tracks.forEach(pub => {

            if (pub.isSubscribed) {
              const track = pub.track;
              document.getElementById('remote-media-div')
                .appendChild(track.attach());
            } else {
              participant.on('trackSubscribed', track => {
                document.getElementById('remote-media-div')
                  .appendChild(track.attach());
              });
            }

          });

          // console.log(`A remote Participant connected: ${participant}`);
        });
        room.participants.forEach(participant => {
          participant.tracks.forEach(publication => {

            if (publication.track) {
              document.getElementById('remote-media-div')
                .appendChild(publication.track.attach());
            }
          });

          participant.on('trackSubscribed', track => {
            document.getElementById('remote-media-div')
              .appendChild(track.attach());
          });
        });

        room.on('participantDisconnected', participant => {
          // console.log(`Participant disconnected: ${participant.identity}`);
        });
        return room;
      }, error => {
        console.error(`Unable to connect to Room: ${error.message}`);
      });

  };
  const disconnect = () => {
    if (ref.current)
      ref.current.disconnect();
    const containers = document.getElementById('remote-media-div').children;
    for (const child of containers)
      child.remove();
  };
  return (
    <div>
      <Button onClick={() => {
        getToken();
      }
      }>Go Live</Button>
      <Button onClick={() => {
        getPreview();

      }}>Preview</Button>
      <Button color='secondary' onClick={removePreview}>Stop Preview</Button>
      <Button color='secondary' onClick={disconnect}>Disconnect</Button>
      <div
        id='local-media'
        style={{ width: 480, height: 420 }}
      >
      </div>
      <div id='remote-media-div' style={{ width: 480, minHeight: 420 }}>

      </div>

    </div >
  );
};
export default TwilioVideo;