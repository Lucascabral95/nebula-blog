import { motion } from "framer-motion";

import "./ConfigData.scss"

const StructureConfigData = ({ titulo, childrenInputs, botones }) => {

  return (
    <div className='config-data' >
      <motion.div className="contenedor-config-data"
        initial={{ y: 75, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>

        <div className="titulo-config">
          <h3> {titulo} </h3>
        </div>

        <div className="children-input">
          {childrenInputs}
        </div>

        <div className="botones-config">
          {botones}
        </div>

      </motion.div>
    </div>
  )
}

export default StructureConfigData;