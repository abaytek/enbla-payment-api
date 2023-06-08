import Order from "../models/order.model.js";

export const getOrders = (req, res) => {
  Order.find()
    .then((orders) => res.status(200).json(orders))
    .catch((err) => res.status(404).json(err));
};

export const getOrderById = (req, res) => {
  const userId = req.params.userId;
  Order.find({ customerId: userId })
    .then((order) => res.status(200).json(order))
    .catch((err) => res.status(404).json("No order with this id"));
};

export const getLatestOrders = (req, res) => {
  Order.find({ paymentStatus: "completed" })
    .sort({ orderDate: -1 }) // Sort in descending order based on orderDate
    .limit(5) // Retrieve only the first 5 results
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
};
