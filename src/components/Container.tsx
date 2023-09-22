import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  column-gap: 8px;
  row-gap: 8px;
  justify-content: start;
  grid-template-columns: repeat(auto-fill, 50px);
  grid-auto-rows: 50px;
  padding: 0 4px;
  margin: 0 4px;
  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`