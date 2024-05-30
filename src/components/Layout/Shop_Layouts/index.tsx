import Header from './Header';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';

function DefaultLayout({ children }: any) {
    return (
        <div>
            <Header />
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
            {children}
            <Footer />
        </div>
    );
}

export default DefaultLayout;
