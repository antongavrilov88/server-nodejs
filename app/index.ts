import {app} from './app'
import {db} from './models/index'
import {authRoutes} from './routes/auth.routes'
import {userRoutes} from './routes/user.routes'

db.sequelize.sync().then(() => {
})

userRoutes(app)
authRoutes(app)

const PORT = process.env.PORT || 9000

app.listen(PORT, () => {})
