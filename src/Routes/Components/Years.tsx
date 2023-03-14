import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { selectedDate } from "../../atom";
import { useNavigate } from "react-router-dom";

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
const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 40px
`
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const Year = styled(motion.div)`
  text-align: center;
  padding-top: 25px;
  padding-bottom: 25px;
  border-radius: 10px;
  font-size: 18px;
`


function Years() {
    const [date, setDate] = useRecoilState(selectedDate);
    const navigate = useNavigate();
    const onOverlayClicked = () => {
        navigate("/");
    }
    const setYears = () => {
        const years: number[] = [];

        for (let i = date.getFullYear() - 10; i < date.getFullYear(); i++) {
            years.push(i);
        }
        for (let i = date.getFullYear(); i <= date.getFullYear() + 10; i++) {
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
            <Overlay
                layoutId="overlay"
                onClick={onOverlayClicked}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />
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