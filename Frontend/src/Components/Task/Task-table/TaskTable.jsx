import './TaskTable.css';
import { variables } from '../../../Constante/constantes';
import StatusTask from '../Status/StatusTask';
import Action from './Actions/Action';
import { useState } from 'react';

const TaskTable = ({ tasks, users, handleDelete}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 9;
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const getUserPicture = (userId) => {
        const user = users.find((user) => user.id === userId);

        if (user && user.photo) {
            return user.photo;
        }

        return variables.DEFAULT_PHOTO;
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const totalPages = Math.ceil(tasks.length / tasksPerPage);
        const maxPagesToShow = 5;
        let startPage, endPage;

        if (totalPages <= maxPagesToShow) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const middlePage = Math.floor(maxPagesToShow / 2);
            if (currentPage <= middlePage) {
                startPage = 1;
                endPage = maxPagesToShow;
            } else if (currentPage + middlePage >= totalPages) {
                startPage = totalPages - maxPagesToShow + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - middlePage;
                endPage = currentPage + middlePage;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li className={`page-item ${i === currentPage ? 'active' : ''}`} key={i}>
                    <a className="page-link" href="#" onClick={() => paginate(i)}>
                        {i}
                    </a>
                </li>
            );
        }

        return pageNumbers;
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={"container-table"}>
            <table className="task-table">
                <thead>
                <tr>
                    <th>Libellé</th>
                    <th>Attribution</th>
                    <th>Statut</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    currentTasks.map( task  =>
                        (
                            <tr key={task.id}>
                                <td>{task.libelle}</td>
                                <td>{getUserPicture(task.utilisateurId) ? (
                                    <img
                                        src={variables.PHOTO + getUserPicture(task.utilisateurId)}
                                        alt={"utilisateur"}
                                        className="user-profile"
                                    />
                                ) : (
                                    <img
                                        src={variables.PHOTO + variables.DEFAULT_PHOTO}
                                        alt={"utilisateur"}
                                        className="user-profile"
                                    />
                                )}</td>
                                <td className="task-status-cell">
                                    <StatusTask statut={task.statut} />
                                </td>
                                <td>
                                    <Action task={task} onDelete={handleDelete}/>
                                </td>
                            </tr>
                        ))
                }
                </tbody>

            </table>
            <div className={"container-pagination"}>
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        </li>
                        {renderPageNumbers()}
                        <li className={`page-item ${currentPage === Math.ceil(tasks.length / tasksPerPage) ? 'disabled' : ''}`}>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default TaskTable;
