import { motion } from "framer-motion";
import styled from "styled-components";

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
  @media screen and (max-width: 500px) {
    width: 80%;
    height: 80%;
    top: 10%;
    overflow: scroll;
  }
`;

export default CalendarWrapper;