//const SERVER_IP = '127.0.0.1:8000'
const SERVER_IP = '192.168.4.43:8000'


export const ENV = {
    BASE_PATH: `http://${SERVER_IP}`,
    BASE_API: `http://${SERVER_IP}/api`,
    API_ROUTES:{
        Register: 'auth/register/',
        Login : 'auth/login/',
        RefreshToken: 'auth/refresh_token/',
        ValidateUsernameExist: 'auth/validate-username/',
        ValidateEmailExist: 'auth/validate-email/',


    },
    JWT:{
        Access: 'access',
        Refresh: 'refresh' 
    }
}

export const SECRET_WORD = "django-insecure-&wa!bbu$_pi9nfg@odgg-zl_l9li(^d9vvcbys#v0+&iy_y^7h"


