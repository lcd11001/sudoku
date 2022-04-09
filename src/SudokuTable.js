import React from "react";
import './App.css'

const TABLE_SIZE = 9
const TABLE_BOX = 3

const SudokuTable = ({ input }) =>
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
                                                    let row = i * TABLE_BOX + j;
                                                    let col = k;
                                                    let value = input[row][col]

                                                    return (
                                                        <td key={k} className="Table-data">{value != 0 ? value : ''}</td>
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