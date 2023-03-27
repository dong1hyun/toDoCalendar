import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Overlay from "./Components/Overlay";

const Wrapper = styled(motion.div)`
  position: absolute;
  padding: 10px;
  width: 500px;
  height: 320px;
  border-radius: 10px;
  top: 150px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: rgba(206, 214, 224,1.0);
`;

function AddCategory() {
    const {
        register,
        handleSubmit
    } = useForm()
    return (
        <>
            <Overlay />
            <Wrapper layoutId="todo">
                <form>
                    <input type="text" />
                </form>
            </Wrapper>
        </>
    )
}

export default AddCategory;