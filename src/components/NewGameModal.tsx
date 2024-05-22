import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal'
import { Button } from '@nextui-org/button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenChange: () => void
  title: string
  newGame: (formData: FormData) => void
  options: JSX.Element
}

/*
  Instantiate NextUI's useDisclosure hook in the parent component:
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
*/
const NewGameModal = ({ isOpen, onClose, onOpenChange, title, newGame, options }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <form action={newGame}>
          <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
          <ModalBody>
            {options}
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' onPress={onClose}>
              Cancel
            </Button>
            <Button type='submit' variant='ghost' color='primary'>
              Start
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default NewGameModal
