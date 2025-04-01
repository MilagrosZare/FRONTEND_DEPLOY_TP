import React, { useEffect, useState } from 'react'
import { useForm } from '../../config/hooks/useForm.jsx'
import { useApiRequest } from '../../config/hooks/useApiRequest.jsx'
import ENVIROMENT from '../../config/enviroment.js'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FaChevronDown } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import './RewritePasswordScreen.css'



const RewritePasswordScreen = () => {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams(window.location.search)
    const reset_token = searchParams.get('reset_token')
    useEffect(
        () => {

            if (!reset_token) {
                navigate('/login')
            }

        },
        [reset_token]
    )

    const formInitialState = {
        newPassword: '',
        confirmPassword: '',
    }

    const { formState, handleChangeInput } = useForm(formInitialState)
    const { responseApiState, putRequest } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/rewrite-password') //contiene el estado de la solicitud (loading, error, success)
    const [passwordError, setPasswordError] = useState('')

    useEffect(
        () => {
            if (responseApiState.data) {
                navigate('/login')
            }
        },
        [responseApiState]
    )

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        if (formState.newPassword !== formState.confirmPassword) { //verifica si las contraseñas ingresadas son iguales.
            setPasswordError('Las contraseñas no coinciden') //muestra el error
        }
        try {
            await putRequest({ newPassword: formState.newPassword, confirmPassword: formState.confirmPassword, reset_token })

        } catch (error) {
            setPasswordError('Hubo un error al cambiar las contraseñas') //muestra el error
        }
    }

    return (
        <div className='main-container'>
            <div className='title-container'>
                <img src="./slack-logo.png" alt="logo de Slack" className='slack-logo' />
                <h1 className='slack-title'>Reestablece tu contraseña</h1>
            </div>
            <div className='rewrite-pwd-container'>
                <form onSubmit={handleSubmitForm} className='form-rewrite-pwd'>
                    <div className='new-and-confirm-pass-container'>
                        <div className='new-pass-container'>
                            <label htmlFor='newPassword'>Nueva contraseña</label>
                            <input
                                type='text'
                                name='newPassword'
                                value={formState.newPassword}
                                onChange={handleChangeInput}
                                className='input-password'
                            />
                        </div>
                        <div className='confirm-pass-container'>
                            <label htmlFor='confirmPassword'>Confirma la contraseña</label>
                            <input
                                type='text'
                                name='confirmPassword'
                                value={formState.confirmPassword}
                                onChange={handleChangeInput}
                                className='input-password'                                
                            />
                        </div>
                    </div>
                    <div className='rewrite-pwd-container-button'>
                        {
                            passwordError && <span style={{ color: 'red' }}>{passwordError}</span>
                        }
                        {
                            responseApiState.error && <span style={{ color: 'red' }}>{responseApiState.error}</span>
                        }
                        {
                            responseApiState.loading
                                ? <span>Cargando</span>
                                : (
                                    responseApiState.data
                                        ? <span>Enviado</span>
                                        : <button type='submit' className='rewrite-pwd-btn'>Establecer nueva contraseña</button>
                                )
                        }
                    </div>
                </form>
            </div>
      <div className='footer-container'>
            <span>Privacidad y términos</span>
            <span>Contactarnos</span>
            <div className='change-region'>
              <div className='icon-globe'>
            <CiGlobe />
            </div>
            <span>Cambiar región</span>
            <div className='icon-chevron-down'>
            <FaChevronDown />
            </div>
            </div>
      </div>
        </div>
    )
}

export default RewritePasswordScreen