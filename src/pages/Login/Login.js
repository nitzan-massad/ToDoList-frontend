import React, { useState, useContext } from 'react'

import Input from '../../Components/FormElements/Input'
import Button from '../../Components/FormElements/Button'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/validators'
import { useForm } from '../../shared/hooks/form-hook'
import './Login.css'
import { AuthContext } from '../../shared/context/AuthContext'
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'
import ErrorModal from '../../Components/ErrorModal/ErrorModal'
import { useHtppClient } from '../../shared/hooks/http-hook'

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const { isLoading, error, sendRequest, clearError } = useHtppClient()
  const auth = useContext(AuthContext)

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          firstName: undefined,
          lastName: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      )
    } else {
      setFormData(
        {
          ...formState.inputs,
          firstName: {
            value: '',
            isValid: false
          },
          lastName: {
            value: '',
            isValid: false
          }
        },
        false
      )
    }
    setIsLoginMode(prevMode => !prevMode)
  }

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  )

  const authSubmitHandler = async event => {
    event.preventDefault()

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          '/api/users/login',
          'POST',
          {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          },
          { 'Content-Type': 'application/json' }
        )
        auth.login(responseData.userId,responseData.firstName,responseData.lastName, responseData.token)
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          '/api/users/signup',
          'POST',
          {
            firstName: formState.inputs.firstName.value,
            lastName: formState.inputs.lastName.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          },
          {
            'Content-Type': 'application/json'
          }
        )
        auth.login(responseData.userId,responseData.firstName,responseData.lastName, responseData.token)
      } catch (err) {}
    }
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className='authentication'>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2> {isLoginMode ? 'LOGIN' : 'SIGNUP'}</h2>
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <div className='login-last-name-first-name__div'>
              <Input
                element='input'
                id='firstName'
                type='text'
                label='First Name'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter a first name.'
                onInput={inputHandler}
              />
              <Input
                element='input'
                id='lastName'
                type='text'
                label='Last Name'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter a last name.'
                onInput={inputHandler}
              />
            </div>
          )}
          <Input
            element='input'
            id='email'
            type='email'
            label='E-Mail'
            validators={[VALIDATOR_EMAIL()]}
            errorText='Please enter a valid email address.'
            onInput={inputHandler}
          />
          <Input
            element='input'
            id='password'
            type='password'
            label='Password'
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText='Please enter a valid password, at least 6 characters.'
            onInput={inputHandler}
          />
          <Button type='submit' disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
          <br />
        </form>
        <button
          className='switch-login-signup__btn'
          inverse='true'
          onClick={switchModeHandler}
        >
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </button>
      </div>
    </React.Fragment>
  )
}

export default Login
