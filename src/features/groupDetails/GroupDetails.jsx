import styled from 'styled-components'

export const GroupDetails = () => {
  return <Container>GroupDetails</Container>
}

const Container = styled.main`
  /* position: absolute; */
  position: relative;
  /* top: 10px; */
  /* left: 0; */
  width: 99%;
  padding: 0 20px;
  min-height: ${({ theme }) => theme.navHeight};
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.bgtgderecha};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  z-index: 100;
  /* background: red; */
`
