import Vehicle from "./Vehicle.js";
import Wheel from "./Wheel.js";

class Car extends Vehicle {
  wheels: Wheel[];

  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[]
  ) {
    super(vin, color, make, model, year, weight, topSpeed);
    this.wheels = wheels;
  }

  override printDetails(): void {
    super.printDetails();
    console.log(
      `Wheels: ${this.wheels
        .map((wheel) => `${wheel.getTireBrand()} - ${wheel.getDiameter()} inch`)
        .join(", ")}`
    );
  }
}

export default Car;
