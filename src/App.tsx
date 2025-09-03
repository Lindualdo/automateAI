import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">
          Bem-vindo ao seu projeto!
        </h1>
        <div className="text-center">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20"
          >
            Contador: {count}
          </button>
        </div>
        <p className="text-white/80 text-center mt-4">
          Clique no botão para testar a interatividade!
        </p>
      </div>
    </div>
  )
}

export default App