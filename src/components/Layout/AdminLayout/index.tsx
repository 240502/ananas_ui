import Header from './Header';
import { Sidebar } from './Sidebar';
import Toast from './Toast';
function AdminLayout({ children }: any) {
    return (
        <>
            <Header />
            <div className="app-container">
                <Sidebar />
                {children}
            </div>
            <Toast />
        </>
    );
}

export default AdminLayout;
