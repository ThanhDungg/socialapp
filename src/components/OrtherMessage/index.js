import classNames from 'classnames/bind';
import styles from './OrtherMessage.module.scss';

const cx = classNames.bind(styles);

function OrtherMessage({ mes }) {
   return (
      <div className={cx('wrapper')}>
         {mes.TYPE == 'text' ? (
            <div className={cx('message')}>
               <div className={cx('content')}>{mes.CONTENT}</div>
               <div className={cx('time')}>{new Date(mes.createdAt).toDateString()}</div>
            </div>
         ) : (
            <div className={cx('message')}>
               <img src={mes.CONTENT} className={cx('img')} />
               <div className={cx('time')}>{new Date(mes.createdAt).toDateString()}</div>
            </div>
         )}
      </div>
   );
}

export default OrtherMessage;
