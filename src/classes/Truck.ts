import Vehicle from "./Vehicle.js";
import AbleToTow from "../interfaces/AbleToTow.js";

class Truck extends Vehicle implements AbleToTow {
  towingCapacity: number;

  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    towingCapacity: number
  ) {
    super(vin, color, make, model, year, weight, topSpeed);
    this.towingCapacity = towingCapacity;
  }

  tow(vehicle: Vehicle): void {
    if (vehicle.weight <= this.towingCapacity) {
      console.log(
        `🚚 Truck ${this.make} ${this.model} is towing ${vehicle.make} ${vehicle.model}.`
      );
    } else {
      console.log(
        `❌ Truck ${this.make} ${this.model} cannot tow ${vehicle.make} ${vehicle.model}, it is too heavy!`
      );
    }
  }

  override printDetails(): void {
    super.printDetails();
    console.log(`Towing Capacity: ${this.towingCapacity} kg`);
  }
}

export default Truck;
