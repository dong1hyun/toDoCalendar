import { motion } from 'framer-motion';
import styled from "styled-components"
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate, useMatch } from "react-router-dom"
import ToDos from './ToDos';
import { selectedDate, toDoCategory } from '../atom';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useEffect } from 'react';


const SelectedDate = styled(motion.div)`
  cursor: pointer;
  padding: 30px;
  font-size: 40px;
  border-radius: 10px;
  top: 10px;
  left: 10px;
  display:inline-block;
`;
const Img = styled.img<{ isDraggingOver: boolean }>`
  position: absolute;
  width: 50px;
  height: 50px;
  bottom: 30px;
  right: 30px;
  scale: ${props => props.isDraggingOver ? "1.5" : null};
  transition-duration: 0.5s;
`
function Home() {
  const [date, setDate] = useRecoilState(selectedDate);
  const [toDos, setToDos] = useRecoilState(toDoCategory);
  const homeMatch = useMatch("/");
  const navigate = useNavigate();
  const month = date.getMonth() + 1;
  const curDate = "" + date.getFullYear() + month + date.getDate();
  const onDateClicked = (year: number, month: number) => {
    navigate(`/days/${year}/${month}`);
  };
  const dateSelect = (date: any) => {
    let month = date.getMonth() + 1;
    let selectedDate = date.getFullYear() + '-' + month + '-' + date.getDate() + '-' + getDay(date.getDay());
    return selectedDate;
  }
  const getDay = (n: number) => {
    switch (n) {
      case 0:
        return "일요일"
      case 1:
        return "월요일"
      case 2:
        return "화요일"
      case 3:
        return "수요일"
      case 4:
        return "목요일"
      case 5:
        return "금요일"
      case 6:
        return "토요일"
    }
  }
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    if (destination.droppableId === "trashCan") {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[curDate][source.droppableId]];
        boardCopy.splice(source.index, 1);
        return {
          [curDate]: {
            ...allBoards[curDate],
            [source.droppableId]: boardCopy
          }}
      })
      return;
    }
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[curDate][source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          [curDate]: {
          ...allBoards[curDate],
          [source.droppableId]: boardCopy
        }}
      })
    }
    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceCopy = [...allBoards[curDate][source.droppableId]];
        const targetCopy = [...allBoards[curDate][destination.droppableId]]
        const taskObj = sourceCopy[source.index];
        sourceCopy.splice(source.index, 1);
        targetCopy.splice(destination.index, 0, taskObj);
        return {
          [curDate]: {
          ...allBoards[curDate],
          [source.droppableId]: sourceCopy,
          [destination.droppableId]: targetCopy
        }}
      })
    }
  };

  useEffect(() => {
    const JtoDos = localStorage.getItem('toDoList');
    if (JtoDos !== null && typeof (JtoDos) === "string") {
      setToDos(JSON.parse(JtoDos));
      // console.log("updated");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('toDoList', JSON.stringify(toDos));
    // console.log("saved");
  }, [toDos]);

  return (
    <>
      {
        homeMatch ?
          <>
            <SelectedDate
              whileHover={{ scale: 1.1 }} //한 번 클릭한 후에 whileHover={{ scale: 1.1 }}이 작동하지 않는 현상 발견
              layoutId='calendar'
              onClick={() => onDateClicked(date.getFullYear(), date.getMonth() + 1)}
            >
              {dateSelect(date)}
            </SelectedDate>
            <DragDropContext onDragEnd={onDragEnd}>
              <ToDos />
              <Droppable droppableId='trashCan'>
                {(magic, snapshot) =>
                  <Img
                    ref={magic.innerRef}
                    {...magic.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                    src={require('../images/trashCan.png')}
                  />
                }
              </Droppable>
            </DragDropContext>
          </>
          : null
      }
    </>
  );
}

export default Home;
