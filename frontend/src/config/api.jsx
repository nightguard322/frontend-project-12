const BASEURL = ''
const ENDPOINTS = {
        addUser: () => `/api/v1/signup`,
        addCredentials: () => `/api/v1/login`,
        getChannels: () => `/api/v1/channels`,
        addChannel: () => `/api/v1/channels`,
        updateChannel: id => `/api/v1/channels/${id}`,
        removeChannel: id => `/api/v1/channels/${id}`,
        getMessages: () =>`/api/v1/messages`,
        addMessage: () =>`/api/v1/messages`,
    }

export default (routeName, ...args) => {
    const routeFn = ENDPOINTS[routeName]
    console.log('route fn', routeFn, 'name', routeName)
    return routeFn(...args)
}
