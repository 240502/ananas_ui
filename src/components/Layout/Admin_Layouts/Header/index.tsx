import { Link } from 'react-router-dom';
import '../../../../assets/css/Admin/header.css';
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue, useSetRecoilState } from 'recoil';
import { cartState, infoValue } from '../../../../store/cart.atom';
import { memo, useEffect } from 'react';
import { userState, userValue } from '../../../../store/user.atom';

function Header() {
    const userInfo = useRecoilValue(userValue);
    const info = useRecoilValue(infoValue);

    return <header></header>;
}

export default memo(Header);
