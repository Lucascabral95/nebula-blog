"use client"
import "./EstructuraCuerpoInterior.scss"

const EstructuraCuerpoInterior = ({ noticias, recomendaciones }) => {

    return (
        <div className='estructura-cuerpo-interior'>

            <div className="noticias">
                {noticias}
            </div>

            <div className="recomendaciones">
                {recomendaciones}
            </div>

        </div>
    )
}

export default EstructuraCuerpoInterior