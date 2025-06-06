import { useState } from 'react'
import { Header } from 'components_ui/Header'
import User from 'user_ui/User'
import Product from 'product_ui/Product'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header label="Example Header" onCreateAccount={() => {}} onLogin={() => {}} onLogout={() => {}} user={{name: 'David Camelo'}} />
      <User />
      <Product />
    </>
  )
}

export default App
