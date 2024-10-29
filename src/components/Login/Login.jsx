"use client"
import { useState } from "react";
import "../EstructuraLoginRegister/EstructuraLoginRegister.scss"
import { IoClose } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import EstructuraLoginRegister from "../EstructuraLoginRegister/EstructuraLoginRegister";
import { motion } from "framer-motion";

const Login = ({ setIsOpenLogin, setIsOpenRegister }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isOpenInputs, setIsOpenInputs] = useState(false)

    const ingresar = async (e) => {
        e.preventDefault()

        try {
            const result = await signIn("credentials", {
                email: email,
                password: password,
                redirect: false
            })

            if (result.ok) {
                window.location.href = `/blog`;
            } else if (result.error) {
                if (result.error === "El email o la contraseña son inválidos") {
                    setError("Email o contraseña inválidos. Por favor, verifica tus datos.");
                } else if (result.error === "Contraseña incorrecta") {
                    setError("La contraseña es incorrecta. Inténtalo nuevamente.");
                } else {
                    setError("Ocurrió un error inesperado. Inténtalo más tarde.");
                }
            }

        } catch (error) {
            setError("Ocurrió un error en el sistema. Inténtalo más tarde.");
            console.log(error);
        }
    }

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
                    <h2> Unirse a Nebula Blog </h2>
                </div>

                <div className="botones">
                    <button className="boton-generico" onClick={() => signIn("google")}>
                        <div className="icono-boton-google" onClick={() => signIn("google")}> <FcGoogle className="icon" /> </div>
                        <div className="texto">
                            <p> Ingresar con Google </p>
                        </div>
                    </button>
                    {!isOpenInputs &&
                        <button className="boton-generico">
                            <div className="icono-boton"> <CiMail className="icon" /> </div>
                            <div className="texto" onClick={() => setIsOpenInputs(true)}>
                                <p> Ingresar con email </p>
                            </div>
                        </button>
                    }
                </div>

                {isOpenInputs &&
                    <>

                        <div className="titulo-dee-logueo">
                            <h3> Ingresá tus credenciales </h3>
                        </div>

                        <form onSubmit={ingresar} className='formulario-ddbb'>
                            <div className="contenedor-de-inputs">
                                <label htmlFor="email">Email</label>
                                <div className="envoltura-de-input">
                                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="contenedor-de-inputs">
                                <label htmlFor="password">Password</label>
                                <div className="envoltura-de-input">
                                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>

                            {error && <p className="error">{error}</p>}

                            <button className='boton-para-ingresar' type="submit"> Ingresar </button>
                        </form>
                    </>
                }

                <div className="confirmacion">
                    <p> ¿No tenés una cuenta? </p>
                </div>

                <div className="confirmacion-boton">
                    <button className="link-acceso" onClick={() => { setIsOpenLogin(false), setIsOpenRegister(true) }}> Registrate </button>
                </div>

                <div className="terminos-condiciones">
                    <p> Acepto los términos y condiciones de Nebula Blog. </p>
                </div>

            </motion.div>
        </EstructuraLoginRegister>
    )
}

export default Login