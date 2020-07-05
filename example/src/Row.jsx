import React from 'react'

export const Row = ({ index, style }) => (
  <div className={index % 2 ? 'odd' : 'even'} style={style}>
    Row {index}
  </div>
)
