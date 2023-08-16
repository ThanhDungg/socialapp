import { useContext, useEffect, useState } from 'react';
import Profile from '../../Layout/Profile';
import FormLogOut from '../../Layout/components/FormLogOut';
import { useNavigate } from 'react-router-dom';
import ChangePassword from '../../Layout/components/ChangePassword';
import EditProfile from '../../Layout/components/EditProfile';
import { SocketContext } from '../../App';
import StatusPost from '../../Layout/components/StatusPost';
import Loading from '../../Layout/components/Loading';
import { getData } from '../../config/fetchData';
import { getUser } from '../../config/configs';
import EditAvatar from '../../Layout/components/EditAvatar';

function ProfilePage() {
   const socket = useContext(SocketContext);
   const navigate = useNavigate();

   const [loading, setLoading] = useState(false);

   const [showLogout, setShowLogout] = useState(false);
   const [showChangePassword, setShowChangePassword] = useState(false);
   const [showEditAvatar, setShowEditAvatar] = useState(false);
   const [showEditProfile, setShowEditProfile] = useState(false);
   const [showStatusPost, setShowStatusPost] = useState(false);
   const [listComment, setListComment] = useState([]);
   const [status, setStatus] = useState([]);
   const [user, setUser] = useState();

   const handleCancel = () => {
      setShowLogout(false);
   };

   const handleLogOut = async () => {
      await localStorage.removeItem('accessToken');
      await localStorage.removeItem('idUser');
      await navigate('/');
      await window.location.reload();
      try {
         // await socket.emit('disconnect');
      } catch (e) {
         console.log(e);
      }
   };

   const handleShowChangePassword = () => {
      setShowLogout(false);
      setShowChangePassword(true);
   };

   const handleCancelChangePassword = () => {
      setShowChangePassword(false);
   };

   const handleShowEditProfile = () => {
      setShowLogout(false);
      setShowEditProfile(true);
   };

   const handleCancelEditProfile = () => {
      setShowEditProfile(false);
   };

   const handleEditProfile = () => {
      alert('Thanh cong');
   };

   const handleShowEditAvatar = () => {
      setShowLogout(false);
      setShowEditAvatar(true);
   };

   const handleCancelEditAvatar = () => {
      setShowEditAvatar(false);
   };

   useEffect(() => {
      try {
         const fetchData = async () => {
            const res = await getData(
               getUser + `/${localStorage.getItem('idUser')}`,
               localStorage.getItem('accessToken'),
            );
            if (res.data.result != undefined) {
               setUser(res.data.result);
            }
         };
         fetchData();
      } catch (e) {
         console.log(e);
      }
   }, []);

   return (
      <div>
         <Profile
            setShowLogout={setShowLogout}
            setShowStatusPost={setShowStatusPost}
            setListComment={setListComment}
            setStatus={setStatus}
         />
         {showStatusPost && (
            <StatusPost
               status={status}
               setShowStatusPost={setShowStatusPost}
               listComment={listComment}
               setListComment={setListComment}
               user={user}
            />
         )}
         {showLogout && (
            <FormLogOut
               handleShowChangePassword={handleShowChangePassword}
               handleCancel={handleCancel}
               handleLogOut={handleLogOut}
               handleShowEditProfile={handleShowEditProfile}
               handleShowEditAvatar={handleShowEditAvatar}
            />
         )}
         {showChangePassword && (
            <ChangePassword handleCancelChangePassword={handleCancelChangePassword} setLoading={setLoading} />
         )}
         {showEditProfile && (
            <EditProfile
               handleEditProfile={handleEditProfile}
               handleCancelEditProfile={handleCancelEditProfile}
               setLoading={setLoading}
            />
         )}
         {showEditAvatar && (
            <EditAvatar
               handleEditProfile={handleEditProfile}
               handleCancelEditProfile={handleCancelEditProfile}
               setLoading={setLoading}
               handleCancelEditAvatar={handleCancelEditAvatar}
            />
         )}

         {loading && <Loading />}
      </div>
   );
}

export default ProfilePage;
