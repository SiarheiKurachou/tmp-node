import { DI } from "../server";
import { Payment } from "../postgresql/entities/payment";

export const createPayment = async(type: string, address: string, creditCard: string) => {
  try {
    const payment = new Payment(type, address, creditCard);
    DI.paymentRepository.create(payment);

    const createdPayment = await DI.paymentRepository.findOne(payment.uuid);
    return createdPayment;
  } catch (err) {
    console.error("Error creating product: ", err);
  }
}