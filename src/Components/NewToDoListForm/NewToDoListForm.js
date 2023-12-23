import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Modal from '../../Components/Modal/Modal'
import './NewToDoListForm.css'
import Input from '../FormElements/Input'
import { VALIDATOR_REQUIRE } from '../../shared/validators'
import Button from '../../Components/FormElements/Button'
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'
import ErrorModal from '../../Components/ErrorModal/ErrorModal'
import { useForm } from '../../shared/hooks/form-hook'
import { useHtppClient } from '../../shared/hooks/http-hook'
import ColorPicker from '../ColorPicker/ColorPicker'

const NewToDoListForm = props => {
  const [colorList, setColorList] = useState('None')
  const { isLoading, error, sendRequest, clearError } = useHtppClient()
  const history = useHistory()
  const [formState, inputHandler] = useForm(
    {
      listTitle: {
        value: '',
        isValid: false
      },
    },
    false
  )

  const handleSubmitNewList = async event => {
    event.preventDefault()
    try {
      const responseData = await sendRequest(
        '/list/add-list-to-user',
        'POST',
        {
          listTitle: formState.inputs.listTitle.value,
          color: colorList
        },
        { 'Content-Type': 'application/json' }
      )

      const data = {
        listTitle: responseData.createdList.listTitle,
        listColor: responseData.createdList.color,
        listId: responseData.createdList._id,
        items:[]
      }
      props.closeNewToDoListModal()
      history.push({
        pathname: '/showList',
        state: { data }
      })
    } catch (err) {}
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={props.show}
        onCancel={props.closeNewToDoListModal}
        header={'Add New List'}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={
          <div>
            <Button type='submit' disabled={!formState.isValid}>
              Create
            </Button>
          </div>
        }
        onSubmit={handleSubmitNewList}
      >
        <div className='new-list-container'>
          <form>
            {isLoading && <LoadingSpinner asOverlay />}
            <Input
              element='input'
              id='listTitle'
              type='text'
              label='List Title'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter a valid list title.'
              onInput={inputHandler}
              class='list-name__input'
            />
            <ColorPicker pickedAction={setColorList}></ColorPicker>
          </form>
        </div>
      </Modal>
    </React.Fragment>
  )
}

export default NewToDoListForm
