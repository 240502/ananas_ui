import React from 'react';
import Header from './Header';
import { ToastContainer } from 'react-toastify';
import { Navbar } from 'react-bootstrap';
import { Sidebar } from './Sidebar';

const Default_Layout = ({ children }: any) => {
    return (
        <>
            <Header />
            <main style={{ position: 'relative' }}>
                <Sidebar />
                <div className="main-content">{children}</div>
            </main>

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
