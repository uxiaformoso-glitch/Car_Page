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
        super(brand, model, year, 'coche')
        this.door = door;
    }
}

class Motorbike extends Vehicle {
    constructor(brand, model, year, typeMoto) {
        super(brand, model, year, 'moto')
        this.typeMoto = typeMoto;
    }
}

class Truck extends Vehicle {
    constructor(brand, model, year, weigth) {
        super(brand, model, year, 'camion')
        this.weigth = weigth;
    }
}

let dataBase = [
    new Car("Seat", "Ibiza", 2015, 4),
    new Motorbike("Yamaha", "GF", 2020, 600)
];

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
