import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { URL } from "url";
import { toDoCategory } from "../atom";
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
const Input = styled.input`
    position: absolute;
    top: 30%;
    font-size: 30px;
    width: 80%;
    height: 30%;
    border: none;
    border-radius: 10px;
    left: 0; 
    right: 0; 
    margin: 0 auto;
`
const ComBtn = styled(motion.img)`
    position: absolute;
    width: 50px;
    height: 50px;
    left: 0; 
    right: 0; 
    bottom: 25px;
    margin: 0 auto;
`

interface IForm {
    category: string
}

function AddCategory() {
    const [toDos, setToDos] = useRecoilState(toDoCategory);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<IForm>()
    const onValid = ({ category }: IForm) => {
        if(Object.keys(toDos).length === 3) {
            alert("카테고리는 최대 3개까지 만들 수 있습니다.");
            navigate('/');
            return;
        }
        const boardCopy = {...toDos};
        boardCopy[category] = [];
        setToDos(boardCopy);
        setValue("category", "");
        navigate('/');
    }
    return (
        <>
            <Overlay />
            <Wrapper layoutId="todo">
                <h1>카테고리를 만들어보세요.</h1>
                <form onSubmit={handleSubmit(onValid)}>
                    <Input 
                    {...register("category", {required: true})} 
                    type="text" 
                    />
                
                {/* <button style={{backgroundImage:URL("../images/completeBtn.png")}}>
                </button> */}
                </form>
            </Wrapper>
        </>
    )
}

export default AddCategory;