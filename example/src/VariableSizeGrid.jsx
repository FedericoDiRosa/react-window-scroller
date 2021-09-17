import React from 'react'
import { VariableSizeGrid as Grid } from 'react-window'
import { ReactWindowScroller } from 'react-window-scroller'
import { Cell } from './Cell'

const columnWidths = [...new Array(1000)].map(
  () => 75 + Math.round(Math.random() * 50)
)
const rowHeights = [...new Array(1000)].map(
  () => 25 + Math.round(Math.random() * 50)
)

const VariableSizeGrid = ({ scrollElementRef }) => (
  <ReactWindowScroller scrollElementRef={scrollElementRef} isGrid>
    {({ ref, outerRef, style, onScroll }) => (
      <Grid
        ref={ref}
        outerRef={outerRef}
        style={style}
        height={window.innerHeight}
        width={window.innerWidth}
        columnCount={1000}
        columnWidth={(index) => columnWidths[index]}
        rowCount={1000}
        rowHeight={(index) => rowHeights[index]}
        onScroll={onScroll}
      >
        {Cell}
      </Grid>
    )}
  </ReactWindowScroller>
)

export default VariableSizeGrid
