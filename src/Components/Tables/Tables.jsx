import React from 'react'

import TCSS from './Tables.module.css'

const Tables = (props) => {

    const textColorClass = props.signal === '+' ? '{TCSS.greentext}' : '{TCSS.redtext}';

    return (
      <div>
        <table className={TCSS.categories}>
          <thead>
            <tr className={TCSS.tablerow}>
              <th><b>{props.total}</b></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* Apply the textColorClass to change text color */}
              <td className={textColorClass}>
                {props.signal}{parseFloat(props.valor).toFixed(2)} €
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
}

export default Tables