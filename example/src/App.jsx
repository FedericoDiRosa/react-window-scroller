import React, { useMemo, useState, useEffect, useCallback } from 'react'
import FixedSizeList from './FixedSizeList'
import VariableSizeList from './VariableSizeList'
import FixedSizeGrid from './FixedSizeGrid'
import VariableSizeGrid from './VariableSizeGrid'

const types = ['window', 'element'];
const lists = ['Fixed List', 'Variable List', 'Fixed Grid', 'Variable Grid']

const App = () => {
  const [selectedType, setSelectedType] = useState(types[0]);
  const [selectedList, setSelectedList] = useState(lists[0]);
  // Normally we would use `useRef`, but since we are flipping back and forth we need to trigger a render.
  const [scrollElementRef, setScrollElementRef] = useState();

  useEffect(() => {
    if (selectedType === 'window') {
      document.body.style.overflow = 'inherit';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [selectedType])

  const currentScrollRef = useMemo(() => selectedType === 'element' ? scrollElementRef || undefined : undefined, [selectedType, scrollElementRef]);
  const getListSelected = useCallback(() => (
    <>
      {selectedList === 'Fixed List' && <FixedSizeList scrollElementRef={currentScrollRef} />}
      {selectedList === 'Variable List' && <VariableSizeList scrollElementRef={currentScrollRef} />}
      {selectedList === 'Fixed Grid' && <FixedSizeGrid scrollElementRef={currentScrollRef} />}
      {selectedList === 'Variable Grid' && <VariableSizeGrid scrollElementRef={currentScrollRef} />}
    </>
  ), [selectedList, currentScrollRef]);

  return (
    <>
      <nav>
        {types.map((demoType) => (
          <button key={demoType} onClick={() => setSelectedType(demoType)}>
            {demoType}
          </button>
        ))}
      </nav>
      <nav>
        {lists.map((list) => (
          <button key={list} onClick={() => setSelectedList(list)}>
            {list}
          </button>
        ))}
      </nav>
      {selectedType === 'element' && (
        <div className="wrapper">
          <div className="top-bar">Top Bar</div>
          <div className="main-body">
            <div className="main-body__left_bar">Left Bar</div>
            <div className="main-body__content" ref={setScrollElementRef}>
              <div className="main-body__content-tabs">Content Tabs</div>
              <div className="main-body__content-list">{getListSelected()}</div>
            </div>
          </div>
        </div>
      )}
      {selectedType === 'window' && getListSelected()}
    </>
  )
}

export default App
