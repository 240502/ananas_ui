import React, { Fragment } from 'react';
import Header from './Header';

const LoginLayout = ({ children }: any) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
};
export default LoginLayout;
