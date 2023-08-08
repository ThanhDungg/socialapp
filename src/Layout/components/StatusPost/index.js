import classNames from 'classnames/bind';
import styles from './StatusPost.module.scss';
import HeaderStatus from '../../../components/HeaderStatus';
import BodyStatus from '../../../components/BodyStatus';
import FormReaction from '../../../components/FormReaction';
import TotalLike from '../../../components/TotalLike';
import Caption from '../../../components/Caption';
import InputCmt from '../../../components/InputCmt';
import Close from '../../../components/Close';
import { useContext } from 'react';
import { SocketContext } from '../../../App';
import ScrollToBottom from 'react-scroll-to-bottom';

const cx = classNames.bind(styles);

function StatusPost({ status, setShowStatusPost }) {
   const socket = useContext(SocketContext);

   return (
      <div className={cx('wrapper')}>
         <Close
            onClick={() => {
               setShowStatusPost(false);
            }}
         />
         <div className={cx('body-status')}>
            <div className={cx('status')}>
               <HeaderStatus avatar={status.USER.AVATAR} fullname={status.USER.USERNAME} caption={'1d'} />
               <BodyStatus status={status} />
               <div>
                  <FormReaction socket={socket} post={status} />
               </div>
               <TotalLike Like={status.LIKES} id={status.ID} />
               <Caption name={status.USER.USERNAME} caption={status.CAPTION} />
            </div>
            <div className={cx('footer-status')}>
               <div className={cx('cmt-status')}>
                  <ScrollToBottom>
                     <div className={cx('comment')}>abc</div>
                  </ScrollToBottom>
                  <div className={cx('input-cmt')}>
                     <InputCmt />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default StatusPost;
