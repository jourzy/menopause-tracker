import React from 'react';
import '../styles/Header.css';

const Header = ({ history, isLogged }) => {
    const handleClick = () => {
        history.push('/');
        isLogged(false);
    }

    return (
        <nav>
            <div className='div-header'>
                <div className='header-left'>
                    <h1>Pause.</h1>
                </div>
                <div className='header-right'>
                    <h3>Menopause Symptom Tracker</h3>
                </div>
            </div>
        </nav>
    );
}

export default Header;
