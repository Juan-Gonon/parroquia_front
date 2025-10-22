/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import styled from 'styled-components'
import { useHomeInfo } from '../../hook/useHomeInfo'
import { Bar } from 'react-chartjs-2'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const InfoSection = () => {
  const { data, getAllIntentionByYearAndMonthS } = useHomeInfo()

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date()
      const year = today.getFullYear()
      const month = today.getMonth() + 1

      await getAllIntentionByYearAndMonthS({ year, month })
    }

    fetchData()
  }, [])

  // console.log(data)

  // Extraer datos del hook
  const agrupado = data?.agrupadoPorTipo || {}
  const totalRecaudado = data?.totalRecaudado || 0

  // Preparar datos para el gráfico
  const labels = Object.keys(agrupado)
  const values = Object.values(agrupado)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Intenciones',
        data: values,
        backgroundColor: '#4A90E2',
        borderRadius: 8,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#555' },
      },
      title: {
        display: true,
        text: 'Cantidad de Intenciones por Tipo',
        color: '#333',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#555' },
        grid: { display: false },
      },
      y: {
        ticks: { color: '#555' },
        grid: { color: 'rgba(200,200,200,0.2)' },
      },
    },
  }

  return (
    <Container>
      <div className='info-content'>
        <div className='diagram-content'>
          <Card>
            <HeaderCard>
              <h3>Ofrendas del Mes</h3>
              <p>
                Total recaudado: <strong>Q{totalRecaudado}</strong>
              </p>
            </HeaderCard>
            <ChartWrapper>
              {labels.length > 0 ? (
                <Bar data={chartData} options={chartOptions} />
              ) : (
                <p className='empty'>No hay datos disponibles</p>
              )}
            </ChartWrapper>
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
  /* background-color: ${({ theme }) => theme.whiteBg}; */
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    margin: 0;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.textsecondary};
  }

  .empty {
    text-align: center;
    color: ${({ theme }) => theme.gray300};
    font-size: 0.9rem;
  }
`

const HeaderCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.gray300};

    strong {
      color: ${({ theme }) => theme.textsecondary};
    }
  }
`

const ChartWrapper = styled.div`
  flex: 1;
  margin-top: 10px;
`
