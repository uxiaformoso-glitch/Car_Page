//Base class
class Vehicle {
    constructor(brand, model, year, type){
        this.id = Date.now() + Math.random();
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.type = type;
    }
}

//Subclasses
class Car extends Vehicle {
    constructor(brand, model, year, door) {
        super(brand, model, year, 'car')
        this.door = door;
    }
}

class Motorbike extends Vehicle {
    constructor(brand, model, year, typeMoto) {
        super(brand, model, year, 'motorbike')
        this.typeMoto = typeMoto;
    }
}

class Truck extends Vehicle {
    constructor(brand, model, year, weigth) {
        super(brand, model, year, 'truck')
        this.weigth = weigth;
    }
}

//CRUD functions required
function loadVehiclesDB(){
    return dataBase;
}

function insertVehicleDB(vehicle) {
    dataBase.push(vehicle);
}

function deleteVehicleDB(id){
    dataBase = dataBase.filter(vehicle => vehicle.id !== id);
}