import classNames from 'classnames/bind';
import styles from './InputLogin.module.scss';
const cx = classNames.bind(styles);

function InputLogin({ placehodder, type, onchange, onKeyPress, length = 200 }) {
   return (
      <input
         placeholder={placehodder}
         type={type}
         className={cx('wrapper')}
         onChange={onchange}
         onKeyPress={onKeyPress}
         maxLength={length}
      />
   );
}

export default InputLogin;
