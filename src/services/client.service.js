// src/services/dashboard.service.js
import { userModel, carModel } from '../models/index.js'

async function getClientDashboard(clientId) {
    const authUser = await userModel.findByPk(clientId, {
        attributes: ['id_user', 'name', 'surname', 'email', 'id_taller']
    })

    if (!authUser) throw new Error('Cliente no encontrado')
    if (!authUser.id_taller) throw new Error('Este cliente no tiene taller asignado')

    // Todos los usuarios del mismo taller
    const clientes = await userModel.findAll({
        where: { 
            id_taller: authUser.id_taller,
            id_role: 3
        },
        attributes: ['id_user', 'name', 'surname', 'email']
    })

    return {
        totalClientes: clientes.length,
        clientes,
    }
}

async function getClientDetails(clientId) {
    const client = await userModel.findByPk(clientId, {
        attributes: ['id_user', 'name', 'surname', 'email', 'id_taller']
    })
    if (!client) throw new Error('Cliente no encontrado')

    const cars = await carModel.findAll({
        where: { id_user: clientId},
        attributes: ['id_car', 'brand', 'model', 'year']
    })
    if (!cars) throw new Error('Coches no encontrados')
    
    return {client, cars}

}

export default {
    getClientDashboard,
    getClientDetails
}