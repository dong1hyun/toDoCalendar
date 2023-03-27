import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { selectedDate } from "../atom";
import { useNavigate } from "react-router-dom";
import CalendarWrapper from "./Components/Calendar";
import Overlay from "./Components/Overlay";

const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 40px
`
const Year = styled(motion.div)`
  text-align: center;
  padding-top: 25px;
  padding-bottom: 25px;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
`

function Years() {
    const [date, setDate] = useRecoilState(selectedDate);
    const navigate = useNavigate();
    const setYears = () => {
        const years: number[] = [];
        const today = new Date();
        for (let i = today.getFullYear() - 10; i < today.getFullYear(); i++) {
            years.push(i);
        }
        for (let i = today.getFullYear(); i <= today.getFullYear() + 10; i++) {
            years.push(i);
        }

        return years
    }
    const onYearClicked = (i: number) => {
        setDate(new Date(i + ',' + 1));
        navigate(`/months/${i}`);
    }
    return (
        <>
            <Overlay />
            <CalendarWrapper layoutId="calendar">
                <Calendar>
                    {setYears().map((i) => <Year
                        key={i}
                        whileHover={{ backgroundColor: "rgba(164, 176, 190,1.0)" }}
                        onClick={() => onYearClicked(i)}
                    >
                        {i}
                    </Year>
                    )}
                </Calendar>
            </CalendarWrapper>
        </>
    );
}

export default Years;