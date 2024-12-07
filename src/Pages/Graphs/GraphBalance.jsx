import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Chart from 'chart.js/auto';
import { red, green, blueGrey } from '@mui/material/colors';
import GraphCSS from './Graph.module.css';
import Tables from '../../Components/Tables/Tables';

const GraphBalance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [state, setState] = useState({
    mediaB: '',
  });

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
        label: 'Balanço',
        data: [],
        backgroundColor: blueGrey[900],
      }
    ],
  });

  // Ref for the chart element
  const chartRef = useRef(null);

  const fetchData = async (index, label) => {
    
    try {
      const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];
      
      const response = await fetch(process.env.REACT_APP_SERVER_LINK+'/graphBalance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: selectedDate.toISOString() }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok' + response);
      }
  
      const result = await response.json();
      const labels = result.map(item => monthNames[item.month - 1]);
      const chartData = result.map(item => item.valor);
  
      const backgroundColors = chartData.map(value => {
        return value >= 0 ? green[600] : red[600];
      });

      setData(prevData => {
        const updatedDatasets = [...prevData.datasets];
        updatedDatasets[index].label = label;
        updatedDatasets[index].data = chartData;
        updatedDatasets[index].backgroundColor = backgroundColors; // Set background colors
        return {
          ...prevData,
          labels,
          datasets: updatedDatasets,
        };
      });

      let sum = 0;
      let count = 0;

      let sumMinusCurrentMonth = 0;
      let countMinusCurrentMonth = 0;

      result.forEach(row => {
        sum += parseFloat(row.valor);
        count++;
      });
  
      result.forEach((row, index) => {
        if (index < result.length - 1) {
            sumMinusCurrentMonth += parseFloat(row.valor);
            countMinusCurrentMonth++;
        }
      });

      if (count > 0) {
        var averageValue = sum / count;
        var averageValueMinusCurrentMonth = sumMinusCurrentMonth/countMinusCurrentMonth;
      } else {
        console.log('No data found for the current year.');
      }

      setState((prevState) => ({
        ...prevState,
        mediaB: averageValue, 
        mediaBMCM : averageValueMinusCurrentMonth,
      }));
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Call the fetchData function with the desired label for each dataset
  useEffect(() => {
    fetchData(0, 'Balanço'); // Change 'New Label 1' to the desired label
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
          <h3>Gráfico do Balanço Anual</h3>
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
        <h5><b>Balanço Médio Mensal Atual</b></h5>
            <Tables valor={state.mediaB} total={'Total'}/>
        <br/>
        <h5><b>Balanço Médio Mensal Mês-1</b></h5>
            <Tables valor={state.mediaBMCM} total={'Total'}/>
        <p><b>Valor atualizado até ao mês anterior</b></p>
        <br/>
      </div>
    </div>
  );
};

export default GraphBalance;