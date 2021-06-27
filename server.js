import express from 'express'
import http from 'http'
import socketIo from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import { ConnectToDB } from './src/utils/db.util'
import { router as AuthModule } from './src/routes/auth.route'
const app = express()
app.use(express.json())
app.options('*', cors())
app.use(cors())
dotenv.config()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket) => {
  global.socket = socket
  socket.on('send-message', (data) => {
    io.emit('Received', data)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

app.get('/', (req, res) =>
  res.json({ message: 'you hit the mern chat app server' })
)

app.use('/api/v1/auth/', AuthModule)

server.listen(9001, async () => {
  try {
    let { databaseUrl } = process.env
    await ConnectToDB(databaseUrl)
    console.log('connected to DB!')
  } catch (err) {
    console.log('issues connecting to db ' + err.message)
  } finally {
    console.log('mern chat app server started!')
  }
})
