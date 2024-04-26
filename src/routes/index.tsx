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
    THANKYOU_PATH,
    SEARCH_ORDER_PATH,
    SEARCH_PRODUCT_PATH,
    TRACKING_ORDER_PATH,
    UPDATE_CATEGORY_PATH,
    CREATE_CATEGORY_PATH,
    CATEGORY_PATH,
    PRODUCT_ADMIN_PATH,
    CREATE_PRODUCT_PATH,
} from './paths';
import Cart from '../pages/Shop/Cart';
import ProductDetail from '../pages/Shop/ProductDetail';
import { LoginLayout } from '../components/Layout/LoginLayout/index';
import { ShippingInformation } from '../pages/Shop/ShippingInformation';
import { ThankYou } from '../pages/Shop/ThankYou';
import ThankYouLayout from '../components/Layout/ThankYouLayout';
import { SearchOrder } from '../pages/Shop/SearchOrder';
import { SearchProduct } from '../pages/Shop/SearchProduct';
import { TrackingOrder } from '../pages/Shop/TrackingOrder';
import { Category } from '../pages/Admin/Category';
import { AddCategory } from '../pages/Admin/Category/AddCategory';
import { UpdateCategory } from '../pages/Admin/Category/UpdateCategory';
import { ProductAdmin } from '../pages/Admin/Product';
import { AddProduct } from '../pages/Admin/Product/AddProduct';
export const publicRoutes = [
    { path: HOME_PATH, component: Home, layout: undefined },
    { path: PRODUCT_PATH, component: Product, layout: undefined },
    { path: LOGIN_PATH, component: Login, layout: undefined },
    { path: CART_PATH, component: Cart, layout: undefined },
    { path: DETAIL_PATH, component: ProductDetail, layout: undefined },
    { path: PRODUCT_GENDER_PATH, component: Product, layout: undefined },
    { path: SHIPPING_INFORMATION_PATTH, component: ShippingInformation, layout: undefined },
    { path: LOGIN_PATH, component: Login, layout: LoginLayout },
    { path: THANKYOU_PATH, component: ThankYou, layout: ThankYouLayout },
    { path: SEARCH_ORDER_PATH, component: SearchOrder, layout: undefined },
    { path: SEARCH_PRODUCT_PATH, component: SearchProduct, layout: undefined },
    { path: TRACKING_ORDER_PATH, component: TrackingOrder, layout: undefined },
];

export const privateRoutes = [
    { path: '/admin', component: Home, layout: undefined },
    { path: '/dashboard', component: Dashboard, layout: AdminLayout },
    { path: CATEGORY_PATH, component: Category, layout: AdminLayout },
    { path: CREATE_CATEGORY_PATH, component: AddCategory, layout: AdminLayout },
    { path: UPDATE_CATEGORY_PATH, component: UpdateCategory, layout: AdminLayout },
    { path: PRODUCT_ADMIN_PATH, component: ProductAdmin, layout: AdminLayout },
    { path: CREATE_PRODUCT_PATH, component: AddProduct, layout: AdminLayout },
];
