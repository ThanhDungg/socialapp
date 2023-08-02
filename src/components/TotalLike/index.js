import classNames from 'classnames/bind';
import styles from './TotalLike.module.scss';

const cx = classNames.bind(styles);

function TotalLike({ totalLike }) {
   return <div className={cx('total-like')}>{totalLike.toLocaleString()} Like</div>;
}

export default TotalLike;
