import classNames from 'classnames/bind';
import styles from './Caption.module.scss';

const cx = classNames.bind(styles);

function Caption({ caption, name }) {
   return (
      <div className={cx('caption')}>
         <b>{name}</b> {caption}
      </div>
   );
}

export default Caption;
