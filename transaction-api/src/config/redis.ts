import { createClient } from 'redis'

const client = createClient({
  url: process.env.REDIS_URL
})
const DEFAULT_EXPIRATION = 5 * 60

client.on('error', (err) => console.log('Redis Client Error', err));

export async function connectToRedis() {
  client.connect()
}

export async function getOrSetCache<T>(key: string, callback: () => Promise<T>): Promise<T> {
  const data = await client.get(key)

  if(data) return  JSON.parse(data)

  const newData = await callback()
  client.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(newData))
  return newData
}