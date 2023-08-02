import classNames from 'classnames/bind';
import styles from './BtnNextPrev.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function BtnNextPrev({ handleNext, handlePrev }) {
   return (
      <div className={cx('btn-next-prev')}>
         <FontAwesomeIcon className={cx('btn-prev')} icon={faAngleLeft} onClick={handlePrev} />
         <FontAwesomeIcon className={cx('btn-next')} icon={faAngleRight} onClick={handleNext} />
      </div>
   );
}

export default BtnNextPrev;
