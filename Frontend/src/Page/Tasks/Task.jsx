import React, {useContext} from 'react';
import Header from '../../Components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import './Task.css';
import { variables } from '../../Constante/constantes';
import TaskTable from '../../Components/Task/Task-table/TaskTable';
import {UsersContext} from "../../Context/UsersContext";
import {TasksContext} from "../../Context/TasksContext";

const Task = () => {
    const { tasks, filteredTasks, setFilteredTasks, setTasks} = useContext(TasksContext);
    const { users } = useContext(UsersContext);

    const filterTasks = (event) => {
        const searchTerm = event.target.value;
        const filtered = tasks.filter((task) =>
            task.libelle && task.libelle.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTasks(filtered);
    };

    const handleDelete = async (taskId) =>
    {
        try {
            const response = await fetch(variables.API_URL + `tasks/DeleteTask?taskId=${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de la tâche');
            }

            const updatedTasks = tasks.filter((task) => task.id !== taskId);
            setTasks(updatedTasks);
            setFilteredTasks(updatedTasks);

            console.log('La tâche a été supprimée avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression de la tâche:', error);
        }
    };

    return (
        <div className={'task-container'}>
            <Header filter={filterTasks}/>
            <main>
                {filteredTasks.length > 0 ? (
                    <div className="task-content">
                        <TaskTable tasks={filteredTasks} users={users} handleDelete={handleDelete}/>
                    </div>
                ) : (
                    <div className="no-tasks">
                        <FontAwesomeIcon icon={faListCheck} className="no-tasks-icon"/>
                        <p>Aucune tâche dans la liste</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Task;