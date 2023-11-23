import React, {useContext} from 'react';
import './Dashboard.css';
import {TasksContext} from "../../Context/TasksContext";
import LineChartTasks from "../../Components/Diagrams/LineChart/LineChartTasks";
import DoughnutChart from "../../Components/Diagrams/DoughnutChart/DoughnutChart";
import ProgressBarTasks from "../../Components/Diagrams/ProgressBar/ProgressBarTasks";
import BarchartTasks from "../../Components/Diagrams/BarChart/BarchartTasks";
import {UsersContext} from "../../Context/UsersContext";


const Dashboard = () => {

    const {tasks} = useContext(TasksContext);
    const { GetUserById } = useContext(UsersContext);
    const data = [];

    const nbInProgressTasks = tasks.filter(task => task.statut === 0).length;
    const nbBlockedTasks = tasks.filter(task => task.statut === 1).length;
    const nbDoneTasks = tasks.filter(task => task.statut === 2).length;

    const convertTaskForChart = (tasks) => {
        const tasksByUser = {};

        // Regrouper les tâches par utilisateur et compter les tâches terminées par mois
        tasks.forEach(task => {
            if (task.utilisateurId && task.statut === 2) {
                if (!tasksByUser[task.utilisateurId]) {
                    tasksByUser[task.utilisateurId] = new Array(12).fill(0); // Initialiser un tableau pour chaque utilisateur avec 12 mois
                }
                const month = new Date(task.dateDerniereModification).getMonth();
                tasksByUser[task.utilisateurId][month]++;
            }
        });

        // Convertir les données
        for (const userId in tasksByUser) {
            if (tasksByUser.hasOwnProperty(userId)) {
                const userTasks = tasksByUser[userId];
                const user = GetUserById(parseInt(userId, 10));
                if(user)
                {
                    const userData = {
                        label: `${user.nom}`,
                        curve: 'catmullRom',
                        data: userTasks
                    };
                    data.push(userData);
                }
            }
        }
    };
    convertTaskForChart(tasks)

    return (
        <div>
            <div className={'line-chart-container'}>
                <div>
                    <LineChartTasks data={data} />
                    <div className={'bottom-chart'}>
                        <div className={'doughnut-chart-and-progress'}>
                            <div className={'doughnutChart'}>
                                <DoughnutChart
                                    nbBlockedTasks={nbBlockedTasks}
                                    nbDoneTasks={nbDoneTasks}
                                    nbInProgressTasks={nbInProgressTasks}
                                />
                            </div>
                            <div className="progress-bar-chart">
                                <ProgressBarTasks
                                    nbBlockedTasks={nbBlockedTasks}
                                    nbDoneTasks={nbDoneTasks}
                                    nbInProgressTasks={nbInProgressTasks}
                                />
                            </div>
                        </div>
                        <div className="bar-chart">
                            <BarchartTasks />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;