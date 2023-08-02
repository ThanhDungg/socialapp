import classNames from 'classnames/bind';
import styles from './InputCmt.module.scss';

const cx = classNames.bind(styles);

function InputCmt() {
   return (
      <div className={cx('input-cmt')}>
         <input className={cx('input')} placeholder="Add a comments" />
      </div>
   );
}

export default InputCmt;
