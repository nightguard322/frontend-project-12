import 'bootstrap/dist/css/bootstrap.min.css';

export default () => {
    return (
    <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
            <span className="fs-4">Hexlet chat</span>
        </a>

        <ul className="nav nav-pills">
            <li className="nav-item"><a href="#" className="nav-link active" aria-current="page">Выйти</a></li>
        </ul>
        </header>
    </div>
    
    )
}