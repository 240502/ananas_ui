import Header from "./Header";

function AdminLayout({children}:any) {
    return ( 
        <div>
            <Header/>
            {children}
        </div>
     );
}

export default AdminLayout;