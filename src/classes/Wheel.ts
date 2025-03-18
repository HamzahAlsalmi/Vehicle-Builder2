// Wheel class that defines the properties of a wheel
class Wheel {
  private diameter: number;
  private tireBrand: string;

  constructor(diameter: number = 18, tireBrand: string = "GoodYear") {
    this.diameter = diameter;
    this.tireBrand = tireBrand;
  }

  // Getter for diameter
  getDiameter(): number {
    return this.diameter;
  }

  // Getter for tireBrand
  getTireBrand(): string {
    return this.tireBrand;
  }
}

// Export the Wheel class
export default Wheel;
