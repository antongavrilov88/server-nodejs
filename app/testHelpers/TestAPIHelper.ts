import {app} from '../app'

// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('supertest')

export class TestAPIHelper {
    static request = {
        post: async (data: any, url: any, token: any = null) => {
            let res
            if (token) {
                res = await request(app)
                    .post(url)
                    .send(data)
                    .set('Authorization', `Bearer ${token}`)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .then((response: any) => response)
            } else {
                res = await request(app)
                    .post(url)
                    .send(data)
                    .set('Accept', 'application/json')
                    .set('Content-Type', 'application/json')
                    .then((response: any) => response)
            }
            return res
        },
        get: async (url: any, token: any = null) => {
            let res
            if (token) {
                res = await request(app)
                    .get(url)
                    .send()
                    .set('Authorization', `Bearer ${token}`)
                    .set('Accept', 'application/json')
                    .then((response: any) => response)
            } else {
                res = await request(app)
                    .get(url)
                    .send()
                    .set('Accept', 'application/json')
                    .then((response: any) => response)
            }
            return res
        },
        delete: async (data: any, url: any, token: any = null) => {
            let res
            if (token) {
                res = await request(app)
                    .delete(url)
                    .send(data)
                    .set('Authorization', `Bearer ${token}`)
                    .set('Accept', 'application/json')
                    .then((response: any) => response)
            } else {
                res = await request(app)
                    .delete(url)
                    .send(data)
                    .set('Accept', 'application/json')
                    .then((response: any) => response)
            }
            return res
        }
    }
}
