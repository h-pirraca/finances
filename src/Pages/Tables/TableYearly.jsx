import React, { Component } from 'react'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { MDBDataTable } from 'mdbreact';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import TableCSS from './Table.module.css'

class TableMonthly extends Component {
  constructor(){
    super();
    this.state = {
      selectedDate: new Date(),
      rows: []
    }
    this.fetchData()
  }

  storeRows = (rows) =>{
    this.setState({rows: rows}, () => {
      //console.log(this.state.rows);
    })
  }

  fetchData = async () => {
    const { selectedDate } = this.state;

    try{
      const response = await fetch(process.env.REACT_APP_SERVER_LINK+'/tabelaAnual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: selectedDate.toISOString() }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok'+ response);
      }

      const data = await response.json();
      this.setState({ rows: data });
    } catch (error) {
      console.error('Error:', error);
      // Handle errors or display error messages to the user.
    }
  };

  handleDateChange = (date) => {
    this.setState({selectedDate: date});
    setTimeout(() => {this.fetchData();}, 200)
  };

  render(){
    const data = {
      columns: [
          {
            label: 'Utilizador',
            field: 'username',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Tipo',
            field: 'tipo',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Categoria',
            field: 'categoria',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Subcategoria',
            field: 'subcategoria',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Subtipo',
            field: 'subtipo',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Valor',
            field: 'valor',
            sort: 'asc',
            width: 50
          },
          {
            label: 'Data',
            field: 'data',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Descrição',
            field: 'descricao',
            sort: 'asc',
            width: 100
          }
        ],
        rows: this.state.rows
    };

    return (
      <div className={TableCSS.Main}>
        <div className={TableCSS.Article}>
          <h3>Tabela Anual</h3>
          <DatePicker
            wrapperClassName={TableCSS.DatePickerW}
            className={TableCSS.DatePicker}
            selected={this.state.selectedDate}
            onChange={this.handleDateChange}
            dateFormat="yyyy"
            showMonthYearPicker
            peekNextMonth
            showYearDropdown
            scrollableYearDropdown
          />
        <div className={TableCSS.Table}>
            <MDBDataTable
              striped
              small
              data={data}
              className='table-responsive'
            />
          </div>
        </div> 
      </div>
    )
  }
}

export default TableMonthly