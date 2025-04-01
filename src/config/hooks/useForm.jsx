import { useState } from "react"

export const useForm = (formInitialState) => {

        const [formState, setFormState] = useState(formInitialState)
        const handleChangeInput = (event) => {
            const { name, value } = event.target

            //Verificamos el posible imput de archivos.
            const file_value = event?.target?.files
            //Si el input es de tipo archivo, entonces leemos el archivo y lo guardamos en el estado.
            if (file_value && file_value[0] instanceof File){
                const file = file_value[0]
                const reader = new FileReader() //objeto que permite hacer lectura de archivos
                reader.onload = () => { //Programación orientada a eventos.
                    setFormState(
                        (prevFormState) => {
                        return { ...prevFormState, [name]: reader.result }
                    })
                }
                reader.readAsDataURL(file)
            }
            //Sino simplemente guardamos el valor en el estado
            else {
                setFormState(
                    (prevFormState) => {
                    return { ...prevFormState, [name]: value }
                })
            }
            
        }
        return {formState, handleChangeInput}
}
