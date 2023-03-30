import { Droppable } from "react-beautiful-dnd"
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoCategory } from "../../atom";
import ToDo from "./ToDo"

const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  min-height: 200px;
  background-color: rgba(37, 204, 247,1.0);
  margin: 20px;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  display: flex;
  flex-direction: column;
`;

const Area = styled.div<IAreaProps>`
    background-color: ${props =>
        props.isDraggingOver ? "rgba(25, 42, 86,1.0)" :
            props.isDraggingFromThis ? "rgba(64, 115, 158,1.0)" : null};
    flex-grow: 1;
    border-radius: 5px;
    transition: background-color .3s ease-in-out;
`
const Form = styled.form`
    width: 100%;
    input {
        width: 100%;
        border: none;
        border-radius: 5px;
        margin-bottom: 10px;
    }
`
const Header = styled.div`
    display: flex;
    justify-content: space-between;
`
const Title = styled.h2`
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
  display: inline-block;
`;
const DelBtn = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`
const Input = styled.input`
    height: 20px;
`

interface IBoardProps {
    toDos: ITodo[];
    boardId: string;
}

interface IAreaProps {
    isDraggingOver: boolean,
    isDraggingFromThis: boolean
}

interface IForm {
    toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
    const setToDos = useSetRecoilState(toDoCategory);
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const onValid = ({ toDo }: IForm) => {
        const newToDo = {
            id: Date.now(),
            text: toDo
        }
        setToDos(allBoards => {
            return {
                ...allBoards,
                [boardId]: [
                    ...allBoards[boardId],
                    newToDo
                ]
            }
        })
        setValue("toDo", "");
    }
    const onDelClicked = () => {
        setToDos(allBoards => {
            const boardCopy = {...allBoards}
            delete boardCopy[boardId];
            return {
                ...boardCopy
            }
        });
    }
    return (
        <Wrapper>
            <Header>
                <Title>{boardId}</Title>
                <DelBtn 
                onClick={onDelClicked}
                src={require("../../images/deleteBtn.png")}
                />
            </Header>
            
            <Form onSubmit={handleSubmit(onValid)}>
                <Input
                    {...register("toDo", { required: true })}
                    type="text"
                    placeholder={`Add task on ${boardId}`}
                />
            </Form>
            <hr />
            <Droppable droppableId={boardId}>
                {(magic, snapshot) => {
                    return (
                        <Area
                            ref={magic.innerRef}
                            {...magic.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                        >
                            {toDos.map((toDo, index) => (
                                <ToDo
                                    key={toDo.id}
                                    index={index}
                                    toDoId={toDo.id}
                                    toDoText={toDo.text}
                                    boardId={boardId}
                                />
                            ))}
                            {magic.placeholder}
                        </Area>
                    )
                }}
            </Droppable>
        </Wrapper>
    )
}

export default Board;