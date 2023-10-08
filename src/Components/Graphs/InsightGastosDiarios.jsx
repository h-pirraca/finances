import React, { useState, useEffect } from 'react';

import IGD from './IGD.module.css';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { BarChart } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { amber, deepOrange, lightBlue } from '@mui/material/colors';

ChartJS.register(ArcElement, Tooltip, Legend);

const InsightGastosDiarios = () => {
  const [state, setState] = useState({
    rows: [],
    totalC: '',
    totalH: '',
    totalN: '',
    somaC: '',
    somaH: '',
    somaN: ''
  });

  // Separate state for each dataset
  const [dataH, setDataH] = useState({
    datasets: [
      {
        label: 'Gastos',
        data: [],
        backgroundColor: [amber[600], '#A9A9A9'],
        borderColor: [amber[600], '#989898'],
        borderWidth: [1, 1],
      },
    ],
  });

  const [dataN, setDataN] = useState({
    datasets: [
      {
        label: 'Gastos',
        data: [],
        backgroundColor: [deepOrange[400], '#A9A9A9'],
        borderColor: [deepOrange[400], '#989898'],
        borderWidth: [1, 1],
      },
    ],
  });

  const [dataC, setDataC] = useState({
    datasets: [
      {
        label: 'Gastos',
        data: [],
        backgroundColor: [lightBlue[600], '#A9A9A9'],
        borderColor: [lightBlue[600], '#989898'],
        borderWidth: [1, 1],
      },
    ],
  });

  const options = {
    title: {
      display: false,
      position: 'top',
      text: 'Doughnut Chart',
      fontSize: 18,
      fontColor: '#111',
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel;
        },
      },
    },
  };

  const fetchData = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_SERVER_LINK+'/gastosDiarios', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setState((prevState) => ({
        ...prevState,
        totalC: data[0].total,
        totalH: data[1].total,
        totalN: data[2].total,
      }));

      const somaC = parseFloat(data[1].total) + parseFloat(data[2].total);
      const somaH = parseFloat(data[0].total) + parseFloat(data[2].total);
      const somaN = parseFloat(data[0].total) + parseFloat(data[1].total);

      setState((prevState) => ({
        ...prevState,
        somaC: somaC,
        somaH: somaH,
        somaN: somaN,
      }));

      // Update the datasets with the new data
      setDataH((prevDataH) => ({
        ...prevDataH,
        datasets: [
          {
            ...prevDataH.datasets[0],
            data: [totalH, somaH],
          },
        ],
      }));

      setDataN((prevDataN) => ({
        ...prevDataN,
        datasets: [
          {
            ...prevDataN.datasets[0],
            data: [totalN, somaN],
          },
        ],
      }));

      setDataC((prevDataC) => ({
        ...prevDataC,
        datasets: [
          {
            ...prevDataC.datasets[0],
            data: [totalC, somaC],
          },
        ],
      }));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const fetchInterval = setInterval(fetchData, 5000); // Fetch every 5 seconds (adjust as needed)

    return () => {
      clearInterval(fetchInterval); // Cleanup interval on unmount
    };
  }, []);

  const totalH = parseFloat(state.totalH);
  const somaH = parseFloat(state.somaH);

  dataH.datasets[0].data = [totalH, somaH];

  const totalN = parseFloat(state.totalN);
  const somaN = parseFloat(state.somaN);

  dataN.datasets[0].data = [totalN, somaN];

  const totalC = parseFloat(state.totalC);
  const somaC = parseFloat(state.somaC);

  dataC.datasets[0].data = [totalC, somaC];

  return (
    <div className={IGD.Insights}>
      <div className={IGD.Box}>
        <Avatar sx={{ bgcolor: amber[600] }}>
          <BarChart />
        </Avatar>
        <div className={IGD.Middle}>
          <div className={IGD.Left}>
            <h4>
              <b>Hugo</b>
            </h4>
            <h5 className={IGD.TextMuted}>{state.totalH} €</h5>
          </div>
          <div className={IGD.Progress}>
            <Doughnut data={dataH} options={options} />
          </div>
        </div>
      </div>

      <div className={IGD.Box}>
        <Avatar sx={{ bgcolor: deepOrange[400] }}>
          <BarChart />
        </Avatar>
        <div className={IGD.Middle}>
          <div className={IGD.Left}>
            <h4>
              <b>Nuno</b>
            </h4>
            <h5 className={IGD.TextMuted}>{state.totalN} €</h5>
          </div>
          <div className={IGD.Progress}>
            <Doughnut data={dataN} options={options} />
          </div>
        </div>
      </div>

      <div className={IGD.Box}>
        <Avatar sx={{ bgcolor: lightBlue[600] }}>
          <BarChart />
        </Avatar>
        <div className={IGD.Middle}>
          <div className={IGD.Left}>
            <h4>
              <b>Casa</b>
            </h4>
            <h5 className={IGD.TextMuted}>{state.totalC} €</h5>
          </div>
          <div className={IGD.Progress}>
            <Doughnut data={dataC} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightGastosDiarios;