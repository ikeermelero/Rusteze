import { Router } from 'express'
import apiRoutes from './api/router.js'

const router = Router()

router.get('/', (req, res) => {
    res.status(200).send("Hola mundo")
});
router.use('/api', apiRoutes)


export default router