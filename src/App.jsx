import { Provider } from 'react-redux'
import { AppRouter } from './router/AppRouter'
import { store } from './app/storaje'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}

export default App
