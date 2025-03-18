import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedVehicleVin",
          message: "Select a vehicle to perform an action on",
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle.vin,
          })),
        },
      ])
      .then((answers) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  performActions(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "Select an action",
          choices: [
            "Print details",
            "Start vehicle",
            "Accelerate 5 MPH",
            "Decelerate 5 MPH",
            "Stop vehicle",
            "Turn right",
            "Turn left",
            "Reverse",
            ...(this.getSelectedVehicle() instanceof Truck
              ? ["Tow a vehicle"]
              : []),
            ...(this.getSelectedVehicle() instanceof Motorbike
              ? ["Do a Wheelie"]
              : []),
            "Select or create another vehicle",
            "Exit",
          ],
        },
      ])
      .then((answers) => {
        const selectedVehicle = this.getSelectedVehicle();

        if (!selectedVehicle) {
          console.log("❌ No vehicle selected. Returning to menu...");
          this.startCli();
          return;
        }

        if (answers.action === "Print details") {
          selectedVehicle.printDetails();
        } else if (answers.action === "Start vehicle") {
          selectedVehicle.start();
        } else if (answers.action === "Accelerate 5 MPH") {
          selectedVehicle.accelerate(5);
        } else if (answers.action === "Decelerate 5 MPH") {
          selectedVehicle.decelerate(5);
        } else if (answers.action === "Stop vehicle") {
          selectedVehicle.stop();
        } else if (answers.action === "Turn right") {
          selectedVehicle.turn("right");
        } else if (answers.action === "Turn left") {
          selectedVehicle.turn("left");
        } else if (answers.action === "Reverse") {
          selectedVehicle.reverse();
        } else if (
          answers.action === "Tow a vehicle" &&
          selectedVehicle instanceof Truck
        ) {
          this.findVehicleToTow();
          return;
        } else if (
          answers.action === "Do a Wheelie" &&
          selectedVehicle instanceof Motorbike
        ) {
          console.log(selectedVehicle.doWheelie());
        } else if (answers.action === "Select or create another vehicle") {
          this.startCli();
          return;
        } else {
          this.exit = true;
        }

        if (!this.exit) {
          this.performActions();
        }
      });
  }

  findVehicleToTow(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleToTow",
          message: "Select a vehicle to tow",
          choices: this.vehicles
            .filter((v) => v.vin !== this.selectedVehicleVin) // Prevent towing itself
            .map((vehicle) => ({
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            })),
        },
      ])
      .then((answers) => {
        const truck = this.getSelectedVehicle() as Truck;

        if (!truck || !(truck instanceof Truck)) {
          console.log("❌ You can only tow with a truck.");
          this.performActions();
          return;
        }

        const vehicleToTow = this.vehicles.find(
          (v) => v.vin === answers.vehicleToTow
        );
        if (vehicleToTow) {
          truck.tow(vehicleToTow);
        } else {
          console.log("❌ Selected vehicle not found.");
        }

        this.performActions();
      });
  }

  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleType",
          message: "Select a vehicle type",
          choices: ["Car", "Truck", "Motorbike"],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === "Car") {
          this.createCar();
        } else if (answers.vehicleType === "Truck") {
          this.createTruck();
        } else if (answers.vehicleType === "Motorbike") {
          this.createMotorbike();
        }
      });
  }
  createCar(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );

        this.vehicles.push(car);
        this.selectedVehicleVin = car.vin;
        this.performActions();
      });
  }

  createTruck(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
        {
          type: "input",
          name: "towingCapacity",
          message: "Enter Towing Capacity",
        },
      ])
      .then((answers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          parseInt(answers.towingCapacity)
        );

        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        this.performActions();
      });
  }

  createMotorbike(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
      ])
      .then((answers) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          ""
        );

        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        this.performActions();
      });
  }

  getSelectedVehicle(): Car | Truck | Motorbike | undefined {
    return this.vehicles.find(
      (vehicle) => vehicle.vin === this.selectedVehicleVin
    );
  }

  startCli(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "CreateOrSelect",
          message:
            "Would you like to create a new vehicle or select an existing one?",
          choices: ["Create a new vehicle", "Select an existing vehicle"],
        },
      ])
      .then((answers) => {
        if (answers.CreateOrSelect === "Create a new vehicle") {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

export default Cli;
