import React from "react";
import './App.css'

const TABLE_SIZE = 9
const TABLE_BOX = 3

const SudokuTable = () =>
{
    return (
        <table className="Table">
            {
                // init colgroup
                Array(TABLE_BOX).fill().map((_, i) =>
                {
                    return (
                        <colgroup className="Table-colgroup" key={i}>
                            {
                                Array(TABLE_BOX).fill().map((_, j) =>
                                {
                                    return (
                                        <col key={j} />
                                    )
                                })
                            }
                        </colgroup>
                    )
                })
            }
            {
                // init boxes
                Array(TABLE_BOX).fill().map((_, i) =>
                {
                    return (
                        <tbody className="Table-body" key={i}>
                            {
                                Array(TABLE_BOX).fill().map((_, j) =>
                                {
                                    return (
                                        <tr key={j}>
                                            {
                                                Array(TABLE_SIZE).fill().map((_, k) =>
                                                {
                                                    return (
                                                        <td key={k} className="Table-data">{k}</td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    )
                })
            }
        </table>
    )
}

export default SudokuTable