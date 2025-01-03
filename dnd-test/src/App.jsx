import { Table } from "./cmp/Table.jsx"
import "./App.css"
import { useState } from "react"

import { closestCorners, DndContext } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

function App() {
  const [table, setTable] = useState({
    tableName: "SAR",
    rows: [
      { id: 'r1', text: "row1 column1", number: 11 },
      { id: 'r2', text: "row2 column1", number: 12 },
      { id: 'r3', text: "row3 column1", number: 13 }
    ]
  })

  
  const onDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = table.rows.findIndex(row => row.id === active.id)
      const newIndex = table.rows.findIndex(row => row.id === over.id)

      
      setTable(prev => ({
        ...prev,
        rows: arrayMove(prev.rows, oldIndex, newIndex)
      }))
    }
  }

  return (
    <div className="app">
      <h3>Dnd Test App</h3>
      <DndContext 
        collisionDetection={closestCorners} 
        onDragEnd={onDragEnd}>
        <Table table={table} />
      </DndContext>
    </div>
  )
}

export default App
