import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import PrivateRoutes from './utils/PrivateRoute';

import { AdminLayout, DefaultLayout } from './components/Layout';
import './assets/fontawesome/css/all.min.css';
import './assets/bootstrap-5.0.2-dist/css/bootstrap.min.css';
import { useSetRecoilState } from 'recoil';
import { userState } from './store/user.atom';
import { cartState } from './store/cart.atom';
import { productViewedState } from './store/product.atom';
function App() {
    const setUser = useSetRecoilState(userState);
    const setCarts = useSetRecoilState(cartState);
    const setProductViewed = useSetRecoilState(productViewedState);
    useEffect(() => {
        async function getCart() {
            try {
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                setCarts(cart);
            } catch (error) {
                console.log(error);
            }
        }
        async function getUser() {
            try {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                setUser(user);
            } catch (error) {
                console.log(error);
            }
        }
        async function getProductViewed() {
            try {
                const listProductViewed = await JSON.parse(localStorage.getItem('productViewed') || '[]');
                setProductViewed(listProductViewed);
            } catch (err) {
                console.log(err);
            }
        }
        getCart();
        getUser();
        getProductViewed();
    }, []);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index): any => {
                        let Layout: any = DefaultLayout;
                        if (route.layout !== undefined) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            ></Route>
                        );
                    })}
                    <Route element={<PrivateRoutes />}>
                        {privateRoutes.map((route, index): any => {
                            let Layout: any = AdminLayout;
                            const LayoutTmp = route.layout;
                            if (LayoutTmp) {
                                Layout = LayoutTmp;
                            } else if (LayoutTmp === null) {
                                Layout = Fragment;
                            }
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                ></Route>
                            );
                        })}
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
