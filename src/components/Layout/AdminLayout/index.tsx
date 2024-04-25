import Header from './Header';
import { Sidebar } from './Sidebar';
function AdminLayout({ children }: any) {
    return (
        <>
            <Header />
            <div className="app-container">
                <Sidebar />
                {children}
            </div>
        </>
    );
}

export default AdminLayout;
