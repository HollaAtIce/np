class fetcher {
    constructor() {
        this.prefix = '/api/'
    }

    get(resource, params) {
        return fetch(this.prefix + resource)
            .then(res => res.json())
    }

    post(resource, data) {
        return fetch(this.prefix + resource, { method: 'POST', body: formatBody(data) })
            .then(res => res.json())
    }
}

function formatBody(obj) {
    return JSON.stringify(obj)
}

export default new fetcher()