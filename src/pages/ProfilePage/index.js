import { useState } from 'react';
import Profile from '../../Layout/Profile';
import FormLogOut from '../../Layout/components/FormLogOut';
import { useNavigate } from 'react-router-dom';
import ChangePassword from '../../Layout/components/ChangePassword';
import EditProfile from '../../Layout/components/EditProfile';

function ProfilePage() {
   const navigate = useNavigate();
   const [showLogout, setShowLogout] = useState(false);
   const [showChangePassword, setShowChangePassword] = useState(false);
   const [showEditProfile, setShowEditProfile] = useState(false);

   const handleCancel = () => {
      setShowLogout(false);
   };

   const handleLogOut = async () => {
      await localStorage.removeItem('accessToken');
      await navigate('/');
      await window.location.reload();
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
         <Profile setShowLogout={setShowLogout} />
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
            <EditProfile handleEditProfile={handleEditProfile} handleCancelEditProfile={handleCancelEditProfile} />
         )}
      </div>
   );
}

export default ProfilePage;
