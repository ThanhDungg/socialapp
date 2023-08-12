import classNames from 'classnames/bind';
import styles from './InputCmt.module.scss';

const cx = classNames.bind(styles);

function InputCmt({ onKeyPress, id }) {
   return (
      <div className={cx('input-cmt')}>
         <input
            id={`comment-${id}`}
            className={cx('input')}
            placeholder="Add a comments"
            onKeyPress={(e) => e.key === 'Enter' && onKeyPress()}
         />
      </div>
   );
}

export default InputCmt;
