"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import StructureConfigData from "./StructureConfigData"
import { useSession } from "next-auth/react"
import toast, { Toaster } from "react-hot-toast"

const DataBio = ({ setIsOpenDataBio }) => {
    const { data: session } = useSession()
    const [nombreCompleto, setNombreCompleto] = useState("")
    const [pronombres, setPronombres] = useState("")
    const [edad, setEdad] = useState(null)
    const [bio, setBio] = useState("")
    const [lengthStates, setLengthBio] = useState({
        lengthNombreCompleto: 0,
        lengthPronombres: 0,
        lengthBio: 0
    })
    const [datosIngresados, setDatosIngresados] = useState([])
    const [postOrPut, setPostOrPut] = useState("post")

    const handleBio = async (e) => {
        e.preventDefault()
        const metodo = postOrPut === "put" ? "put" : "post"

        try {
            const result = await axios[metodo](`/api/detalles/bio`, {
                user: session?.user?.id,
                nombreCompleto: nombreCompleto,
                bio: bio,
                edad: edad,
                pronombres: pronombres
            })

            if (result.status === 200 || result.status === 201) {
                toast.success(postOrPut === "put" ? "Datos actualizados exitosamente" : "Datos guardados exitosamente")
                setTimeout(() => {
                    setIsOpenDataBio(false)
                }, 1400);

                console.log(`Se acciona el metodo: ${postOrPut}`)
            }

        } catch (error) {
            if (error.response) {
                const { status, data } = error.response
                console.error(`Error ${status}: ${data.error}`)
                toast.error(`Error ${status}: ${data.error}`)
            } else {
                console.error('Error de red o solicitud fallida:', error.message)
            }
        }
    }

    useEffect(() => {
        setLengthBio({
            lengthNombreCompleto: nombreCompleto.length,
            lengthPronombres: pronombres.length,
            lengthBio: bio.length
        })
    }, [nombreCompleto, pronombres, bio])


    useEffect(() => {
        const obtenerDatosIngresados = async () => {
            try {
                const result = await axios.get(`/api/detalles/bio?id=${session?.user?.id}`)
                setDatosIngresados(result.data.result)

                if (result.data.result) {
                    setPostOrPut("put")
                }

            } catch (error) {
                if (error.response) {
                    const { status, data } = error.response
                    console.error(`Error ${status}: ${data.error}`)
                } else {
                    console.error('Error de red o solicitud fallida:', error.message)
                }
            }
        }

        obtenerDatosIngresados()
    }, [])

    return (
        <StructureConfigData
            titulo="Biografía"
            childrenInputs={
                <>
                    <div className="contenedor-input-config">
                        <div className="label">
                            <label htmlFor="nombre">Nombre y apellidos</label>
                        </div>
                        <div className="input-texto">
                            <input type="text" maxLength={50} placeholder={datosIngresados?.nombreCompleto ? datosIngresados?.nombreCompleto : "Jack McCormick"}
                                onChange={(e) => setNombreCompleto(e.target.value)} value={nombreCompleto} required />
                        </div>
                        <div className="texto-aclaratorio">
                            <div className="aclaratorio">
                                <p style={{ color: lengthStates.lengthNombreCompleto === 50 && "red" }}> {lengthStates.lengthNombreCompleto}/50 </p>
                            </div>
                        </div>

                        <div className="label">
                            <label htmlFor="edad">Edad</label>
                        </div>
                        <div className="input-texto">
                            <input type="number" maxLength={50} placeholder="29"
                                onChange={(e) => setEdad(e.target.value)} value={edad} required />
                        </div>
                        <div className="texto-aclaratorio">
                            <div className="aclaratorio">
                                <p style={{ color: edad < 0 || edad > 99 ? "red" : "var(--font-color-principal-dentro)" }}> de 0 a 99 </p>
                            </div>
                        </div>

                        <div className="label">
                            <label htmlFor="pronombres">Pronombres</label>
                        </div>
                        <div className="input-texto">
                            <input type="text" placeholder={datosIngresados?.pronombres ? datosIngresados?.pronombres : "Ej: El, Ella, Ello, Elle..."} maxLength={4}
                                onChange={(e) => setPronombres(e.target.value)} value={pronombres} required />
                        </div>
                        <div className="texto-aclaratorio">
                            <div className="aclaratorio">
                                <p style={{ color: lengthStates.lengthPronombres === 4 ? "red" : "var(--font-color-principal-dentro)" }}> {lengthStates.lengthPronombres}/4 </p>
                            </div>
                        </div>

                        <div className="label">
                            <label htmlFor="bio">Bio</label>
                        </div>
                        <div className="input-texto">
                            <textarea maxLength={200} type="text" placeholder={datosIngresados?.bio ? datosIngresados?.bio : "Escriba una biografía suya..."}
                                onChange={(e) => setBio(e.target.value)} value={bio} required />
                        </div>
                        <div className="texto-aclaratorio">
                            <div className="aclaratorio">
                                <p style={{ color: lengthStates.lengthBio === 200 && "red" }}> {lengthStates.lengthBio}/200 </p>
                            </div>
                        </div>
                    </div>
                    <Toaster />
                </>
            }

            botones={
                <>
                    <button className="boton-cancelar" onClick={() => setIsOpenDataBio(false)}> Cancelar </button>
                    <button className="boton-guardar" onClick={handleBio}> Guardar </button>
                </>
            }

        />
    )
}

export default DataBio