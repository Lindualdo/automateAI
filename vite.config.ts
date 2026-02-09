import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import fs from "fs"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Rota /novo -> index_novo.html
    {
      name: 'route-novo',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url?.split('?')[0] || ''
          if (url === '/novo' || url === '/novo/') {
            const file = path.join(__dirname, 'index_novo.html')
            const html = fs.readFileSync(file, 'utf-8')
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            res.end(html)
            return
          }
          next()
        })
      },
      closeBundle() {
        const outDir = path.join(__dirname, 'dist')
        const novoDir = path.join(outDir, 'novo')
        if (!fs.existsSync(novoDir)) fs.mkdirSync(novoDir, { recursive: true })
        fs.copyFileSync(
          path.join(__dirname, 'index_novo.html'),
          path.join(novoDir, 'index.html')
        )
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})