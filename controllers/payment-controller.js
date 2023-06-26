import Order from "../models/order.model.js";
import dotenv from "dotenv";
import Chapa from "chapa";
dotenv.config();
let myChapa = new Chapa(process.env.CHAPA_SECRET_KEY);
export const payWithChapa = async (req, res) => {
  const { products, customerId, shippingAddress, customer, currency, amount } =
    req.body;
  const { first_name, last_name, email } = customer;
  const customerInfo = {
    amount,
    currency,
    email,
    first_name,
    last_name,
    callback_url: "http://localhost:8800/api/payment/verify",
    return_url: `exp://192.168.0.100:19000/`,
    // return_url: `exp://exp.host/@your-username/your-app-name?screen=Order`,
    customization: {
      title: "Enbla Payment",
      description: "It is time to pay and eat",
    },
  };

  try {
    const response = await myChapa.initialize(customerInfo, { autoRef: true });
    const newOrder = Order({
      customerId,
      customer,
      products,
      totalPrice: amount,
      shippingAddress,
      currency,
      tx_ref: response.tx_ref,
    });
    await newOrder.save();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const verifyPayment = async (req, res) => {
  const { tx_ref } = req.body;
  try {
    let response = await myChapa.verify(tx_ref);
    console.log(response?.data?.status)
    if (response?.data?.status !== "success") {
      return res.status(203).json("failed");
    } 
    await Order.findOneAndUpdate(
        { tx_ref: response.data?.tx_ref },
        {
          $set: {
            paymentStatus: "completed",
            orderDate: response.data.updated_at,
            createdAt: response.data.created_at,
            updatedAt: response.data.updated_at,
          },
        },
        { new: true }
      );
    res.status(200).json("success");
  } catch (err) {
    res.status(500).json("Something Wrong");
  }
};
