import classNames from 'classnames/bind';
import styles from './ViewAllCmt.module.scss';

const cx = classNames.bind(styles);

function ViewAllCmt({ totalCmt }) {
   return <div className={cx('all-cmt')}>View all {totalCmt} comments</div>;
}

export default ViewAllCmt;
