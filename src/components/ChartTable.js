import React from 'react'

const Table = ({
  children
}) => {
  return (
    <table>
      <thead>
        <tr>
          <td>Date</td>
          <td>Open</td>
          <td>High</td>
          <td>Low</td>
          <td>Close</td>
          <td>Volume</td>
          <td>Unadjusted Volume</td>
          <td>Change percent</td>
          <td>Change over time</td>
          </tr>
        </thead>
        {children}
      </table>
  )
}

const TableRow = ({
  date,
  open,
  high,
  low,
  close,
  volume,
  unadjustedVolume,
  changePercent,
  changeOverTime,
}) => {
  return <tr>
      <td>{date}</td>
      <td>{open.toFixed(2)}</td>
      <td>{high.toFixed(2)}</td>
      <td>{low.toFixed(2)}</td>
      <td>{close.toFixed(2)}</td>
      <td>{volume}</td>
      <td>{unadjustedVolume}</td>
      <td>{changePercent}</td>
      <td>{changeOverTime.toFixed(2)}</td>
    </tr>
}

export { Table, TableRow }