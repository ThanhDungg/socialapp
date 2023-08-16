import classNames from 'classnames/bind';
import styles from './MessageUser.module.scss';
import Sidebar from '../components/Sidebar';
import SidebarListUserMessage from '../components/SidebarListUserMessage';
import ImgToProfile from '../../components/ImgToProfile';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import OrtherMessage from '../../components/OrtherMessage';
import MyMessage from '../../components/MyMessage';
import ScrollToBottom from 'react-scroll-to-bottom';
import { getData, postData } from '../../config/fetchData';
import { getMessage, getMessageConver, getUser } from '../../config/configs';
import { SocketContext } from '../../App';
import { useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function MessageUser() {
   const socket = useContext(SocketContext);
   const navigate = useNavigate();

   const { iduser1 } = useParams();

   const [id, setID] = useState('');
   const [idConver, setIDConver] = useState('');
   const [owner, setOwner] = useState({});

   const [user, setUser] = useState({});
   const [page, setPage] = useState(0);
   // var page = 0;
   const [message, setMessage] = useState([]);

   const [tempMes, setTempMes] = useState('');

   const [Alt, setAlt] = useState();
   const chooseFile = (inputFile) => {
      const file = inputFile.target.files[0];

      file.preview = URL.createObjectURL(file);

      setAlt(file);
   };

   const sendImg = async () => {
      try {
         await setMessage((list) => [
            ...list,
            {
               SEND_USER_ID: localStorage.getItem('idUser'),
               CONTENT: Alt.preview,
               createdAt: new Date().toDateString(),
               TYPE: 'file',
            },
         ]);
         let formData = new FormData();
         await formData.append('file', Alt);
         await formData.append('type', 'image');
         await fetch(`https://ptit-social-app.onrender.com/api/messege/${idConver}`, {
            method: 'POST',
            body: formData,
            headers: {
               accessToken: localStorage.getItem('accessToken'),
            },
         })
            .then((json) => json.json())
            .then((res) => {
               console.log(idConver);
               console.log(res);
            });
      } catch (e) {
         console.log(e);
      }
      // setAlt();
   };

   const handleClickConversation = async (id) => {
      navigate(`/message/${id}`);
      // if (id == con.CONVERSATION.USER_CONVERSATIONs[0].USER_ID) {
      //    return;
      // }
      // await setUser(con);
      // await setIDConver(con.CONVERSATION.ID);
      // await setID(con.CONVERSATION.USER_CONVERSATIONs[0].USER_ID);
      // const res = await getData(
      //    getMessage + `/${con.CONVERSATION.ID}?page=${page}`,
      //    localStorage.getItem('accessToken'),
      // );
      // if (res.data.result.length > 0) {
      //    setMessage(res.data.result.reverse());
      // }
      // console.log(res.data.result);
   };

   const handleLoadMore = async () => {
      setPage(page + 1);
      const res = await getData(
         getMessageConver + `/${idConver}?page=${page + 1}`,
         localStorage.getItem('accessToken'),
      );
      await setMessage((list) => res.data.result.reverse().concat(list));
   };

   const changeMes = (e) => {
      setTempMes(e.target.value);
   };

   const sendMessage = async (e) => {
      if (document.getElementById('input-message').value == '') {
         return;
      }
      try {
         const res = await postData(
            getMessageConver + `/${idConver}`,
            {
               type: 'text',
               content: tempMes,
            },
            localStorage.getItem('accessToken'),
         );
         if (res.data.status == 1) {
            await setMessage((list) => [
               ...list,
               {
                  RECEIVE_USER_ID: iduser1,
                  SEND_USER_ID: localStorage.getItem('idUser'),
                  CONTENT: tempMes,
                  createdAt: new Date().toDateString(),
                  TYPE: 'text',
               },
            ]);

            await socket.emit('addMessege', {
               RECEIVE_USER_ID: iduser1,
               SEND_USER_ID: localStorage.getItem('idUser'),
               CONTENT: tempMes,
               createdAt: new Date().toDateString(),
               TYPE: 'text',
            });
            await setTempMes('');
            e.target.value = '';
         }
      } catch (e) {
         console.log(e);
      }
   };

   useEffect(() => {
      try {
         const fetchData = async () => {
            const res3 = await getData(
               getUser + `/${localStorage.getItem('idUser')}`,
               localStorage.getItem('accessToken'),
            );
            setOwner(res3.data.result);

            const res1 = await getData(getMessage + `/${iduser1}?page=0`, localStorage.getItem('accessToken'));
            setMessage(res1.data.result.reverse());
            setIDConver(res1.data.conversationId);

            const res2 = await getData(getUser + `/${iduser1}`, localStorage.getItem('accessToken'));
            setUser(res2.data.result);
         };
         fetchData();
      } catch (e) {
         console.log(e);
      }
   }, [iduser1]);

   useEffect(() => {
      socket.on('messegeToClient', async (data) => {
         console.log(data);
         await setMessage((listMes) => [...listMes, data]);
      });
   }, [socket]);

   return (
      <div className={cx('wrapper')}>
         <div className={cx('sidebar')}>
            <Sidebar user={owner} />
         </div>
         <div className={cx('list-conversation')}>
            <div className={cx('sidebar-list-user')}>
               <SidebarListUserMessage handleClickConversation={handleClickConversation} />
            </div>
            {user != undefined ? (
               <div className={cx('conversation')}>
                  <div className={cx('header-conversation')}>
                     <ImgToProfile src={user.AVATAR} />
                     <div>{user.USERNAME}</div>
                  </div>
                  <ScrollToBottom className={cx('scroll')}>
                     <div className={cx('body-conversation')}>
                        <button onClick={handleLoadMore}>Load more</button>
                        {message != undefined
                           ? message.map((mes) => {
                                if (mes.SEND_USER_ID == iduser1)
                                   return (
                                      <div className={cx('container-message')}>
                                         <div className={cx('orthermessage')}>
                                            <OrtherMessage mes={mes} />
                                         </div>
                                      </div>
                                   );
                                else if (mes.SEND_USER_ID == localStorage.getItem('idUser'))
                                   return (
                                      <div className={cx('container-message')}>
                                         <div className={cx('mymessage')}>
                                            <MyMessage mes={mes} />
                                         </div>
                                      </div>
                                   );
                             })
                           : ''}
                     </div>
                  </ScrollToBottom>
                  <div className={cx('footer-conversation')}>
                     <input
                        id="input-message"
                        className={cx('input-message')}
                        placeholder="Message..."
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
                        onChange={changeMes}
                     />
                     {/* <span
                        className={cx('btn-send')}
                        onClick={(e) => {
                           sendMessage(e, tempMessage);
                        }}
                     >
                        Send
                     </span> */}
                     <label for="file">
                        <FontAwesomeIcon className={cx('btn-send-img')} icon={faImage} />
                        <input type="file" hidden id="file" accept="image/png, image/jpeg" onChange={chooseFile} />
                     </label>
                     {Alt && (
                        <div>
                           <FontAwesomeIcon className={cx('btn-send')} icon={faPaperPlane} onClick={sendImg} />
                        </div>
                     )}
                  </div>
               </div>
            ) : (
               ''
            )}
         </div>
      </div>
   );
}

export default MessageUser;
