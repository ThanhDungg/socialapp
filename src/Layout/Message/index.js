import classNames from 'classnames/bind';
import styles from './Message.module.scss';
import Sidebar from '../components/Sidebar';
import SidebarListUserMessage from '../components/SidebarListUserMessage';
import ImgToProfile from '../../components/ImgToProfile';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import OrtherMessage from '../../components/OrtherMessage';
import MyMessage from '../../components/MyMessage';
import ScrollToBottom from 'react-scroll-to-bottom';
import { getData, postData } from '../../config/fetchData';
import { getMessage, getUser } from '../../config/configs';
import { SocketContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Message() {
   const navigate = useNavigate();

   const [idConver, setIDConver] = useState('');
   const [owner, setOwner] = useState({});

   const [user, setUser] = useState({});
   const [page, setPage] = useState(0);
   // var page = 0;
   const [offset, setOffset] = useState(0);
   const [message, setMessage] = useState([]);

   const handleClickConversation = async (con) => {
      navigate(`/message/${con}`);
   };

   useEffect(() => {
      const fetchData = async () => {
         const res3 = await getData(getUser + `/${localStorage.getItem('idUser')}`, '');
         setOwner(res3.data.result);
      };
      fetchData();
   }, []);

   return (
      <div className={cx('wrapper')}>
         <div className={cx('sidebar')}>
            <Sidebar user={owner} />
         </div>
         <div className={cx('list-conversation')}>
            <div className={cx('sidebar-list-user')}>
               <SidebarListUserMessage handleClickConversation={handleClickConversation} />
            </div>
            {/* {id != '' ? (
               <div className={cx('conversation')}>
                  <div className={cx('header-conversation')}>
                     <ImgToProfile src={user.CONVERSATION.USER_CONVERSATIONs[0].USER.AVATAR} />
                     <div>{user.CONVERSATION.USER_CONVERSATIONs[0].USER.USERNAME}</div>
                  </div>
                  <ScrollToBottom className={cx('scroll')}>
                     <div className={cx('body-conversation')}>
                        <button onClick={handleLoadMore}>Load more</button>
                        {message.length > 0
                           ? message.map((mes) => {
                                if (mes.SEND_USER_ID == id)
                                   return (
                                      <div className={cx('container-message')}>
                                         <div className={cx('orthermessage')}>
                                            <OrtherMessage mes={mes} />
                                         </div>
                                      </div>
                                   );
                                else
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
                     />
                     <span
                        className={cx('btn-send')}
                        onClick={(e) => {
                           sendMessage(e, tempMessage);
                        }}
                     >
                        Send
                     </span>
                     <label for="file">
                        <FontAwesomeIcon className={cx('btn-send-img')} icon={faImage} />
                        <input type="file" hidden id="file" accept="image/png, image/jpeg" />
                     </label>
                  </div>
               </div>
            ) : (
               ''
            )} */}
         </div>
      </div>
   );
}

export default Message;
