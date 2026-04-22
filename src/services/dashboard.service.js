// src/services/dashboard.service.js
import { garageModel, userModel, carModel, repairModel } from '../models/index.js'

async function getAdminDashboard(adminId) {
    const garage = await garageModel.findOne({
        include: [{
            model: userModel,
            where: { id_user: adminId },
            attributes: []
        }]
    })

    if (!garage) throw new Error('Taller no encontrado para este admin')

    const clientes = await userModel.findAll({
        where: { 
            id_taller: garage.id_taller, 
            id_role: 3
        },
        attributes: ['id_user', 'name', 'surname', 'email']
    })

    const reparacionesActivas = await repairModel.findAll({
        where: { status: 'IN_PROGRESS' },
        include: [{
            model: carModel,
            attributes: ['brand', 'model', 'plate'],
            required: true,        // ← INNER JOIN, excluye repairs sin coche
            include: [{
                model: userModel,
                where: { id_taller: garage.id_taller },
                attributes: ['name', 'surname'],
                required: true     // ← INNER JOIN, excluye coches de otros talleres
            }]
        }]
    })

    return {
        garage: {
            id:       garage.id_taller,
            direccion: garage.address,
            ciudad:   garage.city,
        },
        totalClientes: clientes.length,
        clientes,
        totalReparacionesActivas: reparacionesActivas.length,
        reparacionesActivas: reparacionesActivas
        .filter(r => r.Car !== null && r.Car.User !== null)
        .map(r => ({
            id:          r.id_repair,
            diagnostico: r.diagnosis,
            fechaInicio: r.state_dates,
            coste:       r.total_cost,
            coche: {
                marca:     r.Car.brand,
                modelo:    r.Car.model,
                matricula: r.Car.plate,
            },
            cliente: {
                nombre:   r.Car.User.name,
                apellido: r.Car.User.surname,
            }
        }))
    }
}

async function getEmployerDashboard(employerId) {
    const employer = await userModel.findByPk(employerId, {
        attributes: ['id_taller']
    })

    if (!employer?.id_taller) throw new Error('Este usuario no tiene taller asignado')

    const garage = await garageModel.findByPk(employer.id_taller)

    const clientes = await userModel.findAll({
        where: { id_taller: employer.id_taller },
        attributes: ['id_user', 'name', 'surname', 'email']
    })

    const reparacionesActivas = await repairModel.findAll({
        where: { status: 'IN_PROGRESS' },
        include: [{
            model: carModel,
            attributes: ['brand', 'model', 'plate'],
            required: true,        // ← INNER JOIN
            include: [{
                model: userModel,
                where: { id_taller: employer.id_taller },
                attributes: ['name', 'surname'],
                required: true     // ← INNER JOIN
            }]
        }]
    })

    return {
        garage: {
            id:       garage.id_taller,
            direccion: garage.address,
            ciudad:   garage.city,
        },
        totalClientes:            clientes.length,
        clientes,
        totalReparacionesActivas: reparacionesActivas.length,
        reparacionesActivas: reparacionesActivas.map(r => ({
            id:          r.id_repair,
            diagnostico: r.diagnosis,
            fechaInicio: r.state_dates,  // ← nombre real en tu BD
            coste:       r.total_cost,
            coche: {
                marca:     r.Car.brand,
                modelo:    r.Car.model,
                matricula: r.Car.plate,
            },
            cliente: {
                nombre:   r.Car.User.name,
                apellido: r.Car.User.surname,
            }
        }))
    }
}

export default {
    getAdminDashboard,
    getEmployerDashboard
}