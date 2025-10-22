import styled from 'styled-components'

export const InfoSection = () => {
  return (
    <Container>
      <div className='info-content'>
        <div className='diagram-content'>
          <Card>
            <h3>Ofrendas del Mes</h3>
            <div className='chart-placeholder'>
              📊 Aquí va el gráfico de ofrendas
            </div>
          </Card>
          <Card>
            <h3>Intenciones del Mes</h3>
            <div className='chart-placeholder'>
              📈 Aquí va el gráfico de intenciones
            </div>
          </Card>
        </div>

        <div className='nave-content'>
          <Card>
            <h3>Próximos Eventos</h3>
            <div className='chart-placeholder'>📅 Lista de eventos</div>
          </Card>
          <Card>
            <h3>Comunidades</h3>
            <div className='chart-placeholder'>👥 Lista de comunidades</div>
          </Card>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.main`
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.navHeight});
  padding: 10px;
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};

  .info-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    height: 100%;
  }

  .diagram-content {
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 20px;
  }

  .nave-content {
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 20px;
  }
`

const Card = styled.div`
  background-color: ${({ theme }) => theme.whiteBg};
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;

  h3 {
    margin: 0 0 10px;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.textsecondary};
  }

  .chart-placeholder {
    background-color: ${({ theme }) => theme.bgtgderecha};
    border-radius: 8px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.gray300};
    font-size: 0.9rem;
  }
`
