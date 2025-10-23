/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import styled from 'styled-components'
import { useHomeInfo } from '../../hook/useHomeInfo'
import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export const InfoSection = () => {
  const { data, lastMonths, getAllIntentionByYearAndMonthS, getByLastMonthsS } =
    useHomeInfo()

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date()
      const year = today.getFullYear()
      const month = today.getMonth() + 1
      await getAllIntentionByYearAndMonthS({ year, month })
      await getByLastMonthsS({ count: 6 })
    }
    fetchData()
  }, [])

  /* ---------------------------------
     OFRENDAS DEL MES
  ----------------------------------*/
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

  /* ---------------------------------
     TENDENCIA (últimos 6 meses)
  ----------------------------------*/
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

  /* ---------------------------------
     Renderizado
  ----------------------------------*/
  return (
    <Container>
      <div className='info-content'>
        {/* ------------------- IZQUIERDA ------------------- */}
        <div className='diagram-content'>
          {/* --- Ofrendas del mes --- */}
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

          {/* --- Tendencia últimos 6 meses --- */}
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
        </div>

        {/* ------------------- DERECHA ------------------- */}
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

/* ----------------- Helpers y estilos ----------------- */
function colorForIndex(i, alpha = 1) {
  const hue = (i * 67) % 360
  return alpha === 1
    ? `hsl(${hue} 70% 45%)`
    : `hsla(${hue}, 70%, 50%, ${alpha})`
}

const Container = styled.main`
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.navHeight});
  padding: 10px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  border-radius: 10px;

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
