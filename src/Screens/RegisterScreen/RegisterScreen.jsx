import React, { useState } from 'react'
import ENVIROMENT from '../../config/enviroment.js'
import { useForm } from '../../config/hooks/useForm.jsx'
import { useApiRequest } from '../../config/hooks/useApiRequest.jsx'
import { FaChevronDown } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import './RegisterScreen.css'
import '../assets/styles.css'
import { Link } from 'react-router-dom'

const RegisterScreen = () => {
    const formInitialState = {
        username: '',
        email: '',
        password: '',
        profile_image_base64: ''
    }

    const { formState, handleChangeInput } = useForm(formInitialState)

    const { responseApiState, postRequest } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/register')


    const handleSubmitForm = async (event) => {
        event.preventDefault()
        console.log(formState)
        await postRequest(formState)
    }

    return (
        <div className='main-container'>
            <div className='title-container'>
                <img src="./slack-logo.png" alt="logo de Slack" className='slack-logo' />
                <h1 className='slack-title'>Regístrate en Slack</h1>
                <span className='slack-phrase'>Te sugerimos que uses la <b>dirección de correo electrónico que usas en el trabajo.</b></span>
            </div>
            <form onSubmit={handleSubmitForm} className='register-container'>
                <div className='data-filling-container'>
                    <div className='data-container'>
                        <label htmlFor='username'>Nombre de usuario (*)</label>
                        <input
                            placeholder='Joe Doe'
                            type='text'
                            id='username'
                            name='username'
                            value={formState.username}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>
                    <div className='data-container'>
                        <label htmlFor='email'>Email (*)</label>
                        <input
                            placeholder='joedoe@mail.com'
                            type='email'
                            id='email'
                            name='email'
                            value={formState.email}
                            onChange={handleChangeInput}
                            register
                        />
                    </div>
                    <div className='data-container'>
                        <label htmlFor='password'>Contraseña (*)</label>
                        <input
                            placeholder='Example_password123'
                            type='text'
                            id='password'
                            name='password'
                            value={formState.password}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className='data-container'>
                        <label htmlFor='profile-image-base64'>Imagen de perfil</label>
                        <input
                            type='file'
                            id='profile-image-base64'
                            name='profile-image-base64'
                            onChange={handleChangeInput}
                            className='file-input'
                        />
                    </div>
                </div>
                {
                    formState.profile_image_base64 && <img src={formState.profile_image_base64} alt='profile' style={{ width: '100px', height: '100px' }} />
                }
                <div className='searching-register'>
                    {
                        responseApiState.error && <span style={{ color: 'red' }}>{responseApiState.error}</span>
                    }
                    <div className='options-container'>
                        <div className='btn-l-container'>
                        {
                            responseApiState.loading
                                ? <span className='search-span'>Cargando</span>
                                : <button type='submit' className='register-btn' >Registrar</button> 
                        }
                        </div>
                        <div className='redirector-container'>
                        <Link to="/login" className='redirector-login'>
                            Ya tengo una cuenta
                        </Link>
                        </div>
                    </div>
                </div>
            </form>
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

export default RegisterScreen