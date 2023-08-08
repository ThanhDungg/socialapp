import classNames from 'classnames/bind';
import styles from './Close.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Close({ onClick }) {
   return <FontAwesomeIcon onClick={onClick} className={cx('icon-close')} icon={faClose} />;
}

export default Close;
