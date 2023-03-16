import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil";
import { selectedDate } from "../atom";
import CalendarWrapper from "./Components/Calendar";

const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`
const SelectedY = styled(motion.span)`
  display: inline-block;
  cursor: pointer;
  padding: 10px; 
  margin-bottom: 30px;
  border-radius: 10px;
`;

const Month = styled(motion.div)`
  text-align: center;
  padding-top: 25px;
  padding-bottom: 25px;
  border-radius: 10px;
  font-size: 50px;
  cursor: pointer;
`

function Months() {
    const [date, setDate] = useRecoilState(selectedDate);
    const navigate = useNavigate();
    const onMonthClicked = (i: number) => {
        setDate(new Date(date.getFullYear() + ', ' + i)); //월이 -1 되는 현상이 있는데 원인 발견 못했음
        navigate(`/days/${date.getFullYear()}/${i}`);
    }
    const onYClicked = () => {
        navigate("/years");
    }
    return (
        <>
            <CalendarWrapper layoutId="calendar">
                <SelectedY
                    whileHover={{ backgroundColor: "rgba(164, 176, 190,1.0)" }}
                    onClick={onYClicked}
                >
                    {date.getFullYear() + '년'}
                </SelectedY>
                <Calendar>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) =>
                        <Month
                            onClick={() => onMonthClicked(i)}
                            key={i}
                            whileHover={{ backgroundColor: "rgba(164, 176, 190,1.0)" }}
                        >
                            {i}
                        </Month>
                    )}
                </Calendar>
            </CalendarWrapper>
        </>

    )
}

export default Months;