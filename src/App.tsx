import React from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import PrivateRoutes from './utils/PrivateRoute';

import { AdminLayout, DefaultLayout } from './components/Layout';
import './assets/fontawesome/css/all.min.css';
import './assets/bootstrap-5.0.2-dist/css/bootstrap.min.css';
function App() {
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
