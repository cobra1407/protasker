import React, { createContext, useEffect, useState } from 'react';
import { variables } from '../Constante/constantes';

export const TasksContext = createContext(undefined);

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);

    const getTasks = async () => {
        try {
            const response = await fetch(variables.API_URL + 'tasks/gettasks');
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des tâches');
            }
            const data = await response.json();
            setTasks(data);
            setFilteredTasks(data);
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <TasksContext.Provider value={{ tasks, setTasks, filteredTasks, setFilteredTasks, getTasks}}>
            {children}
        </TasksContext.Provider>
    );
};

