import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Sidebar from '../components/Sidebar';
import BodyHome from '../components/BodyHome';
import Suggested from '../components/Suggested';
import { useEffect, useState } from 'react';
import { getData } from '../../config/fetchData';
import { home_Url } from '../../config/configs';
import CreatePost from '../components/CreatePost';
import Loading from '../components/Loading';

const cx = classNames.bind(styles);

function Home() {
   const [isLoading, setIsLoading] = useState(false);

   const tempObject = {
      ID: '',
      CAPTION: '',
      LIKES: '',
      createdAt: '',
      POST_IMAGEs: [
         {
            IMAGE: '',
         },
         {
            IMAGE: '',
         },
      ],
      USER: {
         ID: '',
         USERNAME: '',
         FULLNAME: '',
         AVATAR: '',
         FOLLOWING: '',
         FOLLOWERS: '',
         POSTS: '',
      },
   };

   const [listStatus, setListStatus] = useState([]);
   const [showCreatePost, setShowCreatePost] = useState(false);

   useEffect(() => {
      const fectdata = async () => {
         const res = await getData(home_Url, localStorage.getItem('accessToken'));
         console.log(res.data.result);
         setListStatus(res.data.result);
      };
      fectdata();
   }, []);

   const handleShowCreatePost = () => {
      setShowCreatePost(true);
   };

   const handleHiddenCreatePost = () => {
      if (!window.confirm('Bạn muốn rời khỏi?')) {
         return;
      } else {
         setShowCreatePost(false);
      }
   };

   return (
      <div className={cx('wrapper')}>
         <Sidebar handleCreatePost={handleShowCreatePost} />
         {showCreatePost && <CreatePost handleHiddenCreatePost={handleHiddenCreatePost} setIsLoading={setIsLoading} />}
         <BodyHome listStatus={listStatus} handleShowCreatePost={handleShowCreatePost} />
         <Suggested listUser={listStatus} />
         {isLoading && <Loading />}
      </div>
   );
}

export default Home;
