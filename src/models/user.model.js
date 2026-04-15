// Por ahora los datos viven en memoria.
// En el Bloque 3 este archivo hablará con la base de datos.
/* const usuarios = [
{ id: 1, nombre: 'Ana', email: 'ana@email.com' },
{ id: 2, nombre: 'Carlos', email: 'carlos@email.com' },
]
const getAll = () => {
return usuarios
}
const getById = (id) => {
return usuarios.find(u => u.id === id) || null
}
const create = (datos) => {
const nuevo = { id: usuarios.length + 1, ...datos }
usuarios.push(nuevo)
return nuevo
}
const remove = (id) => {
const index = usuarios.findIndex(u => u.id === id)
if (index === -1) return false
usuarios.splice(index, 1)
return true
}
export default { getAll, getById, create, remove } */