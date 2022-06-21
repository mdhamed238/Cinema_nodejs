import cookies from 'js-cookie'
 
export const getUserFromCookie = () => {
    const cookie = cookies.get('auth')
    if (!cookie) {
        return
    }
    return cookie
}


export const setUserCookie = (user) => {
    cookies.set('auth', user, {
        secure: true,  
        expires: 1,
    })
}

export const getCookie = name => cookies.get(name)

export const setTokenCookie = user => {
    cookies.set('token', user, {
        secure: true,  
        expires: 3
    })
}