import React from 'react'
import { FixedSizeList as List } from 'react-window'
import { ReactWindowScroller } from 'react-window-scroller'
import { Row } from './Row'

const FixedSizeList = () => (
  <ReactWindowScroller>
    {({ ref, outerRef, style, onScroll }) => (
      <List
        ref={ref}
        outerRef={outerRef}
        style={style}
        height={window.innerHeight}
        itemCount={1000}
        itemSize={100}
        onScroll={onScroll}
      >
        {Row}
      </List>
    )}
  </ReactWindowScroller>
)

export default FixedSizeList
