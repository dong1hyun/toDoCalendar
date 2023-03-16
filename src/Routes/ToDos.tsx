import { motion } from "framer-motion"
import styled from "styled-components"

const ToDoWrpper = styled(motion.div)`
  background-color: white;
  position: absolute;
  width: 900px;
  height: 600px;
  left: 400px;
  right: 0;
  margin: 0 auto;
  top: 50px;
  border-radius: 10px;
`

const Add = styled(motion.span)`
    position: absolute;
    cursor: pointer;
    right: 10px;
    top: 10px;
    padding: 10px;
    border-top: 10px;
    background-color: tomato;
    border-radius: 10px;
`

function ToDos() {
    return (
        <ToDoWrpper
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
        >
            <span style={{padding:'10px'}}>
                <Add>+추가</Add>
            </span>
        </ToDoWrpper>
    )
}

export default ToDos;