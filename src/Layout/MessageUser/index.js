import classNames from 'classnames/bind';
import styles from './MessageUser.module.scss';
import Sidebar from '../components/Sidebar';
import SidebarListUserMessage from '../components/SidebarListUserMessage';
import ImgToProfile from '../../components/ImgToProfile';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import OrtherMessage from '../../components/OrtherMessage';
import MyMessage from '../../components/MyMessage';
import ScrollToBottom from 'react-scroll-to-bottom';

const cx = classNames.bind(styles);

function MessageUser() {
   const listMessage = [
      {
         ID: '20237317337766',
         MESSAGE: 'OrtherMessage',
         CREATED_AT: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      },
      {
         ID: '2',
         MESSAGE: 'MyMessage',
         CREATED_AT: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      },
      {
         ID: '20237317337766',
         MESSAGE: 'OrtherMessage',
         CREATED_AT: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      },
      {
         ID: '20237317337766',
         MESSAGE: 'OrtherMessage',
         CREATED_AT: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      },
      {
         ID: '2',
         MESSAGE: 'MyMessage',
         CREATED_AT: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      },
      {
         ID: '2',
         MESSAGE: 'MyMessage',
         CREATED_AT: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      },
      {
         ID: '20237317337766',
         MESSAGE: 'OrtherMessage',
         CREATED_AT: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      },
      {
         ID: '2',
         MESSAGE: 'MyMessage',
         CREATED_AT: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      },
      {
         ID: '2',
         MESSAGE: 'MyMessage',
         CREATED_AT: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      },
      {
         ID: '20237317337766',
         MESSAGE: 'OrtherMessage',
         CREATED_AT: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      },
      {
         ID: '2',
         MESSAGE: 'MyMessage',
         CREATED_AT: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      },
      {
         ID: '20237317337766',
         MESSAGE: 'OrtherMessage',
         CREATED_AT: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      },
      {
         ID: '20237317337766',
         MESSAGE: 'OrtherMessage',
         CREATED_AT: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      },
      {
         ID: '2',
         MESSAGE: 'MyMessage',
         CREATED_AT: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      },
      {
         ID: '2',
         MESSAGE: 'MyMessage',
         CREATED_AT: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      },
      {
         ID: '20237317337766',
         MESSAGE: 'OrtherMessage',
         CREATED_AT: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      },
      {
         ID: '2',
         MESSAGE: 'MyMessage',
         CREATED_AT: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      },
      {
         ID: '2',
         MESSAGE: 'MyMessage',
         CREATED_AT: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      },
   ];

   const [id, setID] = useState('');

   const [user, setUser] = useState({});
   const [message, setMessage] = useState(listMessage);

   const handleClickConversation = async (con) => {
      await setID(con.CONVERSATION.USER_CONVERSATIONs[0].USER_ID);
      await setUser(con);
   };

   const sendMessage = async (e) => {
      await setMessage((list) => [
         ...list,
         {
            ID: 0,
            MESSAGE: e.target.value,
            CREATED_AT: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
         },
      ]);
      e.target.value = '';
   };

   return (
      <div className={cx('wrapper')}>
         <div className={cx('sidebar')}>
            <Sidebar />
         </div>
         <div className={cx('list-conversation')}>
            <div className={cx('sidebar-list-user')}>
               <SidebarListUserMessage handleClickConversation={handleClickConversation} />
            </div>
            {id != 0 ? (
               <div className={cx('conversation')}>
                  <div className={cx('header-conversation')}>
                     <ImgToProfile src={user.CONVERSATION.USER_CONVERSATIONs[0].USER.AVATAR} />
                     <div>{user.CONVERSATION.USER_CONVERSATIONs[0].USER.USERNAME}</div>
                  </div>
                  <ScrollToBottom className={cx('scroll')}>
                     <div className={cx('body-conversation')}>
                        {message.map((mes) => {
                           if (mes.ID == id)
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
                        })}
                     </div>
                  </ScrollToBottom>
                  <div className={cx('footer-conversation')}>
                     <input
                        id="input-message"
                        className={cx('input-message')}
                        placeholder="Message..."
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
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
                        <input type="file" hidden id="file" accept="image/png, image/jpeg" />
                     </label>
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
