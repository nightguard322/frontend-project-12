import 'bootstrap/dist/css/bootstrap.min.css';
import { ExitButton } from '../../src/features/buttons/ExitButton'
import { RegisterButton } from '../features/buttons/RegisterButton';
import { useAuthStore } from '../features/auth/useAuthStore';

export default function Header() {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated)
    return (
        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <span className="fs-4"> chat</span>
                </a>
                {isAuthenticated ? 
                <ExitButton /> 
                :
                <RegisterButton/>
                }
            </header>
        </div>
    );
}