import classNames from 'classnames/bind';
import styles from './Message.module.scss';
import Sidebar from '../components/Sidebar';
import SidebarListUserMessage from '../components/SidebarListUserMessage';

const cx = classNames.bind(styles);

function Message() {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('sidebar')}>
            <Sidebar />
         </div>
         <div className={cx('list-conversation')}>
            <span className={cx('sidebar-list-user')}>
               <SidebarListUserMessage />
            </span>
         </div>
      </div>
   );
}

export default Message;
