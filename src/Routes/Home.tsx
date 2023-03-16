import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import styled from "styled-components"
import { useNavigate, useMatch } from "react-router-dom"
import Days from './Days';
import { useRecoilState } from 'recoil';
import { selectedDate } from '../atom';
import Months from './Months';
import Years from './Years';
import ToDos from './ToDos';

const SelectedDate = styled(motion.span)`
  position: absolute;
  cursor: pointer;
  padding: 30px;
  font-size: 50px;
  display:inline-block;
  top: 250px;
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

function Home() {
  const [date, setDate] = useRecoilState(selectedDate);
  const navigate = useNavigate();
  const onDateClicked = (year: number, month: number) => {
    navigate(`/days/${year}/${month}`);
  };
  const onOverlayClicked = () => {
    navigate("/");
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

  const dateSelect = (date: any) => {
    let month = date.getMonth() + 1;
    let selectedDate = date.getFullYear() + '-' + month + '-' + date.getDate() + '-' + getDay(date.getDay());
    return selectedDate;
  }

  const dayMatch = useMatch("/days/:year/:month");
  const monthMatch = useMatch("/months/:year");
  const yearMatch = useMatch("/years");
  const homeMatch = useMatch("/");
  return (
    <>
      {
        !homeMatch ? <Overlay
          layoutId="overlay"
          onClick={onOverlayClicked}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        /> : null
      }
      {
        homeMatch ?
          <>
            <SelectedDate
              whileHover={{ scale: 1.1 }}
              layoutId='calendar'
              onClick={() => onDateClicked(date.getFullYear(), date.getMonth() + 1)}
            >
              {dateSelect(date)}
            </SelectedDate>
            <ToDos />
          </>
          : null
      }
      <AnimatePresence>
        {
          dayMatch ?
            <Days />
            : null
        }
      </AnimatePresence>
      <AnimatePresence>
        {
          monthMatch ?
            <Months />
            : null
        }
      </AnimatePresence>
      <AnimatePresence>
        {
          yearMatch ?
            <Years />
            : null
        }
      </AnimatePresence>
    </>
  );
}

export default Home;
