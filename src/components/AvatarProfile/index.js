import classNames from 'classnames/bind';
import styles from './AvatarProfile.module.scss';

const cx = classNames.bind(styles);

function AvatarProfile({ img }) {
   return <img className={cx('img-profile')} src={img} />;
}

export default AvatarProfile;
