import userModel from "./user.model.js";
import roleModel from "./role.model.js";
import garageModel from "./garage.model.js";
import carModel from "./car.model.js";
import reservationModel from "./reservation.model.js";
import taskModel from "./task.model.js";
import repairModel from "./repair.model.js";
import invoiceModel from "./invoice.model.js";

// ── ROLE ──────────────────────────────────────────────────────────────────────
roleModel.hasMany(userModel, { foreignKey: 'id_role' });
userModel.belongsTo(roleModel, { foreignKey: 'id_role' });

// ── TALLER ────────────────────────────────────────────────────────────────────
garageModel.hasMany(userModel, { foreignKey: 'id_taller' });
garageModel.hasMany(reservationModel, { foreignKey: 'id_taller' });
userModel.belongsTo(garageModel, { foreignKey: 'id_taller' });
reservationModel.belongsTo(garageModel, { foreignKey: 'id_taller' });

//── USER ──────────────────────────────────────────────────────────────────────
userModel.hasMany(carModel, { foreignKey: 'id_user' });
userModel.hasMany(reservationModel, { foreignKey: 'id_user' });
userModel.hasMany(taskModel, { foreignKey: 'id_user', as: 'AssignedTasks' });
carModel.belongsTo(userModel, { foreignKey: 'id_user' });
reservationModel.belongsTo(userModel, { foreignKey: 'id_user' });
taskModel.belongsTo(userModel, { foreignKey: 'id_user', as: 'Mechanic' });

//── CAR ───────────────────────────────────────────────────────────────────────
carModel.hasMany(reservationModel, { foreignKey: 'id_car' });
carModel.hasMany(repairModel, { foreignKey: 'id_car' });
reservationModel.belongsTo(carModel, { foreignKey: 'id_car' });
repairModel.belongsTo(carModel, { foreignKey: 'id_car' });

//── REPAIR ────────────────────────────────────────────────────────────────────
repairModel.hasMany(taskModel, { foreignKey: 'id_repair' });
repairModel.hasOne(invoiceModel, { foreignKey: 'id_repair' });
taskModel.belongsTo(repairModel, { foreignKey: 'id_repair' });
invoiceModel.belongsTo(repairModel, { foreignKey: 'id_repair' });

export {
  userModel,
  roleModel,
  garageModel,
  carModel,
  reservationModel,
  taskModel,
  repairModel,
  invoiceModel,
};