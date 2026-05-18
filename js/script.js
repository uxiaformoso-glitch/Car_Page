//Id references
const vehicleTypeSelect = document.getElementById('vehicleType');
const dinamicFieldContainer = document.getElementById('dinamicField');
const btnLoadVehicles = document.getElementById('btn-loadVehicles');
const btnAddVehicle = document.getElementById('btn-addVehicles');
const vehicleList = document.getElementById('vehicleList');
const vehicleForm = document.getElementById('vehicleForm');

//State to know if the user already loaded the Vehicles
let idDBLoaded = false;

const vehicleImages = {
    car: 'Img/carImg.png',
    motorbike: 'Img/motorbikeImg.png',
    truck: 'truckImg.png'
};

//Listen to selector to change the fifth field