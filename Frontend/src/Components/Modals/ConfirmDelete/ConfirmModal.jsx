import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoWarningOutline } from "react-icons/io5";
import './ConfirmModal.css';

const ConfirmModal = ({ show, title, content, onConfirm, onHide}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Body>
                <div className={"icon"}>
                    <IoWarningOutline/>
                </div>
                <h3 className={"title"}>{title}</h3>
                <div className={"content"}>
                    <p>{content}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Annuler</Button>
                <Button variant="danger" onClick={onConfirm}>Supprimer</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
