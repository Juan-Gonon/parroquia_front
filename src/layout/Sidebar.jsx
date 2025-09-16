/* eslint-disable prettier/prettier */
// import logo from '../../public/vite.svg'
import { linksArray, secondaryLinksArray } from '../helpers/data'
import styled from 'styled-components'
import { v } from '../styles/Variables'
import { AiOutlineLeft } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { useThemeStore } from '../hook/useThemeStore'
import { FaCross } from 'react-icons/fa'
import { useAuthStore } from '../hook/useAuthStore'

export const Sidebar = () => {
  const { openSidebar, starToogle, sidebarOpen, theme } = useThemeStore()
  const { onLogOut } = useAuthStore()

  const modifySidebar = () => {
    openSidebar()
  }

  const changeTheme = () => {
    starToogle()
  }

  return (
    <Container $isOpen={sidebarOpen} $themeUse={theme}>
      <button className='sidebar__button' onClick={modifySidebar}>
        <AiOutlineLeft size={'20px'} />
      </button>

      <div className='logo__content'>
        <div className='img__content'>
          {/* <img src={logo} alt='logo' /> */}
          <FaCross />
        </div>
        <h2>Iglesia Zunilito</h2>
      </div>

      {/* LINKS PRINCIPALES */}
      {linksArray.map((item, index) => (
        <div key={index} className='link__container'>
          <NavLink
            to={item.to}
            className={({ isActive }) => `links ${isActive ? 'active' : ''}`}>
            <div className='link__icon'>{item.icon}</div>
            {sidebarOpen && <span>{item.label}</span>}
          </NavLink>
        </div>
      ))}

      <Divider />

      {/* LINKS SECUNDARIOS */}
      {secondaryLinksArray.map((item, index) => (
        <div key={index} className='link__container'>
          <NavLink
            to={item.to}
            className={({ isActive }) => `links ${isActive ? 'active' : ''}`}
            onClick={onLogOut}>
            <div className='link__icon'>{item.icon}</div>
            {sidebarOpen && <span>{item.label}</span>}
          </NavLink>
        </div>
      ))}

      <Divider />

      {/* TOGGLE DE TEMA */}
      <div className='theme__content'>
        {sidebarOpen && <span className='title__theme'>Dark mode</span>}
        <section className='toggle__content'>
          <article className='grid theme-container'>
            <div className='content'>
              <div className='demo'>
                <label htmlFor='toggle-click' className='switch'>
                  <input
                    id='toggle-click'
                    onClick={changeTheme}
                    type='checkbox'
                    className='theme-switch'
                  />
                  <span className='slider round' />
                </label>
              </div>
            </div>
          </article>
        </section>
      </div>
    </Container>
  )
}

const Container = styled.div`
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  position: sticky;
  padding-top: 25px;
  width: 100%;
  height: 100%;
  border-radius: 5px;

  .sidebar__button {
    position: absolute;
    top: ${v.xxlSpacing};
    right: -18px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${({ theme }) => theme.bgtgderecha};
    box-shadow:
      0 0 4px ${({ theme }) => theme.bg3},
      0 0 7px ${({ theme }) => theme.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.8s;
    transform: ${({ $isOpen }) => ($isOpen ? 'initial' : 'rotate(180deg)')};
    border: none;
  }

  .logo__content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: ${v.lgSpacing};
    padding-top: 5px;

    .img__content {
      display: flex;
      cursor: pointer;
      transition: transform 0.3s;
      transform: ${({ $isOpen }) => ($isOpen ? 'scale(.7)' : 'scale(1.5)')};

      img {
        max-width: 100%;
        height: auto;
        object-fit: cover;
      }
    }

    & h2 {
      display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    }
  }

  .link__container {
    margin: 8px 0;
    padding: 0 15%;

    &:hover {
      background: ${({ theme }) => theme.bg3};
    }

    .links {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: calc(${v.smSpacing}-2px) 0;
      color: ${({ theme }) => theme.text};

      .link__icon {
        padding: ${v.smSpacing} ${v.mdSpacing};
        display: flex;

        svg {
          font-size: 25px;
        }
      }

      &.active {
        .link__icon svg {
          color: ${({ theme }) => theme.bg4};
        }
      }
    }
  }

  .theme__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom: 35px;

    .title__theme {
      display: block;
      padding: 10px;
      font-weight: 700;
      opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
      transition: all 0.3s;
      white-space: nowrap;
      overflow: hidden;
    }

    .toggle__content {
      margin: ${({ $isOpen }) => ($isOpen ? 'auto 40px' : 'auto 15px')};
      width: 36px;
      height: 20px;
      border-radius: 10px;
      transition: all 0.3s;
      position: relative;
      /* top: 20px; */

      .theme-container {
        transition: all 0.4s;

        .demo {
          font-size: 32px;

          .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;

            .theme-switch {
              position: absolute;
              opacity: 1;
              width: 0px;
              height: 0px;
              z-index: 20;

              &:checked ~ .slider::before {
                left: 4px;
                content: '🌑';
                transform: translateX(26px);
              }
            }

            .slider {
              position: absolute;
              cursor: pointer;
              inset: 0;
              background: ${({ $themeUse }) =>
                $themeUse === 'light' ? v.lightcheckbox : v.checkbox};
              transition: all 0.4s;

              &::before {
                position: absolute;
                content: '☀️';
                left: -10px;
                top: -5px;
                transition: 0.4s;
              }

              &.round {
                border-radius: 34px;
                &::before {
                  border-radius: 50%;
                }
              }
            }
          }
        }
      }
    }
  }
`

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.bg3};
  margin: ${v.lgSpacing} 0;
`
