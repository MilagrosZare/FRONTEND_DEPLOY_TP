import { useState } from "react"
import { ServerError } from "../../utils/error.util"

export const useApiRequest = (url) => {
    //Nos conviene guardar en el hook porque no es algo que vaya a variar entre componentes.
    const initialResponseApiState = { //estado inicial
        loading: false,
        error: null,
        data: null
    }


    const [responseApiState, setResponseApiState] = useState(initialResponseApiState)

    const postRequest = async (body) => { //usuario ya presionó "registrar"
        try {
            setResponseApiState({ ...initialResponseApiState, loading: true })

            //Enviar el formulario (estado) al backend.
            //Consulta HTTP
            //Fetch es una función que nos permite hacer consultas HTTP. Recibe la URL a consultar y un objeto de configuración. 
            //URL: string
            //Objeto: Object{ method, headers, body }
            const response = await fetch(
                url,
                {
                    method: 'POST', //si no se indica el método, por defecto es GET.
                    headers: {
                        "Content-Type": 'application/json', //cabeceras de la consulta: content type, nos permite comunicarle al backend qué tipo de contenido le estoy enviando (application/json)
                    },
                    body: JSON.stringify(body) //si se elige método GET, no se utiliza BODY
                }
            )

            const data = await response.json()

            console.log("Solicitud enviada")

            if (data.ok) {
                setResponseApiState((prevState) => {
                    return { ...prevState, data: data }
                })
            } else {
                throw new ServerError(data.message, data.status)
            }

        } catch (error) {
            console.log(error)
            setResponseApiState((prevState) => {
                if (error.status) { //Verificamos si es un error de servidor
                    return { ...prevState, error: error.message }
                }
                return { ...prevState, error: 'No se pudo enviar la información al servidor.' }
            })
        }
        finally { //Se ejecuta indistintamente al try o al catch, se ejecuta igual.
            setResponseApiState((prevState) => {
                return { ...prevState, loading: false }
            })
        }
    }

    const putRequest = async (body) => { //usuario ya presionó "registrar"
        try {
            setResponseApiState({ ...initialResponseApiState, loading: true })

            //Enviar el formulario (estado) al backend.
            //Consulta HTTP
            //Fetch es una función que nos permite hacer consultas HTTP. Recibe la URL a consultar y un objeto de configuración. 
            //URL: string
            //Objeto: Object{ method, headers, body }
            const response = await fetch(
                url,
                {
                    method: 'PUT', //si no se indica el método, por defecto es GET.
                    headers: {
                        "Content-Type": 'application/json', //cabeceras de la consulta: content type, nos permite comunicarle al backend qué tipo de contenido le estoy enviando (application/json)
                    },
                    body: JSON.stringify(body) //si se elige método GET, no se utiliza BODY
                }
            )

            const data = await response.json()


            console.log("Solicitud enviada")

            if (data.ok) {
                setResponseApiState((prevState) => {
                    return { ...prevState, data: data }
                })
            } else {
                throw new ServerError(data.message, data.ok)
            }

        } catch (error) {
            console.log(error)
            setResponseApiState((prevState) => {
                if (error.status) { //Verificamos si es un error de servidor
                    return { ...prevState, error: error.message }
                }
                return { ...prevState, error: 'No se pudo enviar la información al servidor.' }
            })
        }
        finally { //Se ejecuta indistintamente al try o al catch, se ejecuta igual.
            setResponseApiState((prevState) => {
                return { ...prevState, loading: false }
            })
        }
    }
    return {responseApiState, postRequest, putRequest}
}