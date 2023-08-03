import classNames from 'classnames/bind';
import styles from './MyMessage.module.scss';

const cx = classNames.bind(styles);

function MyMessage({ mes }) {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('message')}>
            <div>{mes.MESSAGE}</div>
            <div>{mes.CREATED_AT}</div>
         </div>
      </div>
   );
}

export default MyMessage;
