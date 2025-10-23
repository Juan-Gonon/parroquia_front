/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react'
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
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

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

  // --- Datos para Ofrendas (barras) ---
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
      title: {
        display: false,
      },
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

  // --- Datos para Intenciones (línea por mes) ---
  // Usamos data.intenciones[]: cada item tiene fechapago, montopagado, tipointencion.nombre
  const linePrepared = useMemo(() => {
    const intenciones = data?.intenciones || []

    // Si no hay intenciones, devolvemos vacíos
    if (!intenciones.length) {
      return { months: [], tipos: [], datasets: [] }
    }

    // 1) Determinar rango: últimos 6 meses (incluye mes actual)
    const monthsCount = 6
    const today = new Date()
    const months = []
    const monthIdxToLabel = {} // 'YYYY-MM' -> label

    for (let i = monthsCount - 1; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` // YYYY-MM
      const label = d.toLocaleString('es-ES', { month: 'short' }) // ene, feb...
      months.push(key)
      monthIdxToLabel[key] = capitalize(label)
    }

    // 2) Detectar tipos (usar las llaves de agrupado o los tipos en intenciones)
    const tiposSet = new Set(Object.keys(agrupado || {}))
    intenciones.forEach((it) => {
      const tipoNombre = it?.tipointencion?.nombre
      if (tipoNombre) tiposSet.add(tipoNombre)
    })
    const tipos = Array.from(tiposSet)

    // 3) Inicializar contador meses x tipo
    const counts = {}
    tipos.forEach((t) => {
      counts[t] = months.map(() => 0)
    })

    // 4) Recorrer intenciones y sumar al mes correspondiente (si cae en el rango de months)
    intenciones.forEach((it) => {
      const fecha = it?.fechapago ? new Date(it.fechapago) : null
      const tipoNombre = it?.tipointencion?.nombre
      if (!fecha || !tipoNombre) return

      const key = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`
      const monthIndex = months.indexOf(key)
      if (monthIndex !== -1) {
        counts[tipoNombre][monthIndex] += 1
      }
    })

    // 5) Crear datasets para Chart.js
    const datasets = tipos.map((t, i) => ({
      label: t,
      data: counts[t],
      borderColor: colorForIndex(i),
      backgroundColor: colorForIndex(i, 0.18),
      tension: 0.3,
      fill: false,
      pointRadius: 3,
      pointHoverRadius: 5,
    }))

    const labels = months.map((k) => monthIdxToLabel[k])

    return { months: labels, tipos, datasets }
  }, [data, agrupado])

  const lineData = {
    labels: linePrepared.months,
    datasets: linePrepared.datasets,
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
              {barLabels.length > 0 ? (
                <Bar data={barData} options={barOptions} />
              ) : (
                <p className='empty'>No hay datos disponibles</p>
              )}
            </ChartWrapper>
          </Card>

          <Card>
            <HeaderCard>
              <h3>Intenciones del Mes</h3>
              <p style={{ fontSize: 12, color: 'var(--muted, #888)' }}>
                Últimos 6 meses
              </p>
            </HeaderCard>
            <ChartWrapper>
              {linePrepared.months.length > 0 &&
              linePrepared.datasets.length > 0 ? (
                <Line data={lineData} options={lineOptions} />
              ) : (
                <p className='empty'>
                  No hay datos suficientes para mostrar la tendencia.
                </p>
              )}
            </ChartWrapper>
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

/* ----------------- helpers & estilos ----------------- */

function colorForIndex(i, alpha = 1) {
  // Genera colores HSL para que sean legibles y diferentes
  const hue = (i * 67) % 360 // paso de 67 deg para variedad
  if (alpha === 1) return `hsl(${hue} 70% 45%)`
  // alpha < 1 -> color rgba-like usando hsl + alpha in CSS level 4 syntax
  // fallback simple:
  return `hsla(${hue}, 70%, 50%, ${alpha})`
}

function capitalize(str = '') {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
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
    grid-template-rows: 1sfr 1fr;
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
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    margin: 0;
    font-size: 0.8rem;
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
