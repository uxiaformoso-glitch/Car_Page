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

//Initialize DB
let dataBase = [];

function initializeDB() {
    const savedData = localStorage.getItem('myVehicles');

    if (savedData) {
        const plainObjects = JSON.parse(savedData);

        dataBase = plainObjects.map(v => {
            if (v.type === 'coche') return new Car(v.brand, v.model, v.year, v.door, v.id);
            if (v.type === 'moto') return new Motorbike(v.brand, v.model, v.year, v.typeMoto, v.id);
            if (v.type === 'camion') return new Truck(v.brand, v.model, v.year, v.weigth, v.id);
        });
    } else {
        //Default data
        dataBase = [
            new Car("Seat", "Ibiza", 2015, 4),
            new Motorbike("Yamaha", "GT", 2020, 600)
        ];
        saveOnLocalStorage();
    }
}

function saveOnLocalStorage() {
    localStorage.setItem('myVehicles', JSON.stringify(dataBase));
}

//CRUD functions required
function loadVehiclesDB(){
    return dataBase;
}

function insertVehicleDB(vehicle) {
    dataBase.push(vehicle);
    saveOnLocalStorage();
}

function deleteVehicleDB(id){
    dataBase = dataBase.filter(vehicle => vehicle.id !== id);
    saveOnLocalStorage();
}

initializeDB();