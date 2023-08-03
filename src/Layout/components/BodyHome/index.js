import classNames from 'classnames/bind';
import styles from './BodyHome.module.scss';
import ImgToProfile from '../../../components/ImgToProfile';
import { img } from '../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import FormReaction from '../../../components/FormReaction';
import TotalLike from '../../../components/TotalLike';
import Caption from '../../../components/Caption';
import ViewAllCmt from '../../../components/ViewAllCmt';
import InputCmt from '../../../components/InputCmt';
import HeaderStatus from '../../../components/HeaderStatus';
import BodyStatus from '../../../components/BodyStatus';

const cx = classNames.bind(styles);

function BodyHome({ listStatus = [], handleShowCreatePost }) {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('form-post-status')}>
            <ImgToProfile src={img} />
            <button className={cx('btn')} onClick={handleShowCreatePost}>
               Bạn ơi, bạn nghĩ gì thế?
            </button>
         </div>
         <div className={cx('form-all-status')}>
            <div className={cx('all-status')}>
               {listStatus === undefined || listStatus.length == 0
                  ? ''
                  : listStatus.map((status) => {
                       return (
                          <div className={cx('status')}>
                             <HeaderStatus
                                avatar={status.USER.AVATAR}
                                fullname={status.USER.USERNAME}
                                caption={'1d'}
                                children={<FontAwesomeIcon icon={faEllipsis} />}
                             />
                             <BodyStatus status={status} />
                             <div className={cx('cmt-status')}>
                                <div>
                                   <FormReaction />
                                </div>
                                <TotalLike totalLike={parseInt(status.LIKES)} />
                                <Caption name={status.USER.USERNAME} caption={status.CAPTION} />
                                <ViewAllCmt totalCmt={200} />
                                <InputCmt />
                             </div>
                          </div>
                       );
                    })}
            </div>
         </div>
      </div>
   );
}

export default BodyHome;
