import React, {useContext, useState, useEffect, useRef} from 'react';
import SearchBar from '../SearchBar/SearchBar';
import AddTaskButton from '../Task/AddButton/AddTaskButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel as farFileExcel } from '@fortawesome/free-regular-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { StatusesContext } from '../../Context/StatusesContext';
import { TasksContext } from '../../Context/TasksContext';
import {UsersContext} from "../../Context/UsersContext";
import {variables} from "../../Constante/constantes";

const Header = ({ filter }) => {
    const [showFilters, setShowFilters] = useState(false);
    const statuses = useContext(StatusesContext);
    const { tasks, filteredTasks, setFilteredTasks } = useContext(TasksContext);
    const { users } = useContext(UsersContext);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const filterContainerRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (filterContainerRef.current && !filterContainerRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    // Filtrer les tâches en fonction des critères sélectionnés
    useEffect(() => {
        filterTasks();
    }, [selectedUser, selectedStatus]);

    const resetFilters = () => {
        setShowFilters(false);
        setSelectedUser('');
        setSelectedStatus('');
    };

    const filterTasks = () => {
        let filtered = tasks;

        if (selectedUser !== '') {
            filtered = filtered.filter((task) => task.utilisateurId === parseInt(selectedUser, 10));
        }

        if (selectedStatus !== '') {
            filtered = filtered.filter((task) => task.statut === parseInt(selectedStatus, 10));
        }

        setFilteredTasks(filtered);
    };

    const handleExportExcel = async () => {
        try {
            const response = await fetch(variables.API_URL + "Excel/ExportExcel", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filteredTasks)
            });

            if (response.ok) {
                // Si la réponse est réussie, récupère le fichier Excel téléchargé
                const blob = await response.blob();
                // Crée un lien de téléchargement et déclenche le téléchargement du fichier Excel
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'export-tâches.xlsx');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            } else {
                throw new Error("Erreur lors de l'export des données vers Excel");
            }
        } catch (error) {
            console.error("Une erreur s'est produite pendant l'export vers Excel", error);
        }
    };

    return (
        <div className={'container-head'}>
            <AddTaskButton />
            <div>
                <SearchBar placeholder="Recherche sur le libellé" filter={filter} />
            </div>
            <FontAwesomeIcon icon={farFileExcel} className="excel-icon" onClick={handleExportExcel} />
            <div className="filter-container" ref={filterContainerRef}>
                <FontAwesomeIcon
                    icon={faFilter}
                    className={'filter-icon'}
                    onClick={() => setShowFilters(!showFilters)}
                />
                {showFilters && (
                    <div className="filter-dropdown">
                        <h1 className={'select-title'}>Attribution</h1>
                        <Form.Select
                            onChange={(e) => setSelectedUser(e.target.value)}
                            value={selectedUser}
                        >
                            <option value="">Sélectionnez un utilisateur</option>{' '}
                            {users &&
                                users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.prenom + " " + user.nom}
                                    </option>
                                ))}
                        </Form.Select>
                        <h1 className={'select-title'}>Statut</h1>
                        <Form.Select
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            value={selectedStatus}
                        >
                            <option value="">Sélectionnez un statut</option>{' '}

                            {statuses &&
                                statuses.map((status) => (
                                    <option key={status.id} value={status.id}>
                                        {status.value}
                                    </option>
                                ))}
                        </Form.Select>

                        {/* Bouton pour réinitialiser les filtres */}
                        <Button onClick={resetFilters} className={'reset-button'}>
                            Réinitialiser
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
