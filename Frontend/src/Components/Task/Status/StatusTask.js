import React from 'react';
import './StatusTask.css';

/*
La valeur « 0 » correspond au statut « En cours ».
La valeur « 1 » correspond au statut « Bloqué ».
La valeur « 2 » correspond au statut « Terminé ».
 */

const StatusTask = ({ statut }) => {
    let spanStatus;

    switch (statut) {
        case 0:
            spanStatus = <span className={"in-progress"}>En cours</span>;
            break;
        case 1:
            spanStatus = <span className={"blocked"}>Bloqué</span>;
            break;
        case 2:
            spanStatus = <span className={"done"}>Terminé</span>;
            break;
        default:
            spanStatus = <span>Statut inconnu</span>;
            break;
    }

    return (
        <div>
            {spanStatus}
        </div>
    );
};

export default StatusTask;