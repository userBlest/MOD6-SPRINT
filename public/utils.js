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