import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { selectedDate, toDoCategory } from "../../atom";

const Card = styled.div<ICardProp>`
  position: relative;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.isDragging ? "rgba(154, 236, 219,1.0)" : "white"};
  opacity: ${(props) => props.isDragging ? 0.8 : null};
  `;
const DelBtn = styled.img`
  position: absolute;
  right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`
interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string
}

interface ICardProp {
  isDragging: boolean,
}

function DragabbleCard({ toDoId, toDoText, index, boardId }: IDragabbleCardProps) {
  const [date, setDate] = useRecoilState(selectedDate);
  const month = date.getMonth() + 1;
  const curDate = "" + date.getFullYear() + month + date.getDate();
  const [toDos, setToDos] = useRecoilState(toDoCategory);
  const onDelClicked = () => {
    setToDos(allBoards => {
      const boardCopy = [...allBoards[curDate][boardId]];
      boardCopy.splice(index, 1);
      return {
        [curDate]:{
        ...allBoards[curDate],
        [boardId]:boardCopy
      }}
    })
  }
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
          isDragging={snapshot.isDragging}
        >
          {toDoText}
          <DelBtn onClick={onDelClicked} src={require("../../images/deleteBtn.png")} />
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);