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
import { FaChurch } from 'react-icons/fa6'
import { MdOutlineUpcoming } from 'react-icons/md'

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

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date()
      const year = today.getFullYear()
      const month = today.getMonth() + 1
      await getAllIntentionByYearAndMonthS({ year, month })
      await getByLastMonthsS({ count: 6 })
      await getAllUpcomingEventS()
    }
    fetchData()
  }, [])

  // console.log(eventU)

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
                  <Header key={ev.id_evento}>
                    <TitleIconContainer>
                      <MdOutlineUpcoming size='2em' color='#3498db' />
                    </TitleIconContainer>
                    <HeaderContent>
                      <h2>{ev.nombre}</h2>
                      <p>
                        {new Date(ev.fecha_ini).toLocaleDateString('es-GT', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </HeaderContent>
                  </Header>
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
            <div className='chart-placeholder'>👥 Lista de comunidades</div>
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
    height: 100%; /* 🔥 Igual aquí */
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

const EventItem = styled.div`
  background-color: ${({ theme }) => theme.bgtgderecha};
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  transition: 0.2s ease;
  border: 1px solid transparent;

  &:hover {
    background-color: ${({ theme }) => theme.bgHover};
    border-color: ${({ theme }) => theme.borderColor};
  }

  .event-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  h4 {
    font-size: 0.9rem;
    margin: 0;
    color: ${({ theme }) => theme.textprimary};
  }

  p {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.gray400};
    margin: 0;
    text-transform: capitalize;
  }

  span {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.textsecondary};
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  /* background-color: #fcfcfc; */
  gap: 15px;
`

const TitleIconContainer = styled.div`
  background-color: ${({ theme }) => theme.bg3};
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeaderContent = styled.div`
  flex-grow: 1;

  h2 {
    font-size: 1.1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.textprimary || '#333'};
    margin: 0;
  }

  p {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.gray500};
    margin: 0;
    font-weight: 400;
  }
`
