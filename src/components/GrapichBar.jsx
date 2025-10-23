import { Bar } from 'react-chartjs-2'
import styled from 'styled-components'

export const GrapichBar = ({ data }) => {
  const agrupado = data?.agrupadoPorTipo || {}
  const totalRecaudado = data?.totalRecaudado || 0

  const barLabels = Object.keys(agrupado)
  const barValues = Object.values(agrupado)

  const barData = {
    labels: barLabels,
    datasets: [
      {
        label: 'Intenciones',
        data: barValues,
        backgroundColor: barLabels.map((_, i) => colorForIndex(i)),
        borderRadius: 8,
      },
    ],
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#555' } },
      y: {
        beginAtZero: true,
        ticks: { color: '#555' },
        grid: { color: 'rgba(200,200,200,0.15)' },
      },
    },
  }
  return (
    <Card>
      <HeaderCard>
        <h3>Ofrendas del Mes</h3>
        <p>
          Total recaudado: <strong>Q{totalRecaudado}</strong>
        </p>
      </HeaderCard>
      <ChartWrapper>
        {barLabels.length > 0 ? (
          <Bar data={barData} options={barOptions} />
        ) : (
          <p className='empty'>No hay datos disponibles</p>
        )}
      </ChartWrapper>
    </Card>
  )
}

function colorForIndex(i, alpha = 1) {
  const hue = (i * 67) % 360
  return alpha === 1
    ? `hsl(${hue} 70% 45%)`
    : `hsla(${hue}, 70%, 50%, ${alpha})`
}

const Card = styled.div`
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    margin: 0;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.textprimary};
  }

  .empty {
    text-align: center;
    color: ${({ theme }) => theme.gray300};
    font-size: 0.9rem;
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

const HeaderCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.textprimary};

    strong {
      color: ${({ theme }) => theme.textprimary};
    }
  }
`

const ChartWrapper = styled.div`
  flex: 1;
  margin-top: 10px;
`
