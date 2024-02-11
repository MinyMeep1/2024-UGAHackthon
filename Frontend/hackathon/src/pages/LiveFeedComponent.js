import React, { useEffect, useRef } from 'react';
import * as cv from 'opencv.js';

const LiveFeedComponent = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const grayMatRef = useRef(new cv.Mat());
  const facesRef = useRef(new cv.RectVector());

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    let isStreaming = false;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } }) // Specify facing mode
        .then(stream => {
          video.srcObject = stream;
          video.onloadedmetadata = () => {
            video.play();
            isStreaming = true;
          };
        })
        .catch(err => {
          console.error('Error accessing webcam:', err);
        });
    }

    const processVideo = () => {
      if (!isStreaming) {
        return;
      }

      const width = video.videoWidth;
      const height = video.videoHeight;

      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, width, height);

      // Face detection
      const faceCascade = new cv.CascadeClassifier();
      faceCascade.load('haarcascade_frontalface_default.xml');

      cv.cvtColor(cv.imread(canvas), grayMatRef.current, cv.ColorConversionCodes.COLOR_RGBA2GRAY.value, 0);
      faceCascade.detectMultiScale(grayMatRef.current, facesRef.current, 1.1, 3, 0, new cv.Size(0, 0), new cv.Size(0, 0));

      for (let i = 0; i < facesRef.current.size(); ++i) {
        const face = facesRef.current.get(i);
        const point1 = new cv.Point(face.x, face.y);
        const point2 = new cv.Point(face.x + face.width, face.y + face.height);
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.beginPath();
        context.rect(point1.x, point1.y, point2.x - point1.x, point2.y - point1.y);
        context.stroke();
      }

      requestAnimationFrame(processVideo);
    };

    video.addEventListener('canplay', processVideo);

    return () => {
      video.removeEventListener('canplay', processVideo);
      grayMatRef.current.delete();
      facesRef.current.delete();
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay muted></video>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default LiveFeedComponent;
