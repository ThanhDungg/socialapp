import classNames from 'classnames/bind';
import styles from './ImgToProfile.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ImgToProfile({ src, toLink }) {
   return (
      <Link className={cx('link')} to={toLink}>
         <img className={cx('img')} src={src} />
      </Link>
   );
}

export default ImgToProfile;
