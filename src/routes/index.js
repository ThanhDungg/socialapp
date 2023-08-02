import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const publicRoutes = [
   { path: '/', component: LoginPage, Layout: LoginPage },
   { path: '/home', component: HomePage, Layout: HomePage },
   { path: '/register', component: RegisterPage, Layout: RegisterPage },
   { path: '/forgotpassword', component: ForgotPasswordPage, Layout: ForgotPasswordPage },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
