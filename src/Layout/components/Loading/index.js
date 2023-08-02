import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Loading() {
   return (
      <div className={cx('wrapper')}>
         <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
      </div>
   );
}

export default Loading;
