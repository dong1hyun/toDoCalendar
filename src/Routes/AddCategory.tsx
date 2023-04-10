import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { selectedDate, toDoCategory } from "../atom";
import Overlay from "./Components/Overlay";

const Wrapper = styled(motion.div)`
  position: absolute;
  padding: 10px;
  width: 500px;
  height: 200px;
  border-radius: 10px;
  top: 150px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: rgba(206, 214, 224,1.0);
  @media screen and (max-width: 500px) {
    width: 250px;
  }
`;
const Input = styled.input`
    position: absolute;
    top: 30%;
    font-size: 30px;
    width: 80%;
    height: 50%;
    border: none;
    border-radius: 10px;
    left: 0; 
    right: 0; 
    margin: 0 auto;
`


interface IForm {
    category: string
}

function AddCategory() {
    const [date, setDate] = useRecoilState(selectedDate);
    const month = date.getMonth() + 1;
    const curDate = "" + date.getFullYear() + month + date.getDate();
    const [toDos, setToDos] = useRecoilState(toDoCategory);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<IForm>()
    const onValid = ({ category }: IForm) => {
        if(category.length > 10) {
            alert("최대 10자까지만 가능합니다.");
            return;
        }
        if(Object.keys(toDos[curDate]).length === 3) {
            alert("카테고리는 최대 3개까지 만들 수 있습니다.");
            navigate('/');
            return;
        }
        setToDos(allBoards => {
            const result = 
            {
                ...allBoards,
                [curDate]:{
                    ...allBoards[curDate],
                    [category]: []
                }
            }
            localStorage.setItem('toDoList', JSON.stringify(result));
            return result
        });
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
                </form>
            </Wrapper>
        </>
    )
}

export default AddCategory;