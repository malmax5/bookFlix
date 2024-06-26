import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header.jsx';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/sessionReducer.js';
import axios from 'axios';
import { server } from '../../serverconf.js';

const HeaderContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const session = useSelector((state) => state.sessionReducer);
    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${server}/auth/jwt/logout`);
            dispatch(logout());
            navigate('/auth');
        } catch (error) {
            console.error('Ошибка при попытке выйти:', error);
        }
    };

    return <Header session={session} handleLogout={handleLogout} />;
};

export default HeaderContainer;
