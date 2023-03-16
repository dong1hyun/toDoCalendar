import styled from "styled-components";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom"
import { useRecoilState } from "recoil";
import { selectedDate } from "../atom";
import CalendarWrapper from "./Components/Calendar";

const Calendar = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`
const Day = styled(motion.div)`
  text-align: center;
  padding-top: 25px;
  padding-bottom: 25px;
  border-radius: 10px;
  font-size: 18px;
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
  const [date, setDate] = useRecoilState(selectedDate);
  let start:number;
  let end:number;
  const setCalendar = () => {
    const curMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0); //현재 달의 마지막 날짜 구하는 용도
    const curMonth2 = new Date(date.getFullYear(), date.getMonth(), 1); //현재 달의 시작 요일 구하는 용도
    const preMonth = new Date(date.getFullYear(), date.getMonth(), 0); //전 달의 마지막 날짜 구하는 용도
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
      <CalendarWrapper
        key={CalendarWrapper}
        layoutId='calendar'
        transition={{ duration: "0.3" }}
        exit={{scale:3, transition: { duration: 3} }}
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
            if(idx == start || idx == end) {
              curMonth = !curMonth;
            }
            if (idx % 7 == 0) {
              if(curMonth) return <Day onClick={() => onDayClicked(i)} key={idx} style={{ cursor: 'pointer', color: "red" }} whileHover={{ backgroundColor: "rgba(164, 176, 190,1.0)" }}>{i}</Day>
              else return <Day key={idx} style={{ opacity: 0.5, color: "red" }} whileHover={{ backgroundColor: "rgba(164, 176, 190,1.0)" }}>{i}</Day>
            }
            else if ((1 + idx) % 7 == 0) {
              if(curMonth) return <Day onClick={() => onDayClicked(i)} key={idx} style={{ cursor: 'pointer', color: "blue" }} whileHover={{ backgroundColor: "rgba(164, 176, 190,1.0)" }}>{i}</Day>
              else return <Day key={idx} style={{ opacity: 0.5, color: "blue" }} whileHover={{ backgroundColor: "rgba(164, 176, 190,1.0)" }}>{i}</Day>
            }
            else {
              if(curMonth) return <Day onClick={() => onDayClicked(i)} key={idx} style={{ cursor: 'pointer'}} whileHover={{ backgroundColor: "rgba(164, 176, 190,1.0)" }}>{i}</Day>
              else return <Day key={idx} style={{ opacity: 0.5}} whileHover={{ backgroundColor: "rgba(164, 176, 190,1.0)" }}>{i}</Day>
            }
          })}
        </Calendar>
      </CalendarWrapper>
    </AnimatePresence>
  )
}

export default Days;