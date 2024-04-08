import Header from './Header';
import { Sidebar } from './Sidebar';
import '../../../assets/css/Admin/QuanTri.css'
function AdminLayout({ children }: any) {
    return (
        <div className="app-container">
            <Header />
            <div className="main-form">
                <Sidebar />
                {children}
            </div>
        </div>
    );
}

export default AdminLayout;
