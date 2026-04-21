// src/services/dashboard.service.js
import { userModel } from '../models/index.js'

async function getClientDashboard(clientId) {
    const authUser = await userModel.findByPk(clientId, {
        attributes: ['id_user', 'name', 'surname', 'email', 'id_taller']
    })

    if (!authUser) throw new Error('Cliente no encontrado')
    if (!authUser.id_taller) throw new Error('Este cliente no tiene taller asignado')

    // Todos los usuarios del mismo taller
    const clientes = await userModel.findAll({
        where: { id_taller: authUser.id_taller },
        attributes: ['id_user', 'name', 'surname', 'email']
    })

    return {
        totalClientes: clientes.length,
        clientes,
    }
}

export default {
    getClientDashboard
}