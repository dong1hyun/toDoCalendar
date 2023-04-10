import { Droppable } from "react-beautiful-dnd"
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, selectedDate, toDoCategory } from "../../atom";
import ToDo from "./ToDo"

const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  min-height: 200px;
  min-width: 350px;
  background-color: rgba(37, 204, 247,1.0);
  margin: 20px;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  display: flex;
  flex-direction: column;
  -ms-overflow-style: none; /* IE and Edge */
  @media screen and (max-width: 500px) {
    min-width: 200px;
  }
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
    const [date, setDate] = useRecoilState(selectedDate);
    const month = date.getMonth() + 1;
    const curDate = "" + date.getFullYear() + month + date.getDate();
    const setToDos = useSetRecoilState(toDoCategory);
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const onValid = ({ toDo }: IForm) => { //새로운 toDo가 입력됐을 때
        const newToDo = {
            id: Date.now(),
            text: toDo
        }
        setToDos(allBoards => {
            return {
                ...allBoards,
                [curDate]:{
                ...allBoards[curDate],
                [boardId]: [
                    ...allBoards[curDate][boardId],
                    newToDo
                ]}
            }
        })
        setValue("toDo", "");
    }
    const onDelClicked = () => { //toDo 제거
        setToDos(allBoards => {
            const boardCopy = { ...allBoards[curDate] }
            delete boardCopy[boardId];
            return {
                ...allBoards,
                [curDate]:{
                ...boardCopy
            }}
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