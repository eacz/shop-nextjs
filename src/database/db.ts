import mongoose from 'mongoose'

const mongoConnection = {
  isConnected: 0,
}

export const connect = async () => {
  if (mongoConnection.isConnected) {
    console.log('Already connected')
    return
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState
    if (mongoConnection.isConnected === 1) {
      console.log('using a previous connection ')
      return
    }
    await mongoose.disconnect()
  }

  await mongoose.connect(process.env.MONGODB || '')
  mongoConnection.isConnected = 1
  console.log('Connected to mongodb', process.env.MONGO_URL)
}

export const disconnect = async () => {
  if (process.env.NODE_ENV === 'development') return

  if (mongoConnection.isConnected === 0) return
  await mongoose.disconnect()
  console.log('Disconnected from mongoose')
}
