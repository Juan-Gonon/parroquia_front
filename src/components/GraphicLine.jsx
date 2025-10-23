import { Line } from 'react-chartjs-2'
import styled from 'styled-components'

export const GraphicLine = ({ lastMonths }) => {
  const lineLabels = lastMonths?.map((item) => item.mes) || []
  const lineValues = lastMonths?.map((item) => Number(item.totalRecaudado) || 0)

  const lineData = {
    labels: lineLabels,
    datasets: [
      {
        label: 'Total Recaudado (Q)',
        data: lineValues,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.3)',
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: '#555' } },
      title: {
        display: false,
      },
      tooltip: { mode: 'index', intersect: false },
    },
    interaction: { mode: 'nearest', intersect: false },
    scales: {
      x: { ticks: { color: '#555' }, grid: { display: false } },
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
        <h3>Intenciones del Mes</h3>
        <p style={{ fontSize: 12, color: 'var(--muted, #888)' }}>
          Últimos 6 meses
        </p>
      </HeaderCard>
      <ChartWrapper>
        {lastMonths && lastMonths.length > 0 ? (
          <Line data={lineData} options={lineOptions} />
        ) : (
          <p className='empty'>
            No hay datos suficientes para mostrar la tendencia.
          </p>
        )}
      </ChartWrapper>
    </Card>
  )
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
