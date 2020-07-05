import React, { useState } from 'react'
import FixedSizeList from './FixedSizeList'
import VariableSizeList from './VariableSizeList'
import FixedSizeGrid from './FixedSizeGrid'
import VariableSizeGrid from './VariableSizeGrid'

const lists = ['Fixed List', 'Variable List', 'Fixed Grid', 'Variable Grid']

const App = () => {
  const [selected, setSelected] = useState(lists[0])
  return (
    <>
      <nav>
        {lists.map((list) => (
          <button key={list} onClick={() => setSelected(list)}>
            {list}
          </button>
        ))}
      </nav>

      {selected === 'Fixed List' && <FixedSizeList />}
      {selected === 'Variable List' && <VariableSizeList />}
      {selected === 'Fixed Grid' && <FixedSizeGrid />}
      {selected === 'Variable Grid' && <VariableSizeGrid />}
    </>
  )
}

export default App
