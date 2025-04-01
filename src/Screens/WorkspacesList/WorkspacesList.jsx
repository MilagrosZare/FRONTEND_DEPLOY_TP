import React, { useEffect, useState } from 'react'
import './WorkspacesList.css'
import '../assets/normalize.css'
import WorkspaceView from '../WorkspaceView/WorkspaceView'

const WorkspacesList = () => {
    const [workspaces, setWorkspaces] = useState([]);  // Estado para almacenar los workspaces
    const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
    const [error, setError] = useState(null); // Estado para manejar errores
  
    useEffect(() => {
      // Aquí iría tu lógica de obtención de workspaces desde la API o contexto
      const fetchWorkspaces = async () => {
        try {
          const response = await fetch('/api/workspaces'); // Cambia esta URL por la que estés usando
          if (!response.ok) {
            throw new Error('Error al obtener los workspaces');
          }
          const data = await response.json();
          setWorkspaces(data); // Asignamos los workspaces obtenidos al estado
        } catch (err) {
          setError(err.message); // En caso de error, lo capturamos
        } finally {
          setLoading(false); // Terminamos la carga
        }
      };
  
      fetchWorkspaces();
    }, []);
/*     const { workspaces } = useContext(AuthContext) */

    return (
        <div className='screen'>
            <div className='header-container-workspaces'>
                <div className='header-left-side'>
                    <div className='container-img'>
                        <img src="/slack-logo-white.png" alt="logo-Slack" className='slack-logo-white' />
                    </div>
                    <div className='header-options'>
                        <span className='option'>Funciones <i className="bi bi-chevron-down arrow" id="chevron-down"></i></span>
                        <span className='option'>Soluciones <i className="bi bi-chevron-down" id="chevron-down"></i></span>
                        <span className='option'>Empresa</span>
                        <span className='option'>Recursos <i className="bi bi-chevron-down" id="chevron-down"></i></span>
                        <span className='option'>Precios</span>
                    </div>
                </div>
                <div className='header-right-side'>
                    <div className='button-header'>
                        <button className='talk-to-sales'>HABLAR CON VENTAS</button>
                        <button className='new-space'>CREAR UN NUEVO ESPACIO DE TRABAJO</button>
                    </div>
                </div>
            </div>
            <div className="all-container">
                <div className='welcome'>
                    <picture className="u-display--inline-block">
                        <source src="https://a.slack-edge.com/6c404/marketing/img/homepage/bold-existing-users/waving-hand.gif" srcSet="https://a.slack-edge.com/6c404/marketing/img/homepage/bold-existing-users/waving-hand.gif 1x, https://a.slack-edge.com/6c404/marketing/img/homepage/bold-existing-users/waving-hand@2x.gif 2x" media="(prefers-reduced-motion: no-preference)"></source>
                        <img src="https://a.slack-edge.com/70d4c04/marketing/img/homepage/signed-in-users/waving-hand.png" srcSet="https://a.slack-edge.com/70d4c04/marketing/img/homepage/signed-in-users/waving-hand.png 1x, https://a.slack-edge.com/70d4c04/marketing/img/homepage/signed-in-users/waving-hand@2x.png 2x" /* alt height="56" width="52"  *//>
                    </picture>
                    <h1 className='welcome-words'>¡Hola de nuevo!</h1>
                </div>
                <div className='separator'>
                <div className='workspaces-container'>
                    <div className='workspaces-container-header'>
                        <span className= "workspaces-sentence">Espacios de trabajo</span>
                    </div>
                    <div className='workspaces'>
                            <WorkspaceView/>
                        </div>
                </div>
                <div className='workspaces-container-footer'>
                <div className='workspaces-footer-one'>
                    <div className='left-side'>
                    <img src="/woman-laptop.png" /* alt="woman-laptop"  */className='woman-laptop'/>
                        <span className='suggestion'>¿Quieres usar Slack con otro equipo?</span>
                        </div>
                        <div className='right-side'>
                        <button className='new-space' id='new-space'>CREAR UN NUEVO ESPACIO DE TRABAJO</button>
                        </div>
                    </div>
                    </div>
                    </div>
                    <div className='workspaces-footer-two'>
                        <span className='footer-sentence-one'>¿No encuentras tu espacio de trabajo? </span> <span className='footer-sentence-two'> Prueba con otro correo electrónico <i className="bi bi-arrow-right"></i></span>
                    </div>
            </div>
        </div>
    )
}

export default WorkspacesList