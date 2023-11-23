import React, { useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DoughnutChart = ({ nbBlockedTasks, nbDoneTasks, nbInProgressTasks }) => {

    const totalTasks = nbBlockedTasks + nbDoneTasks + nbInProgressTasks;

    useEffect(() => {
        CanvasJS.addColorSet("customColor", [
            "#f4706f", // Couleur pour Bloqué
            "#28c3bd", // Couleur pour Terminé
            "#5d62b4"  // Couleur pour En cours
        ]);
    }, []);

    const options = {
        animationEnabled: true,
        colorSet: "customColor",
        data: [{
            type: 'doughnut',
            showInLegend: false,
            indexLabel: '{y} %',
            yValueFormatString: "#,###'%'",
            dataPoints: [
                { name: 'Bloqué', y: (nbBlockedTasks/totalTasks) * 100},
                { name: 'Terminé', y: (nbDoneTasks/totalTasks) * 100 },
                { name: 'En cours', y: (nbInProgressTasks/totalTasks) * 100 },
            ]
        }]
    };

    return (
        <div>
            <CanvasJSChart options={options}/>
        </div>
    );
};

export default DoughnutChart;
