import React, { Component } from 'react';
import Exp from './Export.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class Exports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
    };
  }

  handleDateChange = (date) => {
    this.setState({
      selectedDate: date,
    });
  };

  handleSubmit = async () => {
    const { selectedDate } = this.state;

    try {
      const response = await fetch(process.env.REACT_APP_SERVER_LINK+'/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: selectedDate.toISOString() }),
      });

      if (!response.ok) {
        throw new Error('Invalid data.');
      }

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const currentMonth = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const currentYear = selectedDate.getFullYear();

      const blob = await response.blob();

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element for downloading
      const a = document.createElement('a');
      a.href = url;
      a.download = 'finances_'+currentMonth+'_'+currentYear+'.csv';
      document.body.appendChild(a);

      // Trigger the click event to download the file
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Reset the form by updating the state values to their initial state
      this.setState({
        selectedDate: new Date(),
      });
    } catch (err) {
      console.log("Failed to download: " + err);
    }
  };

  render() {
    return (
      <div>
        <form className={Exp.Formulario}>
          <div>
            <DatePicker
              wrapperClassName={Exp.DatePicker}
              className={Exp.DatePicker}
              selected={this.state.selectedDate}
              onChange={this.handleDateChange}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              peekNextMonth
              showYearDropdown
              scrollableYearDropdown
            />
          </div>
          <button type="submit" onClick={this.handleSubmit} className={Exp.Button}>
            Download
          </button>
        </form>
      </div>
    );
  }
}

export default Exports;