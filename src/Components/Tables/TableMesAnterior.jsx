import React from 'react'

import TCSS from './Tables.module.css'

const TableMesAnterior = (props) => {
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
                    <td>{props.valor[0].total} €</td>
                </tr>
                <tr className={TCSS.tablerow}>
                    <td>{props.valor[1].username}</td>
                    <td>{props.valor[1].total} €</td>
                </tr>
                <tr>
                    <td>{props.valor[2].username}</td>
                    <td>{props.valor[2].total} €</td>
                </tr>
                </tbody>
            </table>
        </div>
  )
}

export default TableMesAnterior