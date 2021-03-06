/* eslint-disable max-classes-per-file */
import {
    Model,
    DataTypes,
    Optional
} from 'sequelize'
import Validator from 'validatorjs'
import {signUpDataRules} from './requestDataRules'
import {sequelize} from '../config/db.config'
import {
    createBadRequestResponse,
    createInternalErrorResponse,
    createUserConflictResponse,
    createUserNotFoundResponse,
    ErrorData
} from '../controllers/responseHelpers'
import {SignUpData} from '../controllers/auth/types'

const bcrypt = require('bcrypt')

export type RequestWithParams = {
    params: any
}

export type Iterable<T> = T | T[]

export type Nullable<T> = T | null
export interface UserAttributes {
    id: number
    email: string
    password: string
    admin: boolean
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export class User extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    public id!: number
    public email!: string
    public password!: string
    public admin!: boolean

    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    public static async add(req: unknown): Promise<User | ErrorData> {
        try {
            const isSignUpData = (obj: unknown): obj is SignUpData => {
                const validation = new Validator(obj, signUpDataRules)
                return !validation.fails()
            }

            if (!isSignUpData(req)) {
                return createBadRequestResponse()
            }

            const isUserAlredyExsists: number = await User.count({
                where: {email: req.body.data.attributes.email}
            })

            if (isUserAlredyExsists !== 0) {
                return createUserConflictResponse()
            }

            const countUsers: number = await User.count()

            const hashPassword: string = bcrypt.hashSync(req.body.data.attributes.password, 10)

            const userCreationObject: UserCreationAttributes = {
                email: req.body.data.attributes.email,
                password: hashPassword,
                admin: countUsers === 0
            }

            const newUser: User = await User.create(userCreationObject)
            return newUser
        } catch (error) {
            return createInternalErrorResponse()
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static async get(
        id: Nullable<number> = null
    ): Promise<Iterable<User> | ErrorData> {
        if (id === null) {
            const users: Iterable<User> = await User.findAll()
            return users
        }
        const user: Iterable<User> | null = await User.findOne({where: {id}})

        if (user === null) {
            return createUserNotFoundResponse()
        }

        return user
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: new DataTypes.STRING(256),
            allowNull: false
        },
        password: {
            type: new DataTypes.STRING(256),
            allowNull: false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        tableName: 'users',
        sequelize
    }
)
