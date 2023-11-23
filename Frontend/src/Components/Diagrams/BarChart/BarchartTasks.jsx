import React, { useContext, useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts';
import { UsersContext } from '../../../Context/UsersContext';
import { TasksContext } from '../../../Context/TasksContext';

const BarchartTasks = () => {
    const { users } = useContext(UsersContext);
    const { tasks } = useContext(TasksContext);
    const [tasksInProgressByUser, setTasksInProgressByUser] = useState([]);

    useEffect(() => {
        if (Array.isArray(users) && Array.isArray(tasks)) {
            const tasksInProgressByUserArray = [];

            users.forEach(user => {
                const userId = user.id;
                const userFirstName = user.prenom;

                const tasksInProgressForUser = tasks.filter(task => task.statut === 0 && task.utilisateurId === userId);
                const tasksInProgressCount = tasksInProgressForUser.length;

                tasksInProgressByUserArray.push({ userFirstName, tasksInProgressCount });
            });

            setTasksInProgressByUser(tasksInProgressByUserArray);
        }
    }, [tasks, users]);

    const usersArray = tasksInProgressByUser.map(user => user.userFirstName);
    const tasksInProgressArray = tasksInProgressByUser.map(user => user.tasksInProgressCount);

    // Vérifier si les tableaux sont définis et non vides avant de les utiliser
    const shouldDisplayChart = Array.isArray(usersArray) && usersArray.length > 0 && Array.isArray(tasksInProgressArray) && tasksInProgressArray.length > 0;

    return (
        <div>
            {shouldDisplayChart ? (
                <BarChart
                    xAxis={[{ scaleType: 'band', data: usersArray }]}
                    series={[{ data: tasksInProgressArray }]}
                    width={500}
                    height={300}
                />
            ) : (
                <p>Aucune donnée à afficher pour le moment.</p>
            )}
        </div>
    );
};

export default BarchartTasks;
