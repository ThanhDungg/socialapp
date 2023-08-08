import classNames from 'classnames/bind';
import styles from './AvatarProfile.module.scss';
import { img } from '../../config';

const cx = classNames.bind(styles);

function AvatarProfile() {
   return <img className={cx('img-profile')} src={img} />;
}

export default AvatarProfile;
