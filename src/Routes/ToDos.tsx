import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil";
import styled from "styled-components"
import { selectedDate, toDoCategory } from "../atom";
import Board from "./Components/Board";
import { useEffect } from 'react';

const ToDoWrpper = styled(motion.div)`
  position: absolute;
  background-color: white;
  width: 80%;
  height: 80%;  
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 100px;
  border-radius: 10px;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  overflow: scroll;
  ::-webkit-scrollbar {
  display: none;
}
`
const Add = styled(motion.img)`
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 10px;
  width: 50px;
  height: 50px;
`
const Boards = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-around;
  width: 100%;
  top: 100px;
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

function ToDos() {
    const [toDos, setToDos] = useRecoilState(toDoCategory);
    const [date, setDate] = useRecoilState(selectedDate);
    const navigate = useNavigate();
    const onAddClicked = () => {
        navigate("/add");
    }
    const month = date.getMonth() + 1;
    const curDate = "" + date.getFullYear() + month + date.getDate();
    const curToDos = toDos[curDate];
    if (!curToDos) {  //현재 날짜의 보드가 없는 상태이면 
        setToDos(allBoards => {  //새로 만듦
            return {
                ...allBoards,
                [curDate]: {}
            }
        });
    }
    return (
        <ToDoWrpper
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
        >
            <Add
                layoutId="todo"
                onClick={onAddClicked}
                whileHover={{ scale: 1.2 }} //한 번 실행 후 동작하지 않는 버그
                src={require("../images/addBtn.png")}
            />
            <Boards>
                {curToDos ? Object.keys(curToDos).map(boardId => <Board boardId={boardId} key={boardId} toDos={curToDos[boardId]} />) : "Loading"}
            </Boards>
        </ToDoWrpper>
    )
}

export default ToDos;