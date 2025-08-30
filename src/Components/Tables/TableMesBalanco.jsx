import React from 'react'

import TCSS from './Tables.module.css'

const TableMesBalanco = (propsR, propsD) => {
  const totalR = parseFloat(propsR.valor[0].valor) +
    parseFloat(propsR.valor[1].valor) +
    parseFloat(propsR.valor[2].valor);

  const totalD = parseFloat(propsD.valor[0].valor) +
    parseFloat(propsD.valor[1].valor) +
    parseFloat(propsD.valor[2].valor);

  const total = totalR - totalD;

  return (
        <div >
            <table className={TCSS.categories}>
                <thead>
                </thead>
                <tbody>
                <tr>
                    <td><b>Total</b></td>
                    <td>{total.toFixed(2)} €</td>
                </tr>
                </tbody>
            </table>
        </div>
  )
}

export default TableMesBalanco