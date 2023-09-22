import { Link } from "react-router-dom"
import styled from "styled-components"

export const AfterCreatedContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const AfterCreated = () => {
  return <AfterCreatedContainer>
    New user is created
    <Link to={"/"}>Home Page</Link>
  </ AfterCreatedContainer>
}

export default AfterCreated