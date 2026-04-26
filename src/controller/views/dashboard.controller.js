// src/controllers/views/dashboard.controller.js
import dashboardService from '../../services/dashboard.service.js'

export async function getDashboard(req, res) {
    // let { id, rol } = req.user  ← descomentar cuando tengamos auth
    let id = 1;
    let rol = 'admin';

    try {
        if (rol === 1) {
            const data = await dashboardService.getAdminDashboard(id)
            return res.render('dashboard-admin', { data })
        }

        if (rol === 2) {
            const data = await dashboardService.getEmployerDashboard(id)
            return res.render('dashboard-employer', { data })
        }

     
        return res.status(403).render('errors/404')

    } catch (error) {
        console.error('Error en dashboard:', error.message)
        return res.status(500).render('errors/500', { message: error.message })
    }
}

export default { getDashboard }