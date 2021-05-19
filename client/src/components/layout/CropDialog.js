import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const CropDialog = ({open,onClose,children,onSave}) => {
  return (
    <>
      <Modal show={open} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crop Image</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {children}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onClose} variant="secondary">Close</Button>
          <Button onClick={onSave} variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CropDialog
