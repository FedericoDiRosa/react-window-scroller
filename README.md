# react-window-scroller

> Window scroller component for react-window

[![NPM](https://img.shields.io/npm/v/react-window-scroller.svg)](https://www.npmjs.com/package/react-window-scroller) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://travis-ci.org/FedericoDiRosa/react-window-scroller.svg?branch=master)](https://travis-ci.org/FedericoDiRosa/react-window-scroller)

## Install

```bash
yarn add react-window-scroller
```

## Usage

**Check out the examples: [https://federicodirosa.github.io/react-window-scroller](https://federicodirosa.github.io/react-window-scroller)**

With a List component:

```jsx
import React from 'react'
import { FixedSizeList as List } from 'react-window'
import { ReactWindowScroller } from 'react-window-scroller'

const App = () => (
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
```

With a Grid component:

```jsx
import React from 'react'
import { VariableSizeGrid as Grid } from 'react-window'
import { ReactWindowScroller } from 'react-window-scroller'

const App = () => (
  <ReactWindowScroller isGrid>
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
```

## Props

| Prop name            | Type       | Description                                                                                | Default   |
| -------------------- | ---------- | ------------------------------------------------------------------------------------------ | --------- |
| **children**         | function   | Render props function called with 4 props: `ref`, `outerRef`, `style` and `onScroll`       | undefined |
| **throttleTime**     | number     | Timing (ms) for the throttle on window scroll event handler                                | 10        |
| **isGrid**           | boolean    | Set to true if rendering a react-window Grid component (FixedSizeGrid or VariableSizeGrid) | false     |
| **scrollElementRef** | ElementRef | The element in your project that is scrolling, if not window                               | window    |

## License

MIT © [FedericoDiRosa](https://github.com/FedericoDiRosa)
