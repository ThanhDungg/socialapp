import classNames from 'classnames/bind';
import styles from './SidebarListUserMessage.module.scss';
import ImgToProfile from '../../../components/ImgToProfile';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getData } from '../../../config/fetchData';
import { getConversation } from '../../../config/configs';

const cx = classNames.bind(styles);

function SidebarListUserMessage({ handleClickConversation }) {
   // const listConversation = [
   //    {
   //       ID: 1,
   //       USER_NAME: 'thanhdung2k',
   //       AVATAR: 'https://drive.google.com/uc?export=view&id=1ykzTh94lBOt09jupQcdLeG1NflVo5jiq',
   //    },
   //    {
   //       ID: 2,
   //       USER_NAME: 'thanhdung2k1',
   //       AVATAR: 'https://drive.google.com/uc?export=view&id=1ykzTh94lBOt09jupQcdLeG1NflVo5jiq',
   //    },
   //    {
   //       ID: 3,
   //       USER_NAME: 'thanhdung2k2',
   //       AVATAR: 'https://drive.google.com/uc?export=view&id=1ykzTh94lBOt09jupQcdLeG1NflVo5jiq',
   //    },
   //    {
   //       ID: 4,
   //       USER_NAME: 'thanhdung2k3',
   //       AVATAR: 'https://drive.google.com/uc?export=view&id=1ykzTh94lBOt09jupQcdLeG1NflVo5jiq',
   //    },
   //    {
   //       ID: 5,
   //       USER_NAME: 'thanhdung2k4',
   //       AVATAR: 'https://drive.google.com/uc?export=view&id=1ykzTh94lBOt09jupQcdLeG1NflVo5jiq',
   //    },
   // ];

   const [listConversation, setListConversation] = useState([]);

   useEffect(async () => {
      const res = await getData(getConversation, localStorage.getItem('accessToken'));
      await setListConversation(res.data.result);
      console.log(res);
      console.log(listConversation);
   }, []);
   return (
      <div className={cx('wrapper')}>
         <div className={cx('title')}>Message</div>
         <div className={cx('list-conversation')}>
            {listConversation.map((con) => {
               return (
                  <NavLink className={cx('link')}>
                     <div
                        className={cx('conversation')}
                        onClick={() => {
                           handleClickConversation(con);
                        }}
                     >
                        <ImgToProfile src={con.CONVERSATION.USER_CONVERSATIONs[0].USER.AVATAR} />
                        <div className={cx('user-name')}>{con.CONVERSATION.USER_CONVERSATIONs[0].USER.USERNAME}</div>
                     </div>
                  </NavLink>
               );
            })}
         </div>
      </div>
   );
}

export default SidebarListUserMessage;
