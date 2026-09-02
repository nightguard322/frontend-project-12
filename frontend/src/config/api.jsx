const BASEURL = 'http://0.0.0.0:5001'
const ENDPOINTS = {
        addUser: () => `${BASEURL}/api/v1/signup`,
        addCredentials: () => `${BASEURL}/api/v1/login`,
        getChannels: () => `${BASEURL}/api/v1/channels`,
        addChannel: () => `${BASEURL}/api/v1/channels`,
        updateChannel: id => `${BASEURL}/api/v1/channels/${id}`,
        removeChannel: id => `${BASEURL}/api/v1/channels/${id}`,
        getMessages: () =>`${BASEURL}/api/v1/messages`,
        addMessage: () =>`${BASEURL}/api/v1/messages`,
    }

export default (routeName, ...args) => {
    const routeFn = ENDPOINTS[routeName]
    return routeFn(...args)
}
