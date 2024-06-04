import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Sidebar } from './Sidebar';

const Default_Layout = ({ children }: any) => {
    return (
        <>
            <Sidebar />
            <div className="main-content">{children}</div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default Default_Layout;
