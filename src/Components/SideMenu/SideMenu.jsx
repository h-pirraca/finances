import React, { useState } from 'react'
import { CalendarMonthOutlined, CalendarTodayOutlined, FunctionsOutlined, HomeOutlined, InsertChartOutlinedRounded, LeaderboardOutlined, LogoutOutlined, MenuOutlined, PaidOutlined, TableChartOutlined, TodayOutlined, TrendingDownOutlined, TrendingUpOutlined } from '@mui/icons-material';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Outlet, Link, useNavigate } from "react-router-dom";

import SM from './SideMenu.module.css'

const SideMenu = ({ onLogout }) => {

  const navigate = useNavigate();
  
  const [ toggled, setToggled ] = useState(false); 
  const [ activeIndex, setActiveIndex ] = useState(() => { 
    const initialIndex = 
          window.location.pathname === '/' ? 0 
        : window.location.pathname === '/tableDaily' ? 1 
        : window.location.pathname === '/tableMonthly' ? 2 
        : window.location.pathname === '/tableSumSubtipo' ? 3 
        : window.location.pathname === '/tableSumSubcategoria' ? 4
        : window.location.pathname === '/graphMonthly' ? 5 
        : window.location.pathname === '/graphIncome' ? 6 
        : window.location.pathname === '/graphOutcome' ? 7 
        : window.location.pathname === '/graphBalance' ? 8 
        : window.location.pathname === '/export' ? 9 
        : 0; 
    return initialIndex; 
  });
  
  const handleLogout = async () => {
    // Send a request to the server to log the user out
    await fetch(process.env.REACT_APP_SERVER_LINK+'/logout', {
      method: 'POST', // You can use POST or any appropriate method
    })
      .then((response) => {
        if (response.status === 200) {
          // Clear the token and reset the state
          onLogout();
        } else {
          throw new Error('Logout failed');
        }
      })
      .catch((error) => {
        console.log('Logout failed:', error);
      });
  };

  return (
    <div>
        <div className={SM.Navigation}>
            <div className={SM.Title}>
                <img className={SM.Logo} src='./Logo.png' alt='Logo'/>
                <img className={SM.Finances} src='./Name.png' alt='Name'/>
            </div>
            <div className={SM.Apresentation}>
                <p className={SM.Welcome}>Bem-Vindo, {localStorage.getItem('name')}</p>
                <button className={SM.Menu} onClick={() => setToggled(!toggled)}><MenuOutlined fontSize='large' color='disabled'/></button>  
            </div>
        </div>
        <Sidebar
            backgroundColor='white'
            onBackdropClick={() => setToggled(false)}
            toggled={toggled}
            breakPoint="all"
            width='300px'
        >
            <Menu closeOnClick
                menuItemStyles={{
                    button: ({ active }) => {
                        return {
                          borderLeft: active ? '5px solid var(--color-warning)' : '5px solid transparent',
                          backgroundColor: active ? 'var(--color-light)' : '',
                        };
                    },
                }}
            >
                <h2 className={SM.MenuTitle}>Menu</h2>
                <MenuItem active={activeIndex === 0} component={<Link to="/" onClick={() => setActiveIndex(0)} />} icon={<HomeOutlined/>}>Página Inicial</MenuItem>
                <SubMenu icon={<TableChartOutlined/>} label="Tabela">
                    <MenuItem active={activeIndex === 1} component={<Link to="/tableDaily" onClick={() => setActiveIndex(1)} />} icon={<TodayOutlined/>}>Diária</MenuItem>
                    <MenuItem active={activeIndex === 2} component={<Link to="/tableMonthly" onClick={() => setActiveIndex(2)} />} icon={<CalendarMonthOutlined/>}>Mensal</MenuItem>
                    <MenuItem active={activeIndex === 3} component={<Link to="/tableSumSubtipo" onClick={() => setActiveIndex(3)} />} icon={<><FunctionsOutlined/><TodayOutlined/></>}>Soma Subtipo</MenuItem>
                    <MenuItem active={activeIndex === 4} component={<Link to="/tableSumSubcategoria" onClick={() => setActiveIndex(4)} />} icon={<><FunctionsOutlined/><CalendarMonthOutlined/></>}>Soma Subcategorias</MenuItem>
                </SubMenu>
                <SubMenu icon={<LeaderboardOutlined/>} label="Gráfico">
                    <MenuItem active={activeIndex === 5} component={<Link to="/graphMonthly" onClick={() => setActiveIndex(5)} />} icon={<InsertChartOutlinedRounded/>}>Mensal</MenuItem>
                    <SubMenu icon={<CalendarTodayOutlined/>} label="Anual">
                        <MenuItem active={activeIndex === 6} component={<Link to="/graphIncome" onClick={() => setActiveIndex(6)} />} icon={<TrendingUpOutlined/>}>Rendimentos</MenuItem>
                        <MenuItem active={activeIndex === 7} component={<Link to="/graphOutcome" onClick={() => setActiveIndex(7)} />} icon={<TrendingDownOutlined/>}>Despesas</MenuItem>
                        <MenuItem active={activeIndex === 8} component={<Link to="/graphBalance" onClick={() => setActiveIndex(8)} />} icon={<PaidOutlined/>}>Balanço</MenuItem>
                    </SubMenu>    
                </SubMenu>
                <MenuItem onClick={handleLogout} icon={<LogoutOutlined/>}>Logout</MenuItem>
            </Menu>
        </Sidebar>
        <Outlet/>
    </div>
  )
}

export default SideMenu