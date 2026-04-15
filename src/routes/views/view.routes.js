import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.status(200).send("Hola view")
});




export default router