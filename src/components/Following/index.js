import classNames from 'classnames/bind';
import styles from './Following.module.scss';

const cx = classNames.bind(styles);

function Following() {
   return <div className={cx('btn')}>Follow</div>;
}

export default Following;
