import { Outlet, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userValue } from '../store/user.atom';

const PrivateRoutes = () => {
    const user = JSON.parse(localStorage.getItem('user') || '');
    let auth = { token: user.token };

    return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
