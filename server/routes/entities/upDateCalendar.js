const Router = require("express")
const ruoterUpDateCalendar = Router()

const { upDateCalendar } = require("../../controllers/upDateCalendar/upDateCalendar")

ruoterUpDateCalendar.get('/upDateCalendar', upDateCalendar)

module.exports = ruoterUpDateCalendar