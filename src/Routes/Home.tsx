import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import styled from "styled-components"
import { useNavigate, useMatch } from "react-router-dom"
import Days from './Components/Days';
import { useRecoilState } from 'recoil';
import { selectedDate } from '../atom';
import Months from './Components/Months';
import Years from './Components/Years';

const Wrapper = styled.div`
`
const SelectedDate = styled(motion.span)`
  cursor: pointer;
  padding: 30px;
  font-size: 50px;
  display:inline-block;
`;

const Test = styled(motion.div)`
  
`;

const DaysVariants = {}

function Home() {
  const [date, setDate] = useRecoilState(selectedDate);
  const navigate = useNavigate();
  const onDateClicked = (year: number, month: number) => {
    navigate(`/days/${year}/${month}`);
  };
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

  const calMatch = useMatch("/days/:year/:month");
  const monthMatch = useMatch("/months/:year");
  const yearMatch = useMatch("/years");
  const homeMatch = useMatch("/");
  return (
    <AnimatePresence>
    <Wrapper>
      {
        homeMatch ?
          <SelectedDate
            whileHover={{ scale: 1.1 }}
            layoutId='calendar'
            onClick={() => onDateClicked(date.getFullYear(), date.getMonth() + 1)}
          >
            {dateSelect(date)}
          </SelectedDate> : null
      }
      {
        calMatch ?
          <Days
          />
          : null
      }
      {
        monthMatch ?
          <Months />
          : null
      }
      {
        yearMatch ?
          <Years />
          : null
      }

    </Wrapper>
    </AnimatePresence>
  );
}

export default Home;
