import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import './LineChartTasks.css';

const LineChartTasks = ({ data }) => {
        // Utilisé pour ecrire les labels des mois
        const month = [
            new Date(1990, 0, 1), // Janvier (0)
            new Date(1990, 1, 1), // Février (1)
            new Date(1990, 2, 1), // Mars (2)
            new Date(1990, 3, 1), // Avril (3)
            new Date(1990, 4, 1), // Mai (4)
            new Date(1990, 5, 1), // Juin (5)
            new Date(1990, 6, 1), // Juillet (6)
            new Date(1990, 7, 1), // Août (7)
            new Date(1990, 8, 1), // Septembre (8)
            new Date(1990, 9, 1), // Octobre (9)
            new Date(1990, 10, 1), // Novembre (10)
            new Date(1990, 11, 1), // Décembre (11)
        ];

        return (
            <div className={"line-chart"}>
                <LineChart
                    xAxis={[
                        {
                            id: 'Months',
                            data: month,
                            scaleType: 'time',
                            valueFormatter: (date) => date.toLocaleString('default', { month: 'long' })
                        },
                    ]}
                    series={data}
                    width={1100} // Définis en px car sinon les label sont répété plusieurs fois
                    height={300}
                />
            </div>
    );
};

export default LineChartTasks;
