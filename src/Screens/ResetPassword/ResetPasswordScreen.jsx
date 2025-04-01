import React, { useState } from 'react'
import { useForm } from '../../config/hooks/useForm.jsx'
import ENVIROMENT from '../../config/enviroment.js'
import { useApiRequest } from '../../config/hooks/useApiRequest.jsx'
import { FaChevronDown } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { Link } from 'react-router-dom'
import './ResetPasswordScreen.css'

const ResetPasswordScreen = () => {
    const formInitialState = {
        email: '', //se inicia con la información vacía
    }

    const { formState, handleChangeInput } = useForm(formInitialState)
    const { responseApiState, postRequest } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/reset-password') //manejo de errores
    /*     En caso de tener múltiples consultas y tuviera que configurar más de una dirección:
        const {
            responseApiState: responseApiState2,
            postRequest: postRequest2
        } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/test') */

    const handleSubmitForm = async (e) => { //maneja el envío del formulario cuando el usuario hace click en "reestablecer contraseña"
        e.preventDefault()  //manejará el evento para que no se recargue la página
        await postRequest(formState)

    }
    return (
        <div className='main-container'>
            <div className='title-container'>
                <img src="./slack-logo.png" alt="logo de Slack" className='slack-logo' />
                <h1 className='slack-title'>Reestablece tu contraseña</h1>
            </div>

            <div className='reset-pwd-container'>
                <form onSubmit={handleSubmitForm}> {/* se ejecuta handleSubmit cuando se envía el formulario */}

                    <div className='input-container'>
                        <label htmlFor="email" className='mail-label'>Ingresa tu email</label>
                        <input type="email"
                            placeholder='joedoe@gmail.com'
                            name='email'
                            value={formState.email} /* proviene de formState.mail, es el estado del formulario */
                            onChange={handleChangeInput} /* cuando el usuario escriba en los inputs se ejecutará "handleChangeInput" automáticamente para actualizar el estado */
                            required
                            className='mail-input' />
                    </div>
                    <div className='error-container'>
                        {
                            responseApiState.error && <span style={{ color: 'red' }}>{responseApiState.error}</span>
                        }
                    </div>
                    <div className='btn-reset-container'>
                        {
                            responseApiState.loading
                                ? <span className='reset-message'>Validando email, aguarde un momento.</span>
                                : (
                                    responseApiState.data
                                        ? <span className='reset-message'>¡Perfecto! En tu casilla de mails dejamos los pasos a seguir para reestablecer tu contraseña. </span>
                                        : <button type='submit' className='btn-reset'>Restablecer</button>
                                )
                        }
                    </div>
                    <div className='options-container-reset'>
                        <div>
                            <Link to={'/login'}>Ya tengo mi cuenta</Link>
                        </div>
                        <div>
                            <Link to={'/register'}>Aún no tengo una cuenta</Link>
                        </div>
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

export default ResetPasswordScreen