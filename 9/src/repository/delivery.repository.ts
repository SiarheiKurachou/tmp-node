import { DI } from "../server";
import { Delivery } from "../postgresql/entities/delivery";

export const createDelivery = async(type: string, address: string) => {
  try {
    const delivery = new Delivery(type, address);
    DI.deliveryRepository.create(delivery);

    const createdDelivery = await DI.deliveryRepository.findOne(delivery.uuid);
    return createdDelivery;
  } catch (err) {
    console.error("Error creating product: ", err);
  }
}