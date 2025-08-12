import express from 'express'
import cors from 'cors'
import {prisma, testDbConnection} from './db.js'
import taskRouter from './routes/tasks.js'

const app = express()
app.use(cors())
app.use(express.json())


testDbConnection()
    .then(() => console.log('db bağlantısı başarılı'))
    .catch((e) => {
        console.error('db bağlantı hatası', e)
        process.exit(1)
    })

app.get('/health', async (_req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`
        res.json({ok: true})
    } catch (e) {
        res.status(500).json({ok: false, error: 'db unreachable'})
    }
})  

app.use('/api/tasks', taskRouter)

app.use((err, _req, res, _next) => {
  if (err?.code === 'P2025') {
    return res.status(404).json({ error: 'Record not found' })
  }
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
})


export default app