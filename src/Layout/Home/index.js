import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Sidebar from '../components/Sidebar';
import BodyHome from '../components/BodyHome';
import Suggested from '../components/Suggested';
import { useContext, useEffect, useState } from 'react';
import { getData } from '../../config/fetchData';
import { home_Url } from '../../config/configs';
import CreatePost from '../components/CreatePost';
import Loading from '../components/Loading';
import { SocketContext } from '../../App';
import StatusPost from '../components/StatusPost';

const cx = classNames.bind(styles);

function Home() {
   const socket = useContext(SocketContext);
   const [isLoading, setIsLoading] = useState(false);
   const [showStatusPost, setShowStatusPost] = useState(false);

   const [showCreatePost, setShowCreatePost] = useState(false);

   const [statusPost, setStatusPost] = useState({});

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

   const [listStatus, setListStatus] = useState([]);
   useEffect(() => {
      const fectdata = async () => {
         const res = await getData(home_Url, localStorage.getItem('accessToken'));
         if (typeof res.data.result === undefined) {
         } else {
            await setListStatus(res.data.result);
         }
      };
      fectdata();
   }, []);

   return (
      <div className={cx('wrapper')}>
         <Sidebar handleCreatePost={handleShowCreatePost} />
         {showCreatePost && <CreatePost handleHiddenCreatePost={handleHiddenCreatePost} setIsLoading={setIsLoading} />}
         <BodyHome
            handleShowCreatePost={handleShowCreatePost}
            socket={socket}
            listStatus={listStatus}
            setStatusPost={setStatusPost}
            setShowStatusPost={setShowStatusPost}
         />
         <Suggested listUser={[]} />
         {showStatusPost && <StatusPost status={statusPost} setShowStatusPost={setShowStatusPost} />}
         {isLoading && <Loading />}
      </div>
   );
}

export default Home;
