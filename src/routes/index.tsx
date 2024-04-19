import Dashboard from '../pages/Admin/Dashboard';
import Home from '../pages/Shop/Home';
import Product from '../pages/Shop/Product';
import { AdminLayout } from '../components/Layout';
import Login from '../pages/Shop/Login';
import {
    CART_PATH,
    DETAIL_PATH,
    HOME_PATH,
    LOGIN_PATH,
    PRODUCT_PATH,
    ADMIN_PATH,
    PRODUCT_GENDER_PATH,
    SHIPPING_INFORMATION_PATTH,
} from './paths';
import Cart from '../pages/Shop/Cart';
import ProductDetail from '../pages/Shop/ProductDetail';
import path from 'path';
import { LoginLayout } from '../components/Layout/LoginLayout/index';
import { ShippingInformation } from '../pages/Shop/ShippingInformation';
export const publicRoutes = [
    { path: HOME_PATH, component: Home, layout: undefined },
    { path: PRODUCT_PATH, component: Product, layout: undefined },
    { path: LOGIN_PATH, component: Login, layout: undefined },
    { path: CART_PATH, component: Cart, layout: undefined },
    { path: DETAIL_PATH, component: ProductDetail, layout: undefined },
    { path: PRODUCT_GENDER_PATH, component: Product, layout: undefined },
    { path: SHIPPING_INFORMATION_PATTH, component: ShippingInformation, layout: undefined },

    { path: LOGIN_PATH, component: Login, layout: LoginLayout },
];

export const privateRoutes = [
    { path: '/admin', component: Home, layout: undefined },
    { path: '/dashboard', component: Dashboard, layout: AdminLayout },
];
