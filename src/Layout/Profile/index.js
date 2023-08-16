import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Sidebar from '../components/Sidebar';
import AvatarProfile from '../../components/AvatarProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faTableCells } from '@fortawesome/free-solid-svg-icons';
import { img } from '../../config';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getData } from '../../config/fetchData';
import { follow, getComment, getUser, getUserPost, unfollow } from '../../config/configs';
import { SocketContext } from '../../App';

const cx = classNames.bind(styles);

function Profile({ setShowLogout, setShowStatusPost, setStatus, setListComment }) {
   const navigate = useNavigate();
   const socket = useContext(SocketContext);
   const { id } = useParams();

   const [user, setUser] = useState({});
   const [owner, setOwner] = useState({});
   const [listPost, setListPost] = useState([]);
   const [following, setFollowing] = useState(0);

   const handleFollow = async () => {
      try {
         const res = await getData(follow + `/${id}`, localStorage.getItem('accessToken'));
         if (res.data.status == 1) {
            setFollowing(1);
            socket.emit('follow', user);
         }
      } catch (e) {
         console.log(e);
      }
   };

   const handleUnFollow = async () => {
      try {
         const res = await getData(unfollow + `/${id}`, localStorage.getItem('accessToken'));
         console.log(res);
         if (res.data.status == 1) {
            setFollowing(0);
         }
      } catch (e) {
         console.log(e);
      }
   };

   const handleMessage = async () => {
      await navigate(`/message/${id}`);
   };

   useEffect(() => {
      try {
         const fetchData = async () => {
            const res = await getData(getUser + `/${id}`, localStorage.getItem('accessToken'));
            setFollowing(res.data.result.ISFOLLOWED);
            setUser(res.data.result);
            console.log(res.data.result);
            const res3 = await getData(
               getUser + `/${localStorage.getItem('idUser')}`,
               localStorage.getItem('accessToken'),
            );
            setOwner(res3.data.result);
            const res2 = await getData(getUserPost + `/${id}`, localStorage.getItem('accessToken'));
            setListPost(res2.data.result);
            console.log(res2);
         };
         fetchData();
      } catch (e) {
         console.log(e);
      }
   }, [id]);

   return (
      <div className={cx('wrapper')}>
         <Sidebar user={owner} />
         <div className={cx('place-profile')}>
            <div className={cx('header-profile')}>
               <AvatarProfile img={user.AVATAR} />
            </div>
            <div className={cx('container-profile')}>
               <div className={cx('first-header')}>
                  <div className={cx('user-name')}>{user.USERNAME}</div>
                  {id == localStorage.getItem('idUser') ? (
                     <div className={cx('settings')}>
                        <FontAwesomeIcon
                           icon={faGear}
                           onClick={() => {
                              setShowLogout(true);
                           }}
                        />
                     </div>
                  ) : (
                     <div className={cx('fl-msg')}>
                        {following == 0 ? (
                           <button className={cx('fl')} onClick={handleFollow}>
                              Follow
                           </button>
                        ) : (
                           <button className={cx('flw')} onClick={handleUnFollow}>
                              Following
                           </button>
                        )}
                        <button className={cx('msg')} onClick={handleMessage}>
                           Message
                        </button>
                     </div>
                  )}
               </div>
               <div className={cx('second-header')}>
                  <div className={cx('body-second-header')}>{user.POSTS} Post</div>
                  <div className={cx('body-second-header')}>{user.FOLLOWERS} Followers</div>
                  <div className={cx('body-second-header')}>{user.FOLLOWING} Following</div>
               </div>
               <div className={cx('third-header')}>
                  <div>{user.FULLNAME}</div>
               </div>
            </div>
         </div>
         <div className={cx('post')}>
            <div className={cx('title-post')}>
               <FontAwesomeIcon icon={faTableCells} />
               <span className={cx('title')}>POST</span>
            </div>
            <div className={cx('body-post')}>
               {listPost.map((post) => {
                  return (
                     <img
                        className={cx('img')}
                        src={post.POST_IMAGEs[0].IMAGE}
                        onClick={async () => {
                           try {
                              setStatus(post);
                              setShowStatusPost(true);
                              const res = await getData(getComment + `${post.ID}`, localStorage.getItem('accessToken'));
                              setListComment(res.data.result);
                              console.log(res);
                           } catch (e) {
                              console.log(e);
                           }
                        }}
                     />
                  );
               })}
            </div>
         </div>
      </div>
   );
}

export default Profile;
