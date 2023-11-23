import React, { createContext, useEffect, useState } from 'react';
import { variables } from '../Constante/constantes';

export const UsersContext = createContext(undefined);

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(variables.API_URL + 'users/getUsers');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des utilisateurs');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Erreur:', error);
            }
        };
        fetchUsers();
    }, []);

    const GetUserById = (userId) => {
        return users.find(user => user.id === userId);
    };

    return (
        <UsersContext.Provider value={{users , GetUserById}}>
            {children}
        </UsersContext.Provider>
    );
};