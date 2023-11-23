import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './ProgressBar.css';

const ProgressBarTasks = ({ nbBlockedTasks, nbDoneTasks, nbInProgressTasks }) => {

    const totalTasks = nbBlockedTasks + nbDoneTasks + nbInProgressTasks;


    return (
        <div className={"progress-bar"}>
            <label>En cours</label>
            <ProgressBar variant="info" now={(nbInProgressTasks/totalTasks) * 100}/>
            <label>Bloqué</label>
            <ProgressBar variant="success" now={(nbBlockedTasks/totalTasks) * 100} />
            <label>Terminé</label>
            <ProgressBar variant="warning" now={(nbDoneTasks/totalTasks) * 100} className={""}/>
        </div>
    );
};

export default ProgressBarTasks;