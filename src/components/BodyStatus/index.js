import classNames from 'classnames/bind';
import styles from './BodyStatus.module.scss';

import BtnNextPrev from '../BtnNextPrev';
import { useState } from 'react';

const cx = classNames.bind(styles);

function BodyStatus({ status }) {
   const [indexImg, setIndexImg] = useState(0);

   const handlePrev = () => {
      indexImg <= 0 ? setIndexImg(0) : setIndexImg(indexImg - 1);
   };

   const handleNext = () => {
      indexImg >= status.POST_IMAGEs.length - 1
         ? setIndexImg(status.POST_IMAGEs.length - 1)
         : setIndexImg(indexImg + 1);
   };

   return (
      <div className={cx('body-status')}>
         <div className={cx('img-status')}>
            {/* {status.POST_IMAGEs.map((i) => {
          return <img className={cx('img')} src={i.IMAGE} />;
       })} */}
            {<img className={cx('img')} src={status.POST_IMAGEs[indexImg].IMAGE} />}
            <BtnNextPrev handlePrev={handlePrev} handleNext={handleNext} />
         </div>
      </div>
   );
}

export default BodyStatus;
