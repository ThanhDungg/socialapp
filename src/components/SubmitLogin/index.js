import classNames from 'classnames/bind';
import styles from './SubmitLogin.module.scss';

const cx = classNames.bind(styles);

function SubmitLogin({ onClickSubmit, text = 'Login' }) {
   return (
      <button className={cx('wrapper')} onClick={onClickSubmit}>
         {text}
      </button>
   );
}

export default SubmitLogin;
