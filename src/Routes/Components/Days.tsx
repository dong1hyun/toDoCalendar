import styled from "styled-components";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useRecoilState } from "recoil";
import { selectedDate } from "../../atom";

const CalendarWrapper = styled(motion.div)`
  position: absolute;
  padding: 10px;
  width: 900px;
  height: 620px;
  border-radius: 10px;
  top: 40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: rgba(206, 214, 224,1.0);
`;

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
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const SelectedYM = styled(motion.span)`
  display: inline-block;
  cursor: pointer;
  padding: 10px; 
  margin-bottom: 30px;
  border-radius: 10px;
`;

function Days() {
  const [date, setDate] = useRecoilState(selectedDate);
  const setCalendar = () => {
    const curMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0); //현재 달의 마지막 날짜 구하는 용도
    const curMonth2 = new Date(date.getFullYear(), date.getMonth(), 1); //현재 달의 시작 요일 구하는 용도
    const preMonth = new Date(date.getFullYear(), date.getMonth(), 0); //전 달의 마지막 날짜 구하는 용도
    let cal: number[] = [];
    for (let i = preMonth.getDate() - curMonth2.getDay() + 1; i <= preMonth.getDate(); i++) {
      cal.push(i);
    }
    for (let i = 1; i <= curMonth.getDate(); i++) {
      cal.push(i);
    }
    let j = 1;
    while (cal.length < 42) {
      cal.push(j++);
    }

    return cal;
  }
  const navigate = useNavigate();
  const onOverlayClicked = () => {
    navigate("/");
  }
  const { year, month } = useParams();
  const onYMClicked = () => {
    navigate(`/months/${year}`);
  }
  return (
    <AnimatePresence>
      <Overlay
        layoutId="overlay"
        onClick={onOverlayClicked}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <CalendarWrapper
        key={CalendarWrapper}
        layoutId='calendar'
        transition={{ duration: "0.3" }}
        exit={{scale:3, transition: { duration: 3} }}
      >
        <SelectedYM
          onClick={onYMClicked}
          whileHover={{ backgroundColor: "rgba(164, 176, 190,1.0)" }}>
          {year + "년 " + month + "월"}
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
            if (idx % 7 == 0) {
              return <Day key={idx} style={{ color: "red" }} whileHover={{ backgroundColor: "rgba(164, 176, 190,1.0)" }}>{i}</Day>
            }
            else if ((1 + idx) % 7 == 0) {
              return <Day key={idx} style={{ color: "blue" }} whileHover={{ backgroundColor: "rgba(164, 176, 190,1.0)" }}>{i}</Day>
            }
            else {
              return <Day key={idx} whileHover={{ backgroundColor: "rgba(164, 176, 190,1.0)" }}>{i}</Day>
            }
          })}
        </Calendar>
      </CalendarWrapper>
    </AnimatePresence>
  )
}

export default Days;