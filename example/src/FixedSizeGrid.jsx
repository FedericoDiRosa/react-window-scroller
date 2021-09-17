import React from 'react'
import { FixedSizeGrid as Grid } from 'react-window'
import { ReactWindowScroller } from 'react-window-scroller'
import { Cell } from './Cell'

const FixedSizeGrid = ({ scrollElementRef }) => (
  <ReactWindowScroller scrollElementRef={scrollElementRef} isGrid>
    {({ ref, outerRef, style, onScroll }) => (
      <Grid
        ref={ref}
        outerRef={outerRef}
        style={style}
        height={window.innerHeight}
        width={window.innerWidth}
        columnCount={1000}
        columnWidth={100}
        rowCount={1000}
        rowHeight={50}
        onScroll={onScroll}
      >
        {Cell}
      </Grid>
    )}
  </ReactWindowScroller>
)

export default FixedSizeGrid
