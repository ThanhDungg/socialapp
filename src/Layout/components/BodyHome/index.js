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

function BodyHome({ listStatus = [], like = 2000, handleShowCreatePost }) {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('form-post-status')}>
            <ImgToProfile src={img} />
            <button className={cx('btn')} onClick={handleShowCreatePost}>
               Khang ơi, bạn nghĩ gì thế?
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
                                fullname={status.USER.USERNAME}
                                caption={status.CAPTION}
                                children={<FontAwesomeIcon icon={faEllipsis} />}
                             />
                             <BodyStatus status={status} />
                             <div className={cx('cmt-status')}>
                                <div>
                                   <FormReaction />
                                </div>
                                <TotalLike totalLike={like} />
                                <Caption
                                   name={'Dung'}
                                   caption={
                                      'VIỆT NAM TRONG TÔI LÀ NGÀN KHÚC CÂU CA, CHO TÔI YÊU THƯƠNG TỰ HÀO BIẾT MẤY'
                                   }
                                />
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
