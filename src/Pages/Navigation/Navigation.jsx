import React from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom';

import SideMenu from '../../Components/SideMenu/SideMenu';
import Main from '../Main/Main';
import TableDaily from '../Tables/TableDaily';
import TableMonthly from '../Tables/TableMonthly';
import TableSumSubtipo from '../Tables/TableSumSubtipo';
import TableSumSubcategoria from '../Tables/TableSumSubcategorias';
import GraphMonthly from '../Graphs/GraphMonthly';
import GraphIncome from '../Graphs/GraphIncome';
import GraphOutcome from '../Graphs/GraphOutcome';
import GraphBalance from '../Graphs/GraphBalance';
import Exports from '../Exports'
import SignIn from '../../Components/SignIn/SignIn';

const Navigation = ({ onLogout }) => {
  return (
    <div>
        <HashRouter>
        <Routes>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path="/" element={<SideMenu onLogout={onLogout}/>}>
              <Route index element={<Main />} />
              <Route path="/tableDaily" element={<TableDaily />} />
              <Route path="/tableMonthly" element={<TableMonthly />} />
              <Route path="/tableYearly" element={<TableYearly />} />
              <Route path="/tableSumSubtipo" element={<TableSumSubtipo />} />
              <Route path="/tableSumSubcategoria" element={<TableSumSubcategoria />} />
              <Route path="/graphMonthly" element={<GraphMonthly />} />
              <Route path="/graphIncome" element={<GraphIncome />} />
              <Route path="/graphOutcome" element={<GraphOutcome />} />
              <Route path="/graphBalance" element={<GraphBalance />} />
              <Route path="/export" element={<Exports />} />
            </Route>   
      </Routes>
    </HashRouter>
    </div>
  )
}

export default Navigation