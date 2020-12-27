import { useState, useEffect, useRef, useContext } from 'react';
import { Button } from '@material-ui/core';
import AppContext from 'AppContext';
import TwilioVideo from './TwilioVideo';
// import {socket} from 'hooks/useAppData';
const Video = () => {
  const video = useRef();
  const {
    vid,
    setVid
  } = useContext(AppContext);
  // window.AudioContext = window.AudioContext
  //   || window.webkitAudioContext;
  // const context = new AudioContext();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia(
      {
        audio: true,
        video: true
      })
      .then((d) => {
        console.log(d);
        video.current.srcObject = d;
        setVid(prev => ({ ...prev, ready: true }));
        // const microphone = context.createMediaStreamSource(d);
        // const filter = context.createBiquadFilter();
        // // microphone -> filter -> destination
        // microphone.connect(filter);
        // filter.connect(context.destination);
      })
      .catch(er => console.log(er));
    video.current = document
      .querySelector("#videoElement");

    // const A = setInterval(() => {
    //   console.log(video.current.src);
    //   console.log(video.current.srcObject);

    // }, 6000);
    // return () => clearTimeout(A);
  }, []);

  function stop(e) {
    var stream = video.current.srcObject;
    var tracks = stream.getTracks();

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      track.stop();
    }
    video.current.srcObject = null;
  }

  return (
    <div>
      {/* <video width='480' height='420' controls>
        <source src="/mov.mp4" type="video/mp4" />
      </video> */}
      {/* <video autoPlay="true" id="videoElement"
        width='480' height='420'
      >
      </video>
    */}
      <Button onClick={stop} color='secondary'> Stop</Button>
      <TwilioVideo />

    </div>
  );
};
export default Video;