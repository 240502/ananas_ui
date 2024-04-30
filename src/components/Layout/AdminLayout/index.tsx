import { ToastContainer } from 'react-toastify';
import Header from './Header';
import { Sidebar } from './Sidebar';
function AdminLayout({ children }: any) {
    return (
        <>
            <Header />
            <div className="app-container">
                <Sidebar />
                <div className="main-content">
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
                </div>
            </div>
        </>
    );
}

export default AdminLayout;
