"use client"
import "../EstructuraLoginRegister/EstructuraLoginRegister.scss"
import { useState } from "react"
import axios from "axios"
import EstructuraLoginRegister from "../EstructuraLoginRegister/EstructuraLoginRegister"
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion"
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react"

const Register = ({ setIsOpenRegister, setIsOpenLogin }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post("/api/register", {
                name,
                email: email.toLowerCase(),
                password
            });

            if (result.status === 201) {
                console.log("La creación de usuario fue exitosa");
                setIsOpenRegister(false);
                setIsOpenLogin(true);
            }

        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                setError(data.error || "Error desconocido");
                console.log(data.error);
            } else {
                setError("Error de conexión o solicitud fallida");
                console.log("Error de conexión o solicitud fallida", error.message);
            }
        }
    };

    return (
        <EstructuraLoginRegister>

            <div className="contenedor-de-boton">
                <div className="cont">
                    <IoClose className="close-icon" onClick={() => { setIsOpenLogin(false), setIsOpenRegister(false) }} />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="div-login">

                <div className="login-titulo">
                    <h2>¡Bienvenido de nuevo!</h2>
                </div>

                <div className="titulo-dee-registro">
                    <h3> Creá tu cuenta  </h3>
                </div>

                <form onSubmit={handleRegister} className='formulario-ddbb'>
                    <div className="contenedor-de-inputs">
                        <label htmlFor="name">Nombre completo</label>
                        <div className="envoltura-de-input">
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                    </div>
                    <div className="contenedor-de-inputs">
                        <label htmlFor="email">Email</label>
                        <div className="envoltura-de-input">
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                    </div>
                    <div className="contenedor-de-inputs">
                        <label htmlFor="password">Password</label>
                        <div className="envoltura-de-input">
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <p className="aclaracion-texto">*La contraseña debe tener al menos 6 caracteres*</p>
                    </div>

                    {error && <p className="error">{error}</p>}

                    <button className='boton-para-ingresar' type="submit">Registrate</button>
                </form>

                <div className="botones" style={{ marginTop: "12px" }}>
                    <button className="boton-generico" onClick={() => signIn("google")}>
                        <div className="icono-boton-google" onClick={() => signIn("google")}> <FcGoogle className="icon" /> </div>
                        <div className="texto">
                            <p> Registrate con Google </p>
                        </div>
                    </button>
                </div>

                <div className="confirmacion">
                    <p>¿Tenés una cuenta?</p>
                </div>

                <div className="confirmacion-boton">
                    <button className="link-acceso" onClick={() => { setIsOpenLogin(true), setIsOpenRegister(false) }}> Iniciá sesión </button>
                </div>

                <div className="terminos-condiciones">
                    <p>Acepto los términos y condiciones de Nebula Blog. </p>
                </div>

            </motion.div>
        </EstructuraLoginRegister>
    )
}

export default Register;
