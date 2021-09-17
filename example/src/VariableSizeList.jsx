import React from 'react'
import { VariableSizeList as List } from 'react-window'
import { ReactWindowScroller } from 'react-window-scroller'
import { Row } from './Row'

const rowSizes = [...new Array(1000)].map(
  () => 25 + Math.round(Math.random() * 50)
)
const getItemSize = (index) => rowSizes[index]

const VariableSizeList = ({ scrollElementRef }) => (
  <ReactWindowScroller scrollElementRef={scrollElementRef}>
    {({ ref, outerRef, style, onScroll }) => (
      <List
        ref={ref}
        outerRef={outerRef}
        style={style}
        height={window.innerHeight}
        itemCount={1000}
        itemSize={getItemSize}
        onScroll={onScroll}
      >
        {Row}
      </List>
    )}
  </ReactWindowScroller>
)

export default VariableSizeList
