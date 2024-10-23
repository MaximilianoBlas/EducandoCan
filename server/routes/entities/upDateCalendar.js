const Router = require("express")
const ruoterUpDateCalendar = Router()

const { upDateCalendar } = require("../../controllers/upDateCalendar/upDateCalendar")
const { getBusyTime } = require("../../controllers/upDateCalendar/getBusyTime")
const { setBusyTime } = require("../../controllers/upDateCalendar/setBusyTime")

ruoterUpDateCalendar.get('/upDateCalendar', upDateCalendar)
ruoterUpDateCalendar.get('/upDateCalendar', getBusyTime)
ruoterUpDateCalendar.post('/upDateCalendar', setBusyTime)

module.exports = ruoterUpDateCalendar