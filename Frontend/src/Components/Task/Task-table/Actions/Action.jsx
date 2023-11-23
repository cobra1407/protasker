import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import './Action.css';
import React, {useContext, useState} from "react";
import ConfirmModal from "../../../Modals/ConfirmDelete/ConfirmModal";
import AddTaskModal from "../../../Modals/AddTask/AddTaskModal";
import {variables} from "../../../../Constante/constantes";
import {TasksContext} from "../../../../Context/TasksContext";

const Action = ({task, onDelete}) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [taskData, setTaskData] = useState(null);
    const {getTasks} = useContext(TasksContext)
    const handleConfirmation = () => {
        onDelete(task.id);
        setShowDeleteModal(false);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleDelete = () =>
    {
        setShowDeleteModal(true);
    }

    const handleEdit = () =>
    {
        setShowEditModal(true);
    }

    const handleSave = async () =>
    {
        const queryParams = new URLSearchParams({
            taskId: taskData.id,
            userId: taskData.userId,
            libelle: taskData.libelle,
            status: taskData.status
        });

        try {
            const response = await fetch(variables.API_URL + 'tasks/updateTask?' + queryParams.toString(), {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error("Erreur pendant la mise à jour de la tâche");
            }
            setShowEditModal(false);
            getTasks()
        } catch (error) {
            console.error("Une erreur s'est produit pendant la mise à jour de la tâche", error);
        }
    }

    return (
        <div>
            <FontAwesomeIcon icon={faPencil} className="edit" onClick={handleEdit}/>
            <AddTaskModal
                show={showEditModal}
                title="Modification d'une tâche"
                cancelContent="Annuler"
                saveContent="Modifier"
                onHide={handleCloseEditModal}
                handleSave={handleSave}
                setTaskData={(data) => setTaskData(data)}
                task={task}
            />
            <FontAwesomeIcon icon={faTrash} className="delete" onClick={handleDelete}/>
            <ConfirmModal
                show={showDeleteModal}
                title="Suppression d'une tâche"
                content={
                    <>
                    Vous êtes sur le point de supprimer une tâche.
                    <br />
                    Êtes-vous sûr de vouloir procéder à la suppression ?
                    </>
                }
                onConfirm={handleConfirmation}
                onHide={handleCloseDeleteModal}
            />
        </div>
    );
};

export default Action;