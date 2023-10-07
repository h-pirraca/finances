import React from 'react'

import TCSS from './Tables.module.css'

const TableMes = (props) => {
  const total = parseFloat(props.valor[0].valor) +
    parseFloat(props.valor[1].valor) +
    parseFloat(props.valor[2].valor);
  return (
        <div >
            <table className={TCSS.categories}>
                <thead>
                <tr className={TCSS.tablerow}>
                    <th>{props.user}</th>
                    <th>{props.total}</th>
                </tr>
                </thead>
                <tbody>
                <tr className={TCSS.tablerow}>
                    <td>{props.valor[0].username}</td>
                    <td>{parseFloat(props.valor[0].valor).toFixed(2)} €</td>
                </tr>
                <tr className={TCSS.tablerow}>
                    <td>{props.valor[1].username}</td>
                    <td>{parseFloat(props.valor[1].valor).toFixed(2)} €</td>
                </tr>
                <tr className={TCSS.tablerow}>
                    <td>{props.valor[2].username}</td>
                    <td>{parseFloat(props.valor[2].valor).toFixed(2)} €</td>
                </tr>
                <tr>
                    <td><b>Total</b></td>
                    <td>{total.toFixed(2)} €</td>
                </tr>
                </tbody>
            </table>
        </div>
  )
}

export default TableMes