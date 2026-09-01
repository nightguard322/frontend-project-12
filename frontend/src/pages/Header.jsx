import 'bootstrap/dist/css/bootstrap.min.css';

export default MainPage = () => {
    return (
    <div classList="container">
        <header classList="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a href="/" classList="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
            <span classList="fs-4">Hexlet chat</span>
        </a>

        <ul classList="nav nav-pills">
            <li classList="nav-item"><a href="#" classList="nav-link active" aria-current="page">Выйти</a></li>
        </ul>
        </header>
    </div>
    
    )
}