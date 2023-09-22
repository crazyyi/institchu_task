import { Link } from "react-router-dom"
import styled from "styled-components"

export const NavLink = styled(Link)`
  text-decoration: none;
  &:hover,
  &:focus{
      color: blue;
  };
  &:active{
      color: red;
  };
  height: 40px;
`