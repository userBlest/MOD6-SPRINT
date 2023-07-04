const postRoomate = () => {
    axios.get('https://randomuser.me/api')
        .then((response) => {
            const { first, last } = response.data.results[0].name;
            const nuevoUsuario = {
                nombre: `${first} ${last}`,
            };

            console.log(nuevoUsuario);

            axios.post('http://localhost:3000/users', nuevoUsuario)
                .then((response) => {
                    console.log(response);
                    console.log('Usuario agregado correctamente');
                })
                .catch((error) => {
                    console.log('Ha ocurrido un error registrando un nuevo roommate', error);
                });
        });
};


function sendForm() {
    axios.get('http://localhost:3000/gastos')
        .then(response => {
            const gastos = response.data;
            const ultimoIdGasto = gastos[gastos.length - 1];
            const nuevaID = ultimoIdGasto && ultimoIdGasto.idGasto ? ultimoIdGasto.idGasto + 1 : 1;
            const seleccion = document.getElementById('seleccion');
            const selectedOption = seleccion.options[seleccion.selectedIndex];
            const nombre = selectedOption.textContent;
            const asociado = selectedOption.value;
            const descripcionForm = document.getElementById('descripcion').value;
            const montoForm = document.getElementById('monto').value;
            const nuevoGasto = {
                idGasto: nuevaID,
                nombreAsociado: nombre,
                monto: parseInt(montoForm),
                descripcion: descripcionForm,
                userAsociate: parseInt(asociado)
            };
            console.log(nuevoGasto)
            axios.post('http://localhost:3000/gastos', nuevoGasto)
                .then(respuesta => {
                    console.log(respuesta);
                    console.log('Gasto agregado correctamente');
                })
                .catch(error => {
                    console.error('Ha ocurrido un error registrando un nuevo gasto', error);
                });
        })
        .catch(error => {
            console.error('Ha ocurrido un error obteniendo los gastos', error);
        });
}

const botonAddGastos = document.getElementById('addGastos');
botonAddGastos.addEventListener("click", () => {

    const seleccion = document.getElementById('seleccion');
    const selectedOption = seleccion.options[seleccion.selectedIndex];
    const nombre = selectedOption.textContent;
    const idAsociado = selectedOption.value;
    const descripcionForm = document.getElementById('descripcion').value;
    const montoForm = document.getElementById('monto').value;

    const tr = document.getElementById('gastosHistorial')
    tr.innerHTML += `   
        <tr>
        <td>${nombre}</td>
        <td>${descripcionForm}</td>
        <td>${montoForm}</td>
        <td class="d-flex align-items-center justify-content-between">
            <i class="fas fa-edit text-warning editar" data-toggle="modal" data-target="#exampleModal" data-nombre="${nombre}" data-descr="${descripcionForm}" data-monto="${montoForm}"></i>
            <i class="fas fa-trash-alt text-danger basurero" id="cons${idAsociado}"></i>
        </td>
        </tr>
        `
})


botonAddRoommie = document.getElementById('postRoommie')
botonAddRoommie.addEventListener("click", () => {
    axios.get('http://localhost:3000/users')
        .then((response) => {
            //Deberia hacerse un getelementbyID al form y no buscarlo por metodo GET
            const usuarios = response.data
            //Con esto saco al último usuario agregado de la BD.
            const ultimoUsuario = usuarios[usuarios.length - 1];
            const { nombre } = ultimoUsuario;
            const tr = document.getElementById('roommates')
            tr.innerHTML += `     
            <tr>                  
            <td>${nombre} </td>
            <td class="text-danger">100000</td>
            <td class="text-success">100000</td>
            </tr>
            `
        })
})