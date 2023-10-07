import React, { useState, useEffect } from 'react'

import MCSS from './Main.module.css'

import './Collapse.css'

import Register from '../../Components/Register/Register'
import InsightGastosDiarios from '../../Components/Graphs/InsightGastosDiarios';
import InsightGastosMensais from '../../Components/Graphs/InsightGastosMensais';
import Tables from '../../Components/Tables/Tables';
import TableMesAnterior from '../../Components/Tables/TableMesAnterior';
import Exports from '../Exports';
import { FileDownloadOutlined, AddOutlined } from '@mui/icons-material';

const Main = () => {

  const [collapsed, setCollapsed] = useState(true);
  const [collapsedC, setCollapsedC] = useState(true);
  const [showButton, setShowButton] = useState(false);

  const [state, setState] = useState({
    totalB: '',
    totalD: '',
    totalR: '',
    MA: null,
  });

  const fetchData = async () => {
    try {
      const responseD = await fetch(process.env.REACT_APP_SERVER_LINK+'/gastosMensais', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!responseD.ok) {
        throw new Error('Network response was not ok');
      }

      const responseR = await fetch(process.env.REACT_APP_SERVER_LINK+'/ganhosMensais', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!responseR.ok) {
        throw new Error('Network response was not ok');
      }

      const responseMA = await fetch(process.env.REACT_APP_SERVER_LINK+'/gastosMesAnterior', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!responseMA.ok) {
        throw new Error('Network response was not ok');
      }

      const dataD = await responseD.json();
      const dataR = await responseR.json();
      const MA = await responseMA.json();

      await setState((prevState) => ({
        ...prevState,
        totalD: dataD[0].total,
        totalR: dataR[0].total,
        MA: MA,
      }));

      var totalB = parseFloat(dataR[0].total) - parseFloat(dataD[0].total);

      setState((prevState) => ({
        ...prevState,
        totalB: totalB
      }));

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const toggleCollapseC = () => {
    setCollapsedC(!collapsedC);
  };

  const checkScreenWidth = () => {
    if (window.innerWidth < 600) {
      setShowButton(true);
    } else {
      setShowButton(true);
      setCollapsed(false); // Ensure content is expanded on larger screens
    }
  };

  useEffect(() => {
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);

    fetchData();
    const fetchInterval = setInterval(fetchData, 5000);

    return () => {
      window.removeEventListener('resize', checkScreenWidth);
      clearInterval(fetchInterval); // Cleanup interval on unmount
    };
  }, []);

  return (
    <div className={MCSS.Main}>
      <div className='Side'>
        <div className={`collapsible-button ${collapsed ? 'collapsed': ''}`}>
          {showButton && (
            <button onClick={toggleCollapse} className='toggle-button'>
              <AddOutlined/>Registo
            </button>
          )}
            <Register/>
        </div>
        <div className={`collapsible-button ${collapsedC ? 'collapsed': ''}`}>
          {showButton && (
            <button onClick={toggleCollapseC} className='toggle-button'>
              <FileDownloadOutlined/>Exportação
            </button>
          )}
            <Exports/>
          </div> 
      </div>
      
      <div className={MCSS.Article}>
        <div className={MCSS.First}>
          <h4><b>Gastos Diários</b></h4>
          <div>
            <InsightGastosDiarios/>
          </div>
          <br/>
          <h4><b>Gastos Mensais</b></h4> 
          <div>
            <InsightGastosMensais/>
          </div>
        </div>
        <div className={MCSS.Second}>
          <h5><b>Gastos do Mês Anterior</b></h5>
          {state.MA !== null ? (
            <TableMesAnterior valor={state.MA} user={'Utilizador'} total={'Total'} />
          ) : (
            <p>Loading data...</p>
          )}
          <br/>
          <h5><b>Rendimentos do Mês</b></h5>
            <Tables signal={'+'} valor={state.totalR} total={'Total'}/>
          <br/>
          <h5><b>Despesas do Mês</b></h5>
            <Tables signal={'-'} valor={state.totalD} total={'Total'}/>
          <br/>
          <h5><b>Balanço do Mês</b></h5>
            <Tables valor={state.totalB} total={'Total'}/>
          <br/>
        </div>             
      </div>
    </div>
  )
}

export default Main