import Header from './Header';
import Footer from './Footer';

function DefaultLayout({ children }: any) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default DefaultLayout;
