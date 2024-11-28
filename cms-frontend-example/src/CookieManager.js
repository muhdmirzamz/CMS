export default class CookieManager {

    CookieManager() {

    }

    // setCookie(name, value, days) {
    //     const date = new Date()
    //     date.setDate(date.getTime() + days * 24 * 60 * 60 * 1000)

    //     document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`
    // }

    setCookieWithExpiry(key, value, milliseconds) {
        const date = new Date()
        date.setTime(date.getTime() + milliseconds)

        document.cookie = `${key}=${value};expires=${date.toUTCString()};path=/`
    }

    // a session cookie does not have the expire attribute
    // deletes when the tab or the browser is closed
    setSessionCookie(key, value) {
        document.cookie = `${key}=${value};path=/`
    }

    getCookie(name) {
        const cookies = document.cookie.split(';')

        for (const cookie of cookies) {
            const [key, val] = cookie.split('=')

            if (key === name) {
                return val
            }
        }

        return null
    }

    deleteCookie(name) {
        const date = new Date()
        
        // set 1s back in the past
        date.setTime(date.getTime() - 1000)

        document.cookie = `${name}=;expires=${date.toUTCString()};path=/`        
    }
}