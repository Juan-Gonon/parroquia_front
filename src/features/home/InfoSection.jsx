/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import styled from 'styled-components'
import { useHomeInfo } from '../../hook/useHomeInfo'
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
import { GrapichBar } from '../../components/GrapichBar'
import { GraphicLine } from '../../components/GraphicLine'
import { EventCard } from '../../components/EventCard'
import { useCommunity } from '../../hook/useCommunity'
import { ComunityCardHome } from '../../components/ComunityCardHome'

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
  const {
    data,
    lastMonths,
    eventU,
    getAllIntentionByYearAndMonthS,
    getAllUpcomingEventS,
    getByLastMonthsS,
  } = useHomeInfo()
  const { community, getAllCommunityS } = useCommunity()

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date()
      const year = today.getFullYear()
      const month = today.getMonth() + 1
      await getByLastMonthsS({ count: 6 })
      await getAllUpcomingEventS()
      await getAllCommunityS({ limit: 2, page: 1 })
      await getAllIntentionByYearAndMonthS({ year, month })
    }
    fetchData()
  }, [])

  // console.log(community)

  return (
    <Container>
      <div className='info-content'>
        {/* ------------------- IZQUIERDA ------------------- */}
        <div className='diagram-content'>
          {/* --- Ofrendas del mes --- */}
          <GrapichBar data={data} />

          {/* --- Tendencia últimos 6 meses --- */}
          <GraphicLine lastMonths={lastMonths} />
        </div>

        {/* ------------------- DERECHA ------------------- */}
        <div className='nave-content'>
          <Card>
            <h3>Próximos Eventos</h3>

            {eventU && eventU.length > 0 ? (
              <EventList>
                {eventU.slice(0, 2).map((ev) => (
                  <EventCard
                    key={ev.id_evento}
                    nombre={ev.nombre}
                    fecha_ini={ev.fecha_ini}
                  />
                ))}

                <a href='/event' className='see-more'>
                  Ver más
                </a>
              </EventList>
            ) : (
              <p className='empty'>No hay próximos eventos.</p>
            )}
          </Card>

          <Card>
            <h3>Comunidades</h3>

            {community && community.length > 0 ? (
              <EventList>
                {community.map((comunity) => (
                  <ComunityCardHome
                    key={comunity.id_comunidad}
                    nombre={comunity.nombre}
                    direccion={comunity.direccion}
                  />
                ))}

                <a href='/communities' className='see-more'>
                  Ver más
                </a>
              </EventList>
            ) : (
              <p className='empty'>No hay próximos eventos.</p>
            )}
          </Card>
        </div>
      </div>
    </Container>
  )
}

/* ----------------- Helpers y estilos ----------------- */
const Container = styled.main`
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.navHeight});
  padding: 10px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  border-radius: 10px;
  overflow: hidden;

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
    height: 100%;
  }

  .nave-content {
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 20px;
    height: 100%;
  }
`

const Card = styled.div`
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

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

const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;

  .see-more {
    margin-top: 10px;
    text-align: center;
    color: #007bff;
    text-decoration: none;
    font-weight: 500;
    transition: 0.2s;
  }

  .see-more:hover {
    text-decoration: underline;
  }
`
