import { Router } from 'express'
import apiRoutes from './api/api.routes.js'
import viewsRoutes from './views/view.routes.js'

const router = Router()

router.get('/', (req, res) => {
    res.status(200).send("Hola mundo")
});
router.use('/api', apiRoutes)
router.use('/', viewsRoutes)


export default router