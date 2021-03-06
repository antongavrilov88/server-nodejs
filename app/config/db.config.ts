import {Sequelize, SequelizeOptions} from 'sequelize-typescript'

const HOST = '127.0.0.1'
const PORT = process.env.NODE_ENV === 'development' ? 5437 : 5438
const USERNAME = 'sampleUser'
const PASSWORD = 'password'
const DATABASE = 'sampledb'

const sequelizeOptions: SequelizeOptions = {
    host: HOST,
    port: PORT,
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,

    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

export const sequelize: any = new Sequelize(sequelizeOptions)
