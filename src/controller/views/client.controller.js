import clientService from "../../services/client.service.js";

export async function getClientDashboard(req, res) {
  // let { id,} = req.user  ← descomentar cuando tengamos auth
  let id = 1;
  try {
    const data = await clientService.getClientDashboard(id);
    return res.render("dashboard-client", { data });

  } catch (error) {
    console.error("Error en dashboard:", error.message);
    return res.status(500).render("errors/500", { message: error.message });
  }
}

export async function getClientDetails(req, res){
    const { id } = req.params;
    try {
        const data = await clientService.getClientDetails(id);
        return res.render("clientDetails", { data });
    } catch (error) {
        console.error("Error en detalles del cliente:", error.message);
        return res.status(500).render("errors/500", { message: error.message });
    }
}

export default { getClientDashboard, getClientDetails };
