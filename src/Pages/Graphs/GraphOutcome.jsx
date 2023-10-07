import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Chart from 'chart.js/auto';
import { amber, deepOrange, lightBlue } from '@mui/material/colors';
import GraphCSS from './Graph.module.css';
import TableMediaDespesas from '../../Components/Tables/TableMediaDespesas';

const GraphIncome = () => {
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

  // Ref for the chart element
  const chartRef = useRef(null);

  const fetchData = async (username, index, label) => {
    
    try {
      const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];
      
      const response = await fetch(process.env.REACT_APP_SERVER_LINK+'/graphOutcome', {
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
      const labels = result.map(item => monthNames[item.month - 1]);
      const chartData = result.map(item => item.valor);
  
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

      let sum = 0;
      let count = 0;

      result.forEach(row => {
        sum += parseFloat(row.valor);
        count++;
      });
  
      if (count > 0) {
        var averageValue = sum / count;
      } else {
        console.log('No data found for the current year.');
      }
      
      setTotal(prevData => {
        const updatedDatasets = [...prevData.datasets];
        updatedDatasets[index].username = label; // Update the label with the passed label argument
        updatedDatasets[index].valor = averageValue; // Update the data
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
    fetchData('casa', 2, 'Casa'); // Change 'New Label 2' to the desired label
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
          <h3>Gráfico Anual de Despesas</h3>
          <DatePicker
            wrapperClassName={GraphCSS.DatePickerW}
            className={GraphCSS.DatePicker}
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            dateFormat="yyyy"
            showYearPicker
          />
          <div className={GraphCSS.Graph}>
            <canvas className={GraphCSS.Graph} ref={chartRef}></canvas>
          </div>
        </div>
      </div>
      <div className={GraphCSS.Side}>
      <h5><b>Valor Médio Mensal</b></h5>
        <TableMediaDespesas valor={total.datasets} user={'Utilizador'} total={'Total'}/>
      </div>
    </div>
  );
};

export default GraphIncome;
