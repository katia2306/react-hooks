import { useState, useEffect, ChangeEvent, useRef } from 'react'

const TodoList = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [newItem, setNewItem] = useState<string>('')
  const [list, setList] = useState<string[]>(['apples', 'bananas', 'pencils'])

  const addNewItem = () => {
    setList([...list, newItem])
    setNewItem('')

    inputRef.current?.focus()
  }

  const onChangeItem = (event: ChangeEvent<HTMLInputElement>) => {
    setNewItem(event.target?.value)
  }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => {
        const listItems = data.slice(0, 10).map((item) => item.title)

        setList(listItems)
      })
  }, [])

  useEffect(() => {
    console.log('A new item to the list has been added')
  }, [list])

  return (
    <div className="todo-list-component">
      <ul>
        {list.map((item, index) => (
          <li key={`item-${index}`}>{item}</li>
        ))}
      </ul>

      <input
        ref={inputRef}
        type="text"
        className="new-item"
        value={newItem}
        onChange={onChangeItem}
      />
      <button className="btn-new-item" onClick={addNewItem}>
        Add Item
      </button>
    </div>
  )
}

export default TodoList
