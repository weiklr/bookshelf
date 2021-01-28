import React from 'react'
// 🐨 you're going to need the Dialog component
// It's just a light wrapper around ReachUI Dialog
// 📜 https://reacttraining.com/reach-ui/dialog/
import {Dialog} from './lib'

// 💰 Here's a reminder of how your components will be used:
/*
<Modal>
  <ModalOpenButton>
    <button>Open Modal</button>
  </ModalOpenButton>
  <ModalContents aria-label="Modal label (for screen readers)">
    <ModalDismissButton>
      <button>Close Modal</button>
    </ModalDismissButton>
    <h3>Modal title</h3>
    <div>Some great contents of the modal</div>
  </ModalContents>
</Modal>
*/

// we need this set of compound components to be structurally flexible
// meaning we don't have control over the structure of the components. But
// we still want to have implicitly shared state, so...
// 🐨 create a ModalContext here with React.createContext
const ModalContext = React.createContext()

// 🐨 create a Modal component that manages the isOpen state (via useState)
// and renders the ModalContext.Provider with the value which will pass the
// isOpen state and setIsOpen function
const Modal = props => {
  const [isOpen, setIsOpen] = React.useState(false)
  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />
}

const useModalContext = () => {
  const context = React.useContext(ModalContext)
  if (context === undefined) {
    throw new Error('Component must be used within a ModalProvider')
  }
  return context
}

const ModalDismissButton = props => {
  const [, setIsOpen] = useModalContext()
  const {children, ...otherProps} = props
  const childElement = React.Children.only(children)
  return React.cloneElement(childElement, {
    ...otherProps,
    setIsOpen,
    onClick: () => setIsOpen(false),
  })
}

const ModalOpenButton = props => {
  const [, setIsOpen] = useModalContext()
  const {children, ...otherProps} = props
  const childElement = React.Children.only(children)
  return React.cloneElement(childElement, {
    ...otherProps,
    setIsOpen,
    onClick: () => setIsOpen(true),
  })
}

const ModalContents = props => {
  const [isOpen, setIsOpen] = useModalContext()
  const {children, ...otherProps} = props
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...otherProps}>
      {children}
    </Dialog>
  )
}

export {
  ModalContents,
  ModalDismissButton,
  ModalOpenButton,
  Modal,
  useModalContext,
}

// 🐨 create a ModalDismissButton component that accepts children which will be
// the button which we want to clone to set it's onClick prop to trigger the
// modal to close
// 📜 https://reactjs.org/docs/react-api.html#cloneelement
// 💰 to get the setIsOpen function you'll need, you'll have to useContext!
// 💰 keep in mind that the children prop will be a single child (the user's button)

// 🐨 create a ModalOpenButton component which is effectively the same thing as
// ModalDismissButton except the onClick sets isOpen to true

// 🐨 create a ModalContents component which renders the Dialog.
// Set the isOpen prop and the onDismiss prop should set isOpen to close
// 💰 be sure to forward along the rest of the props (especially children).

// 🐨 don't forget to export all the components here
