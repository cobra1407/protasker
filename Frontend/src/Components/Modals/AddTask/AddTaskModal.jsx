import {useContext, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './AddTaskModal.css';
import {InputGroup} from "react-bootstrap";
import {UsersContext} from "../../../Context/UsersContext";
import {StatusesContext} from "../../../Context/StatusesContext";

function AddTaskModal({title, cancelContent, saveContent, show, onHide, handleSave, setTaskData, task}) {

    const { users } = useContext(UsersContext);
    const statuses = useContext(StatusesContext);


    const [formData, setFormData] = useState({
        id: task ? task.id || null : null,
        libelle: task ? task.libelle || '' : '',
        userId: task ? task.utilisateurId || '' : '',
        status: task ? (task.statut !== undefined ? task.statut : '') : '',
    });

    const [validated, setValidated] = useState(false);

    const initialFormData = {
        id: null,
        libelle: '',
        userId: '',
        status: '',
    };

    const handleLibelleChange = (e) => {
        setFormData({ ...formData, libelle: e.target.value });
    };

    const handleUserChange = (e) => {
        setFormData({ ...formData, userId: e.target.value});
    };

    const handleStatusChange = (e) => {
        setFormData({ ...formData, status: e.target.value });
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        handleSave();
        setFormData(initialFormData);
        setValidated(false);
    };

    useEffect(() => {
        if (task) {
            setFormData({
                id: task.id || null,
                libelle: task.libelle || '',
                userId: task.utilisateurId || '',
                status: task ? (task.statut !== undefined ? task.statut : '') : '',
            });
        } else {
            setFormData({
                id: null,
                libelle: '',
                userId: '',
                status: '',
            });
        }
    }, [task]);

    useEffect(() => {
        setTaskData(formData);
    }, [formData, setTaskData]);

    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title><h3 className={"title"}>{title}</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="task-libelle">
                            <Form.Label>Libellé de la tâche</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    value={formData.libelle}
                                    onChange={handleLibelleChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Veuillez saisir un libellé de tâche.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="assigned-user">
                            <Form.Label>Attribution</Form.Label>
                            <Form.Select value={formData.userId} onChange={handleUserChange}>
                                <option value=""></option>
                                {users && users.map(user => (
                                    <option key={user.id} value={user.id}>{user.prenom + " " + user.nom}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="task-status">
                            <Form.Label>Statut</Form.Label>
                            <Form.Select value={formData.status} onChange={handleStatusChange} required>
                                <option value=""></option>
                                {statuses && statuses.map(status => (
                                    <option key={status.id} value={status.id}>{status.value}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Veuillez sélectionner un statut.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={onHide}>
                                {cancelContent}
                            </Button>
                            <Button className={"save-button"} type={"submit"}>
                                {saveContent}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddTaskModal;