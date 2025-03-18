import Vehicle from "./Vehicle.js";

class Motorbike extends Vehicle {
  wheelType: string;

  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheelType: string
  ) {
    super(vin, color, make, model, year, weight, topSpeed);
    this.wheelType = wheelType;
  }

  doWheelie(): string {
    return `🏍️ Motorbike ${this.make} ${this.model} is doing a wheelie!`;
  }

  override printDetails(): void {
    super.printDetails();
    console.log(`Wheel Type: ${this.wheelType}`);
  }
}

export default Motorbike;
