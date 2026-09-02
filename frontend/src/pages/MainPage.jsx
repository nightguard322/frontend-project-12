import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom'

export default () => {
    return (
        <div className="main-wrapper">
            <Header/>
            <main className="content">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}
