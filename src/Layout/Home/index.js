import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Sidebar from '../components/Sidebar';
import BodyHome from '../components/BodyHome';
import Suggested from '../components/Suggested';
import { useContext, useEffect, useState } from 'react';
import { getData } from '../../config/fetchData';
import { getUser, home_Url } from '../../config/configs';
import CreatePost from '../components/CreatePost';
import Loading from '../components/Loading';
import { SocketContext } from '../../App';
import StatusPost from '../components/StatusPost';
import SearchHome from '../components/SearchHome';

const cx = classNames.bind(styles);

function Home() {
   const socket = useContext(SocketContext);
   const [isLoading, setIsLoading] = useState(false);
   const [showStatusPost, setShowStatusPost] = useState(false);

   const [showCreatePost, setShowCreatePost] = useState(false);

   const [statusPost, setStatusPost] = useState({});

   const [user, setUser] = useState({});

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

   const [listComment, setListComment] = useState([]);
   const [listStatus, setListStatus] = useState([]);
   useEffect(() => {
      try {
         const fectdata = async () => {
            const res = await getData(home_Url, localStorage.getItem('accessToken'));
            if (typeof res.data.result === undefined) {
            } else {
               await setListStatus(res.data.result);
            }
            const res2 = await getData(
               getUser + `/${localStorage.getItem('idUser')}`,
               localStorage.getItem('accessToken'),
            );
            setUser(res2.data.result);
         };
         fectdata();
      } catch (e) {
         console.log(e);
      }
   }, []);

   return (
      <div className={cx('wrapper')}>
         <Sidebar handleCreatePost={handleShowCreatePost} user={user} />
         {showCreatePost && (
            <CreatePost handleHiddenCreatePost={handleHiddenCreatePost} setIsLoading={setIsLoading} user={user} />
         )}
         <BodyHome
            handleShowCreatePost={handleShowCreatePost}
            socket={socket}
            listStatus={listStatus}
            setStatusPost={setStatusPost}
            setShowStatusPost={setShowStatusPost}
            setListComment={setListComment}
            user={user}
         />

         <Suggested listUser={[]} />
         {showStatusPost && (
            <StatusPost
               status={statusPost}
               setShowStatusPost={setShowStatusPost}
               listComment={listComment}
               setListComment={setListComment}
               user={user}
            />
         )}
         {isLoading && <Loading />}
      </div>
   );
}

export default Home;
