import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Chart from 'chart.js/auto';
import { amber, deepOrange, lightBlue } from '@mui/material/colors';
import GraphCSS from './Graph.module.css';
import TableMes from '../../Components/Tables/TableMes';

const GraphMonthly = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '',
      },
    },
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  // State variables for the three datasets
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Hugo Pirraça',
        data: [],
        backgroundColor: amber[600],
      },
      {
        label: 'Nuno Kakoo',
        data: [],
        backgroundColor: deepOrange[600],
      },
      {
        label: 'Casa',
        data: [],
        backgroundColor: lightBlue[600],
      },
    ],
  });

  const [total, setTotal] = useState({
    datasets: [
      {
        username: 'Hugo Pirraça',
        valor: ''
      },
      {
        username: 'Nuno Kakoo',
        valor: '',
      },
      {
        username: 'Casa',
        valor: '',
      }
    ],
  });

  const [totalRendimentos, setTotalRendimentos] = useState({
    datasets: [
      {
        username: 'Hugo Pirraça',
        valor: ''
      },
      {
        username: 'Nuno Kakoo',
        valor: '',
      },
      {
        username: 'Casa',
        valor: '',
      }
    ],
  });

  // Ref for the chart element
  const chartRef = useRef(null);

  const fetchData = async (username, index, label) => {
    try {
      const response = await fetch(process.env.REACT_APP_SERVER_LINK+'/graphGastosMensais', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: selectedDate.toISOString(), username }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok' + response);
      }
  
      const result = await response.json();
      const labels = result.map(item => item.categoria);
      const chartData = result.map(item => item.total);
  
      setData(prevData => {
        const updatedDatasets = [...prevData.datasets];
        updatedDatasets[index].label = label; // Update the label with the passed label argument
        updatedDatasets[index].data = chartData; // Update the data
        return {
          ...prevData,
          labels,
          datasets: updatedDatasets,
        };
      });

      var sum = 0;

      await result.forEach(row => {
        sum += parseFloat(row.total);
      });

      setTotal(prevData => {
        const updatedDatasets = [...prevData.datasets];
        updatedDatasets[index].username = label; // Update the label with the passed label argument
        updatedDatasets[index].valor = sum; // Update the data
        return {
          ...prevData,
          labels,
          datasets: updatedDatasets,
        };
      });

      const resp = await fetch(process.env.REACT_APP_SERVER_LINK+'/graphGastosMensaisRendimentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: selectedDate.toISOString(), username }),
      });
  
      if (!resp.ok) {
        throw new Error('Network response was not ok' + response);
      }

      const resultRend = await resp.json();
      var sumRend = 0;

      await resultRend.forEach(row => {
        sumRend += parseFloat(row.total);
      });

      setTotalRendimentos(prevData => {
        const updatedDatasets = [...prevData.datasets];
        updatedDatasets[index].username = label; // Update the label with the passed label argument
        updatedDatasets[index].valor = sumRend; // Update the data
        return {
          ...prevData,
          labels,
          datasets: updatedDatasets,
        };
      });

    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Call the fetchData function with the desired label for each dataset
  useEffect(() => {
    fetchData('hpirraca', 0, 'Hugo Pirraça'); // Change 'New Label 1' to the desired label
    fetchData('nunokakoo', 1, 'Nuno Kakoo'); // Change 'New Label 2' to the desired label
    fetchData('casa', 2, 'Casa'); // Change 'New Label 3' to the desired label
  }, [selectedDate]);

  useEffect(() => {
    if (chartRef.current) {
      // Create the chart after the component is mounted or when data changes
      const chart = new Chart(chartRef.current, {
        type: 'bar',
        data: data,
        options: options,
      });

      // Clean up the chart when the component is unmounted
      return () => {
        chart.destroy();
      };
    }
  }, [data]);

  return (
    <div className={GraphCSS.Top}>
      <div className={GraphCSS.Main}>
        <div className={GraphCSS.Article}>
          <h3>Gráfico Mensal de Despesas</h3>
          <DatePicker
            wrapperClassName={GraphCSS.DatePickerW}
            className={GraphCSS.DatePicker}
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            peekNextMonth
            showYearDropdown
            scrollableYearDropdown
          />
          <div className={GraphCSS.Graph}>
            <canvas className={GraphCSS.Graph} ref={chartRef}></canvas>
          </div>
        </div>
      </div>
      <div className={GraphCSS.Side}>
        <h5><b>Rendimentos Mensais</b></h5>
        <TableMes valor={totalRendimentos.datasets} user={'Utilizador'} total={'Total'}/>
        <br/>
        <h5><b>Despesas Mensais</b></h5>
        <TableMes valor={total.datasets} user={'Utilizador'} total={'Total'}/>
      </div>
    </div>
  );
};

export default GraphMonthly;
