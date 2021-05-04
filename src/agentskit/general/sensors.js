export class Sensor {
    constructor() {
        if(this.constructor == Sensor){
            throw new Error("Object of Abstract Class cannot be created");
        }
    }

    sense() {
        throw new Error('You have to implement the method to sense!');
    }
}