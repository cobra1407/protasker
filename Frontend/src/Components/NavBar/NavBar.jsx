// Navbar.js
import React from 'react';
import './NavBar.css';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <div>
                <NavLink to={'/tableau-de-bord'}>
                <h1>ProTasker</h1>
                </NavLink>
            </div>
            <div>
                <ul>
                    <li>
                        <NavLink to={'/tableau-de-bord'}>
                            Tableau de bord
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/taches'}>
                            Tâches
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
