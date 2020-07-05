import React from 'react'

export const Cell = ({ columnIndex, rowIndex, style }) => (
  <div
    className={
      columnIndex % 2
        ? rowIndex % 2 === 0
          ? 'odd'
          : 'even'
        : rowIndex % 2
        ? 'odd'
        : 'even'
    }
    style={style}
  >
    r{rowIndex}, c{columnIndex}
  </div>
)
