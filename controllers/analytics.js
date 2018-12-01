const moment = require('moment');
const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

module.exports.overview = async (req, res) => {
  try {
    const allOrders = await Order.find({ user: req.user.id }).sort(1);
    const ordersMap = getOrdersMap(allOrders);
    const yesterdayOrders =
      ordersMap[
        moment()
          .add(-1, 'd')
          .format('DD.MM.YYYY')
      ] || [];

    const totalOrders = allOrders.length;
    const totalOrdersYesterday = yesterdayOrder.length;
    const totalDays = Object.keys(ordersMap).length;
    const ordersPerDay = (totalOrders / daysNum).toFixed(0);
    const ordersPercent = ((totalOrdersYesterday / ordersPerDay - 1) * 100).toFixed(2);
    const totalGain = calculatePrice(allOrders);
    const gainPerDay = totalGain / daysNumber;
    const gainYesterday = calculatePrice(yesterdayOrders);
    const gainPercent = ((gainYesterday / gainPerDay - 1) * 100).toFixed(2);
    const gainCompare = (gainYesterday - gainPerDay).toFixed(2);
    const ordersCompare = (totalOrdersYesterday - ordersPerDay).toFixed(2);

    res.status(200).json({
      gain: {
        persent: Math.abs(+gainPercent),
        compare: Math.abs(+gainCompare),
        yesterday: +gainYesterday,
        isHigher: +gainPercent > 0
      },
      orders: {
        persent: Math.abs(+ordersPercent),
        compare: Math.abs(+ordersCompare),
        yesterday: +totalOrdersYesterday,
        isHigher: +ordersPercent > 0
      }
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.analytics = (req, res) => {};

function getOrdersMap(orders = []) {
  const daysOrders = {};
  orders.forEach(order => {
    const date = moment(order.date).format('DD.MM.YYYY');
    if (date === moment().format('DD.MM.YYYY')) {
      return;
    }
    if (!daysOrdes[date]) {
      daysOrders[date] = [];
    }
    daysOrders[date].push(order);
  });

  return daysOrders;
}

function calculatePrice(orders = []) {
  return orders.reduce((total, order) => {
    const orderPrice = order.list.reduce((orderTotal, item) => {
      return (orderTotal += item.cost * item.quantity);
    }, 0);
    return (total += orderPrice);
  }, 0);
}
