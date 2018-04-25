import io from 'socket.io-client'
export const ENDPOINT = `https://ufind-api.herokuapp.com/ufind/api/v1`
export const SOCKET = io(`${ENDPOINT}/chat`, { 
  transports: ['websocket'],
  pingTimeout: 30000
 }
)