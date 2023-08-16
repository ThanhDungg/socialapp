import { useContext, useState } from 'react';
import Profile from '../../Layout/Profile';
import FormLogOut from '../../Layout/components/FormLogOut';
import { useNavigate } from 'react-router-dom';
import ChangePassword from '../../Layout/components/ChangePassword';
import EditProfile from '../../Layout/components/EditProfile';
import { SocketContext } from '../../App';
import StatusPost from '../../Layout/components/StatusPost';
import Loading from '../../Layout/components/Loading';

function ProfilePage() {
   const socket = useContext(SocketContext);
   const navigate = useNavigate();

   const [loading, setLoading] = useState(false);

   const [showLogout, setShowLogout] = useState(false);
   const [showChangePassword, setShowChangePassword] = useState(false);
   const [showEditProfile, setShowEditProfile] = useState(false);
   const [showStatusPost, setShowStatusPost] = useState(false);
   const [listComment, setListComment] = useState([]);
   const [status, setStatus] = useState([]);

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

   const handleChangePassword = () => {
      alert('Success');
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

   return (
      <div>
         <Profile
            setShowLogout={setShowLogout}
            setShowStatusPost={setShowStatusPost}
            setListComment={setListComment}
            setStatus={setStatus}
         />
         {showStatusPost && (
            <StatusPost status={status} setShowStatusPost={setShowStatusPost} listComment={listComment} />
         )}
         {showLogout && (
            <FormLogOut
               handleShowChangePassword={handleShowChangePassword}
               handleCancel={handleCancel}
               handleLogOut={handleLogOut}
               handleShowEditProfile={handleShowEditProfile}
            />
         )}
         {showChangePassword && (
            <ChangePassword
               handleCancelChangePassword={handleCancelChangePassword}
               handleChangePassword={handleChangePassword}
            />
         )}
         {showEditProfile && (
            <EditProfile
               handleEditProfile={handleEditProfile}
               handleCancelEditProfile={handleCancelEditProfile}
               setLoading={setLoading}
            />
         )}

         {loading && <Loading />}
      </div>
   );
}

export default ProfilePage;
