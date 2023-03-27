import { Droppable } from "react-beautiful-dnd"
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ITodo } from "../../atom";
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
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
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
    }
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
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const onValid = (data: IForm) => {
        console.log(data);
        setValue("toDo", "");
    }
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input
                    {...register("toDo", { required: true })}
                    type="text"
                    placeholder={`Add task on ${boardId}`}
                />
            </Form>
            <Droppable droppableId={boardId}>
                {(magic, snapshot) => (
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
                            />
                        ))}
                        {magic.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    )
}

export default Board;