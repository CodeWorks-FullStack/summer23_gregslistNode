export const dev = window.location.origin.includes('localhost')
// NOTE we keep our baseURL pointing towards where our own API is hosted
export const baseURL = dev ? 'http://localhost:3000' : ''
export const useSockets = false

// NOTE these credentials should be from our own auth0 now
export const domain = 'dev-6mbyfxcixe08fnrv.us.auth0.com'
export const audience = 'classroom.com'
export const clientId = 'sVjly2QG2EvYojFSZK4JX4e7JRrQtRgy'
