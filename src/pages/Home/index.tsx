import { Link } from 'react-router-dom';

import './styles.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className='home-container-titulo'>
                <h4>Desafio Github API</h4>
                <p>DevSuperior - Escola de programação</p>
            </div>
            <Link to="/cepsearch">
                <button className="btn btn-primary btn-lg start-button">Começar</button>
            </Link>
        </div>
    );
}

export default Home;
