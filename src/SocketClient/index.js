import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://127.0.0.1:8000');

export const LikePost = () => {
   useEffect(() => {
      socket.on('likeToClient', async (newPost) => {
         console.log(document.getElementById(`${newPost.ID}`).textContent);
         document.getElementById(`${newPost.ID}`).textContent =
            parseInt(document.getElementById(`${newPost.ID}`).textContent) + 1;
      });
   }, [socket]);
};

export const UnLikePost = () => {
   useEffect(() => {
      socket.on('unLikeToClient', async (newPost) => {
         document.getElementById(`${newPost.ID}`).textContent =
            parseInt(document.getElementById(`${newPost.ID}`).textContent) - 1;
      });
   }, [socket]);
};
