import { ChangeEvent, useState } from 'react'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Chip } from '@nextui-org/chip'

interface ListProps {
  data?: string[]
  placeholder?: string
}

const List = ({data, placeholder}: ListProps) => {
  const [listData, setListData] = useState(data ? data : [''])

  const updateItem = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    let data = [...listData]
    data[index] = event.target.value
    setListData(data)
  }

  const addItem = () => {
    setListData([...listData, ''])
  }

  const removeItem = (index: number) => {
    let data = [...listData]
    data.splice(index, 1)
    setListData(data)
  }

  return (
    <>
      {
        listData.map((input, index) => {
          return (
            <div key={index} className='flex items-center gap-2'>
              <Chip variant='bordered' color='primary'>{index + 1}</Chip>
              <Input
                name='listData'
                size='sm'
                placeholder={placeholder}
                value={input}
                onChange={event => updateItem(index, event)}
              />
              <Button variant='ghost' size='sm' onPress={() => removeItem(index)}>
                Remove
              </Button>
            </div>
          )
        })
      }
      <Button variant='ghost' size='sm' onPress={addItem}>
        Add
      </Button>
    </>
  )
}

export default List
