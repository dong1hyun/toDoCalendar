import { AnimatePresence, motion } from 'framer-motion';
import styled from "styled-components"
import { useRecoilState } from "recoil";
import { useNavigate, useMatch } from "react-router-dom"
import ToDos from './ToDos';
import { selectedDate } from '../atom';

const SelectedDate = styled(motion.div)`
  cursor: pointer;
  padding: 30px;
  font-size: 40px;
  border-radius: 10px;
  top: 10px;
  left: 10px;
  display:inline-block;
`;
function Home() {
  const [date, setDate] = useRecoilState(selectedDate);
  const homeMatch = useMatch("/");
  const navigate = useNavigate();
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
            <ToDos />
          </>
          : null
      }
    </>
  );
}

export default Home;
