import React from "react";
import './App.css'

import { TABLE_BOX, TABLE_SIZE } from "./SudokuSolver";

const SudokuTable = ({ input, output }) =>
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
                                                    if (value !== 0)
                                                    {
                                                        return (
                                                            <td key={k} className="Table-data data-input">{value}</td>
                                                        )
                                                    }

                                                    let solver = output && output[row][col] !== 0 ? output[row][col] : ''
                                                    return (
                                                        <td key={k} className="Table-data data-output">{solver}</td>
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