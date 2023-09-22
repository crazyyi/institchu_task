import styled from "styled-components";

interface PopUpProps {
  isHidden?: boolean
}
export const PopUp = styled.div <PopUpProps> `
  top: 0px;
  left: 0px;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #555;
  opacity: .4;
`