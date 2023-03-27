import { motion } from "framer-motion"
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil";
import styled from "styled-components"
import { selectedDate, toDoCategory } from "../atom";
import Board from "./Components/Board";

const ToDoWrpper = styled(motion.div)`
  position: absolute;
  background-color: white;
  width: 85%;
  height: 550px;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 100px;
  border-radius: 10px;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
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
const Boards = styled.div`
  position: absolute;
  display: grid;
  width: 100%;
  top: 100px;
  grid-template-columns: repeat(3, 1fr);
`;

function ToDos() {
    const [date, setDate] = useRecoilState(selectedDate);
    const [toDos, setToDos] = useRecoilState(toDoCategory);
    const navigate = useNavigate();
    const onAddClicked = () => {
        navigate("/add");
    }

    const onDragEnd = (info: DropResult) => {
        const { destination, source, draggableId } = info;
        if(!destination) return;
        if (destination?.droppableId === source.droppableId) {
            setToDos((allBoards) => {
                const boardCopy = [...allBoards[source.droppableId]];
                boardCopy.splice(source.index, 1);
                boardCopy.splice(destination?.index, 0, draggableId);
                return {
                    ...allBoards,
                    [source.droppableId]: boardCopy
                }
            })
        }
        if(destination.droppableId !== source.droppableId) {
            setToDos((allBoards) => {
                const sourceCopy = [...allBoards[source.droppableId]];
                const targetCopy = [...allBoards[destination.droppableId]]
                sourceCopy.splice(source.index, 1);
                targetCopy.splice(destination.index, 0, draggableId);
                return {
                    ...allBoards,
                    [source.droppableId]: sourceCopy,
                    [destination.droppableId]: targetCopy
                }
            })
        }

    };
    return (
        <ToDoWrpper
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
        >
            <Add
                layoutId="todo"
                onClick={onAddClicked}
                whileHover={{ color: 'red' }}
            >
                +추가
            </Add>
            <DragDropContext onDragEnd={onDragEnd}>
                <Boards>
                    {Object.keys(toDos).map(boardId => <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />)}
                </Boards>
            </DragDropContext>
        </ToDoWrpper>
    )
}

export default ToDos;