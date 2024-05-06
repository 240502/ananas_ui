import { Outlet, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userValue } from '../store/user.atom';

const PrivateRoutes = () => {
    const userInfo = useRecoilValue(userValue);
    let auth = { token: userInfo.user.token };

    return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
