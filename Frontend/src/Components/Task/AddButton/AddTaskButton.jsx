import React, {useContext, useState} from 'react';
import './TaskButton.css';
import AddTaskModal from "../../Modals/AddTask/AddTaskModal";
import {variables} from "../../../Constante/constantes";
import {TasksContext} from "../../../Context/TasksContext";

const AddTaskButton = () => {

    const [showModal , setShowModal] = useState(false);
    const [taskData, setTaskData] = useState(null); // Pour stocker les données du formulaire
    const {getTasks} = useContext(TasksContext);

    const handleShowModal = () =>
    {
        setShowModal(true);
    }

    const handleCloseModal = () =>
    {
        setShowModal(false);
    }

    const handleSave = async () => {
        const queryParams = new URLSearchParams({
            userId: taskData.userId,
            libelle: taskData.libelle,
            status: taskData.status
        });

        try {
            const response = await fetch(variables.API_URL + 'tasks/addtask?' + queryParams.toString(), {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error("Erreur pendant l'ajout de la tâche");
            }
            getTasks();
            setShowModal(false);
        } catch (error) {
            console.error("Une erreur s'est produit pendant l'ajout de la tâche", error);
        }
    };

    return (
        <>
            <button className={"add-button"} onClick={handleShowModal}>Ajouter une tâche</button>
                <AddTaskModal
                    show={showModal}
                    title="Nouvelle tâche"
                    cancelContent="Annuler"
                    saveContent="Ajouter"
                    onHide={handleCloseModal}
                    handleSave={handleSave}
                    setTaskData={(data) => setTaskData(data)}
                />
        </>
    );
};

export default AddTaskButton;