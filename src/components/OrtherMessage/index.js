import classNames from 'classnames/bind';
import styles from './OrtherMessage.module.scss';

const cx = classNames.bind(styles);

function OrtherMessage({ mes }) {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('message')}>
            <div>{mes.MESSAGE}</div>
            <div>{mes.CREATED_AT}</div>
         </div>
      </div>
   );
}

export default OrtherMessage;
