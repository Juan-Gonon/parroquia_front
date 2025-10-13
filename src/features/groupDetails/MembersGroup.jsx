import styled from 'styled-components'

export const MembersGroup = () => {
  return (
    <Container>
      <section className='table-content'>
        <div className='table-body'>
          <h3>Hola</h3>
        </div>
      </section>
    </Container>
  )
}

const Container = styled.main`
  width: 100%;
  height: calc(80vh - ${({ theme }) => theme.navHeight});
  /* margin-top: ${({ theme }) => theme.navHeight}; */
  padding: 0 20px;
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  position: relative;

  .table-content {
    background-color: ${({ theme }) => theme.bgtgderecha};
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: grid;
    grid-template-rows: 1fr auto;
    height: 100%;

    .table-body {
      overflow-y: auto;
      padding: 20px;
    }

    .table-footer {
      background-color: ${({ theme }) => theme.bg2};
      padding: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      color: ${({ theme }) => theme.textprimary};
      border-top: 1px solid ${({ theme }) => theme.bg3};
    }
  }
`
