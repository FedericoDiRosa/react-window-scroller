# react-window-scroller

> Window scroller component for react-window

[![NPM](https://img.shields.io/npm/v/react-window-scroller.svg)](https://www.npmjs.com/package/react-window-scroller) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://travis-ci.org/FedericoDiRosa/react-window-scroller.svg?branch=master)](https://travis-ci.org/FedericoDiRosa/react-window-scroller)

## Install

```bash
yarn add react-window-scroller
```

## Usage

Check out the examples: https://federicodirosa.github.io/react-window-scroller/

```jsx
import React from 'react'
import { FixedSizeList as List } from 'react-window'
import { ReactWindowScroller } from 'react-window-scroller'

const App = () => (
  <ReactWindowScroller>
    {({ ref, style, onScroll }) => (
      <List
        ref={ref}
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
```

Also compatible with Grid component

```jsx
import React from 'react'
import { VariableSizeGrid as Grid } from 'react-window'
import { ReactWindowScroller } from 'react-window-scroller'

const App = () => (
  <ReactWindowScroller>
    {({ ref, style, onScroll }) => (
      <Grid
        ref={ref}
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
```

## License

MIT © [FedericoDiRosa](https://github.com/FedericoDiRosa)
