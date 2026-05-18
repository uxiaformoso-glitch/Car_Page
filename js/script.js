//Id references
const vehicleTypeSelect = document.getElementById('vehicleType');
const dinamicFieldContainer = document.getElementById('dinamicField');
const btnLoadVehicles = document.getElementById('btn-loadVehicles');
const btnAddVehicle = document.getElementById('btn-addVehicles');
const vehicleList = document.getElementById('vehicleList');
const vehicleForm = document.getElementById('vehicleForm');

//State to know if the user already loaded the Vehicles
let isDBLoaded = false;

const vehicleImages = {
    coche: 'Img/carImg.png',
    moto: 'Img/motorbikeImg.png',
    camion: 'Img/truckImg.png'
};

//Listen to selector to change the fifth field
vehicleTypeSelect.addEventListener('change', (e) => {
    const type = e.target.value;
    let fieldHTML = '';

    if(type === 'coche') {
        fieldHTML = `
            <label>Puertas</label>
            <input type="number" placeholder="Puertas" id="extraField" required>
        `;
    } else if (type === 'moto') {
        fieldHTML = `
            <label>Tipo</label>
            <input type="number" placeholder="Tipo" id="extraField" required>
        `;
    } else if (type === 'camion') {
        fieldHTML = `
            <label>Peso del camión</label>
            <input type="number" placeholder="Peso" id="extraField" required>
        `;
    }

    dinamicFieldContainer.innerHTML = fieldHTML;
});

//Button Load Vehicles event
btnLoadVehicles.addEventListener('click', () => {
    isDBLoaded = true;
    renderVehicles();
});

//Button Add Vehicle event
btnAddVehicle.addEventListener('click', (e) => {
    e.preventDefault();

    const type = vehicleTypeSelect.value;
    const brand = document.getElementById('vehicleBrand').value.trim();
    const model = document.getElementById('vehicleModel').value.trim();
    const yearRaw = parseInt(document.getElementById('vehicleYear').value);
    const extraField = document.getElementById('extraField');

    console.log("Valores actuales: ", { type, brand, model, yearRaw, extraField: extraField ? extraField.value : null });

    //Check fields are not empty
    if (!type || !brand || !model || !yearRaw || !extraField || !extraField.value) {
        alert('Por favor, rellene todos los campos del vehículo.');
        return;
    }

    const year = parseInt(yearRaw);
    const extraValue = parseInt(extraField.value);
    let newVehicle;

    //Instance with inheritance depending of type
    if (type === 'coche') {
        newVehicle = new Car(brand, model, year, extraValue);
    } else if (type === 'moto') {
        newVehicle = new Motorbike(brand, model, year, extraValue);
    } else if (type === 'camion') {
        newVehicle = new Truck(brand, model, year, extraValue);
    }

    //Save on the data base
    insertVehicleDB(newVehicle);

    //Form reset
    vehicleForm.reset();
    dinamicFieldContainer.innerHTML = '';

    //If the list is already visible, it automatically updates
    if (isDBLoaded) {
        renderVehicles();
    }
});

//Function to paint the list 
function renderVehicles(){
    if(!isDBLoaded) return;

    vehicleList.innerHTML = '';
    const currentVehicles = loadVehiclesDB();

    if (currentVehicles.length === 0){
        vehicleList.innerHTML = '<p class="emptyListText">No hay vehículos para mostrar.</p>';
        return;
    }

    currentVehicles.forEach(vehicle => {
        let extraText = '';
        if (vehicle instanceof Car) extraText = `Puestas: ${vehicle.door}`;
        if (vehicle instanceof Motorbike) extraText = `Tipo: ${vehicle.typeMoto}`;
        if (vehicle instanceof Truck) extraText = `Peso: ${vehicle.weigth} kg`;

        //Placeholder Img
        const imgUrl = vehicleImages[vehicle.type] || 'https://via.placeholder.com/60';

        const row = document.createElement('div');
        row.className = 'vehicleRow';

        row.innerHTML = `
            <div class="rowImg">
                <img src="${imgUrl}" alt="${vehicle.type}">
            </div>

            <div class="rowInfo">
                <div class="infoTop">${vehicle.brand}</div>
                <div class="infoBellow">${vehicle.year}</div>
            </div>

            <div class="rowInfo">
                <div class="infoTop">${vehicle.model}</div>
                <div class="infoBellow">${extraText}</div>
            </div>

            <div>
                <button class="btn-deleteVehicle" onclick="removeVehicle(${vehicle.id})">✕</button>
            </div>
        `;
        vehicleList.appendChild(row);
    });
}

window.removeVehicle = function(id){
    deleteVehicleDB(id);
    renderVehicles();
};