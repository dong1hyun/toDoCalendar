import styled from "styled-components";
import { AnimatePresence, motion } from 'framer-motion';
import { useMatch, useNavigate, useParams } from "react-router-dom"
import { useRecoilState } from "recoil";
import { selectedDate, toDoCategory } from "../atom";
import CalendarWrapper from "./Components/Calendar";
import Overlay from "./Components/Overlay";
import { useEffect } from "react";

const Calendar = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`
const DayWrapper = styled(motion.div)`
  text-align: center;
  padding-top: 25px;
  padding-bottom: 25px;
  border-radius: 10px;
  font-size: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
const Day = styled.div`
  
`
const PlanWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Plan = styled.div`
  font-size: 10px;
  border-radius: 5px;
  background-color: white;
`
const Dow = styled.span` //day of the week(요일)
  margin-bottom: 30px;
  text-align: center;
  font-size: 30px;
`
const SelectedYM = styled(motion.span)`
  display: inline-block;
  cursor: pointer;
  padding: 10px; 
  margin-bottom: 30px;
  border-radius: 10px;
`;

function Days() {
  let params = useParams();
  const currYear = Number(params.year);
  const currMonth = Number(params.month);
  
  const [toDos, setToDos] = useRecoilState(toDoCategory);
  const [date, setDate] = useRecoilState(selectedDate);
  useEffect(() => {
    const JtoDos = localStorage.getItem('toDoList');
    if (JtoDos !== null && typeof (JtoDos) === "string") {
      setToDos(JSON.parse(JtoDos));
    }
  }, []);
  let start:number;
  let end:number;
  const setCalendar = () => {
    const curMonth = new Date(currYear, currMonth, 0); //현재 달의 마지막 날짜 구하는 용도
    const curMonth2 = new Date(currYear, currMonth - 1, 1); //현재 달의 시작 요일 구하는 용도
    const preMonth = new Date(currYear, currMonth - 1, 0); //전 달의 마지막 날짜 구하는 용도
    let cal: number[] = [];
    for (let i = preMonth.getDate() - curMonth2.getDay() + 1; i <= preMonth.getDate(); i++) {
      cal.push(i);
    }
    start = cal.length;
    for (let i = 1; i <= curMonth.getDate(); i++) {
      cal.push(i);
    }
    end = cal.length;
    let j = 1;
    while (cal.length < 42) {
      cal.push(j++);
    }
    return cal;
  }
  const navigate = useNavigate();
  const { year, month } = useParams();
  const onYMClicked = () => {
    navigate(`/months/${year}`);
  }
  const dayMatch = useMatch("/days/:year/:month");
  const onDayClicked = (i:number) => {
    const month = date.getMonth() + 1;
    setDate(new Date(date.getFullYear() + ',' + month + ',' + i));
    navigate("/");
  }
  let curMonth = false; 
  return (
    <AnimatePresence>
      <Overlay />
      <CalendarWrapper
        key={CalendarWrapper}
        layoutId='calendar'
      >
        <SelectedYM
          onClick={onYMClicked}
          whileHover={{ backgroundColor: "rgba(164, 176, 190,1.0)" }}>
          {dayMatch ? year + "년 " + month + "월" : null}
        </SelectedYM>
        <Calendar>
          <Dow style={{ color: "red" }}>일</Dow>
          <Dow>월</Dow>
          <Dow>화</Dow>
          <Dow>수</Dow>
          <Dow>목</Dow>
          <Dow>금</Dow>
          <Dow style={{ color: "blue" }}>토</Dow>
          {setCalendar().map((i, idx) => { 
            
            let plan = '';
            if(idx == start || idx == end) {
              curMonth = !curMonth;
            }
            let curDate;
            let month;
            if(idx < start) {
              month = currMonth - 1;
              curDate = "" + date.getFullYear() + month + i;
            }
            else if(idx >= end) {
              month = currMonth + 1;
              curDate = "" + date.getFullYear() + month + i;
            }
            else {
              month = currMonth;
              curDate = "" + date.getFullYear() + month + i;
            }
            if(toDos[curDate] && Object.keys(toDos[curDate]).length > 0) {
              Object.keys(toDos[curDate]).map(i => plan += (i + '`'));
            } 
            if (idx % 7 == 0) {
              if(curMonth) return <DayWrapper onClick={() => onDayClicked(i)} key={idx} style={{ cursor: 'pointer', color: "red" }} whileHover={{ backgroundColor: "rgba(164, 176, 190,1.0)" }}><Day>{i}</Day><PlanWrapper>{plan.split('`').map(i => <Plan key={i}>{i}</Plan>)}</PlanWrapper></DayWrapper>
              else return <DayWrapper key={idx} style={{ opacity: 0.5, color: "red" }} whileHover={{ backgroundColor: "rgba(164, 176, 190,1.0)" }}><Day>{i}</Day><PlanWrapper>{plan.split('`').map(i => <Plan key={i}>{i}</Plan>)}</PlanWrapper></DayWrapper>
            }
            else if ((1 + idx) % 7 == 0) {
              if(curMonth) return <DayWrapper onClick={() => onDayClicked(i)} key={idx} style={{ cursor: 'pointer', color: "blue" }} whileHover={{ backgroundColor: "rgba(164, 176, 190,1.0)" }}><Day>{i}</Day><PlanWrapper>{plan.split('`').map(i => <Plan key={i}>{i}</Plan>)}</PlanWrapper></DayWrapper>
              else return <DayWrapper key={idx} style={{ opacity: 0.5, color: "blue" }} whileHover={{ backgroundColor: "rgba(164, 176, 190,1.0)" }}><Day>{i}</Day><PlanWrapper>{plan.split('`').map(i => <Plan key={i}>{i}</Plan>)}</PlanWrapper></DayWrapper>
            }
            else {
              if(curMonth) return <DayWrapper onClick={() => onDayClicked(i)} key={idx} style={{ cursor: 'pointer'}}   whileHover={{ backgroundColor: "rgba(164, 176, 190,1.0)" }}><Day>{i}</Day><PlanWrapper>{plan.split('`').map(i => <Plan key={i}>{i}</Plan>)}</PlanWrapper></DayWrapper>
              else return <DayWrapper key={idx} style={{ opacity: 0.5}} whileHover={{ backgroundColor: "rgba(164, 176, 190,1.0)" }}><Day>{i}</Day><PlanWrapper>{plan.split('`').map(i => <Plan key={i}>{i}</Plan>)}</PlanWrapper></DayWrapper>
            }
          })}
        </Calendar>
      </CalendarWrapper>
    </AnimatePresence>
  )
}

export default Days;