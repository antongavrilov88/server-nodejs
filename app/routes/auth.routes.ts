import {AuthAPI} from '../controllers/auth/auth.controller'
import {AuthRoutes, baseUrl} from './constants'
import {apiVersion} from '../controllers/config'

export const authRoutes = (app: any) => {
    // eslint-disable-next-line global-require
    const router = require('express').Router()

    const authAPI = new AuthAPI()

    router.post(AuthRoutes.signUp, authAPI.signUp)

    router.post(AuthRoutes.signIn, authAPI.signIn)

    router.delete(AuthRoutes.signOut, authAPI.signOut)

    app.use(baseUrl + apiVersion, router)
}
