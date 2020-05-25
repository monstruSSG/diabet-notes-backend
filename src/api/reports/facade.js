const moment = require('moment')

const valuesLogic = require('../values/logic')

let helpers = {
    perDayCount: async (day, end) => {
        return {
            day,
            good: (await valuesLogic.get({ $or: [{ value: { $gte: 70 } }, { value: { $lte: 180 } }], $and: [{ createdAt: { $gte: day } }, { createdAt: { $lt: end } }] })).count,
            low: (await valuesLogic.get({ value: { $lt: 70 }, createdAt: { $gte: day }, $and: [{ createdAt: { $gte: day } }, { createdAt: { $lt: end } }] })).count,
            high: (await valuesLogic.get({ value: { $gt: 180 }, createdAt: { $gte: day }, $and: [{ createdAt: { $gte: day } }, { createdAt: { $lt: end } }] })).count
        }
    }
}

module.exports = {
    get: async () => {
        let todayValues = (await valuesLogic.get({ createdAt: { $gte: moment().startOf('day').toDate() } })).values
        let allValues = (await valuesLogic.get({})).values.map(value => value.value)

        let promiseArr = []

        for (let i = 0; i < 7; i++) {
            let lastDay = moment().subtract(i, 'days');
            promiseArr.push(helpers.perDayCount(lastDay.toDate(), lastDay.endOf('week').toDate()))
        }

        let lastDaysCount = await Promise.all(promiseArr)

        return {
            todayValues,
            lastDaysCount,
            allValues
        }
    }
}