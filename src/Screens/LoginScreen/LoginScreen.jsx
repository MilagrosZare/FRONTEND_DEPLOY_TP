import React, { useContext, useEffect } from 'react'
import { useForm } from '../../config/hooks/useForm'
import { useApiRequest } from '../../config/hooks/useApiRequest'
import ENVIROMENT from '../../config/enviroment'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { FaChevronDown } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import './LoginScreen.css'
import '../assets/normalize.css'
import '../assets/styles.css'
import { AuthContext } from '../../Context/AuthContext'

const LoginScreen = () => {

  const { login } = useContext(AuthContext)

  const initialFormState = {
    email: '',
    password: '',
  }

  const { formState, handleChangeInput } = useForm(initialFormState)
  const { responseApiState, postRequest } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/login')
  const navigate = useNavigate()

  useEffect(() => {
    if (responseApiState.data) {
      console.log("✨✨Respuesta de la API:", responseApiState.data)
      const token = responseApiState.data?.data?.authorization_token

      if (token) {
        login(token)

        const workspaceId = responseApiState.data?.data?.workspace_id
        if (workspaceId) {
          navigate(`/workspaces/${workspaceId}`)
        } else {
          navigate("/workspaces")
        }
      } else {
        console.error("Token no encontrado en la respuesta de la API")
      }
    }
  }, [responseApiState, login, navigate])

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    await postRequest(formState)
    console.log('Estado de respuesta de la api dentro del handlesubmit:', responseApiState)

  }
  return (
    <div className='main-container'>
      <div className='title-container'>
        <img src="./slack-logo.png" alt="logo de Slack" className='slack-logo' />
        <h1 className='slack-title'>Inicia sesión en Slack</h1>
        <span className='slack-phrase'>Te sugerimos que uses la <b>dirección de correo electrónico que usas en el trabajo.</b></span>
      </div>
      <form onSubmit={handleSubmitForm} className='form-container'>
        <div className='input-and-btn-container'>
          <div className='mail-and-pass-container'>
            {/* Email imput */}
            <label htmlFor="email">Email (*)</label>
            <input
              type="text"
              id='email'
              name='email'
              placeholder='joedoe@gmail.com'
              value={formState.email}
              onChange={handleChangeInput}
              required
            />
            {/* Password imput */}
            <label htmlFor="password">Password (*)</label>
            <input type="password"
              id='password'
              name='password'
              value={formState.password}
              onChange={handleChangeInput}
              required />
            <Link to="/reset-password" className='redirector-pass'>
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className='btn-or-loading-container'>
            {responseApiState.error && <span style={{ color: 'red' }}>{responseApiState.error}</span>}
            {
              responseApiState.loading
                ? <span className='search-span'>Cargando</span>
                : <button className='login-btn'>Iniciar sesion</button>
            }
          </div>
          <Link to="/register" className='redirector-register'>
            ¿Es tu primera vez en Slack? Regístrate aquí
          </Link>
        </div>
        <div className='btn-additional-container'>
          <div className='google-container'>
            <button className='btn-additional'><img src="./google-logo.png" alt="Google Logo" className='logo' />Inicia sesión con Google</button>
          </div>
          <div className='apple-container'>
            <button className='btn-additional'><img src="./apple-logo.png" alt="Apple Logo" className='logo' />Inicia sesión con Apple</button>
          </div>
          <div className='github-container'>
            <button className='btn-additional'><img src="./github-logo.png" alt="GitHub Logo" className='logo' />Inicia sesión con GitHub</button>
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

export default LoginScreen