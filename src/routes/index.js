import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import MessagePage from '../pages/MessagePage';
import MessageUserPage from '../pages/MessageUserPage';
import ProfilePage from '../pages/ProfilePage';
import RegisterPage from '../pages/RegisterPage';

const publicRoutes = [
   { path: '/', component: LoginPage, Layout: LoginPage },
   { path: '/home', component: HomePage, Layout: HomePage },
   { path: '/register', component: RegisterPage, Layout: RegisterPage },
   { path: '/forgotpassword', component: ForgotPasswordPage, Layout: ForgotPasswordPage },
   { path: '/message', component: MessagePage, Layout: MessagePage },
   { path: '/message/:idconver1/:iduser1', component: MessageUserPage, Layout: MessageUserPage },
   { path: '/profile/:id', component: ProfilePage, Layout: ProfilePage },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
