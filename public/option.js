document.addEventListener('DOMContentLoaded', () => {
  const userSelect = document.getElementById('seleccion');

  const borrarGastos = document.querySelectorAll('.fas.fa-trash-alt.text-danger');
  borrarGastos.forEach(borrarGasto => {
    const id = borrarGasto.id;
    borrarGasto.addEventListener('click', async () => {
      try {
        await axios.delete(`http://localhost:3000/gastos/${id}`);
        console.log(`Se ha eliminado el registro con el ID ${id}`);
      } catch (error) {
        console.log('Ha ocurrido un error intentando borrar el registro', error);
      }
    });
  });

  axios.get('http://localhost:3000/gastos')
    .then(response => {
      const gastos = response.data
      const trHistorial = document.getElementById('gastosHistorial')
      gastos.forEach(gastos => {
        trHistorial.innerHTML += `     
        <tr>
        <td>${gastos.nombreAsociado}</td>
        <td>${gastos.descripcion}</td>
        <td>${gastos.monto}</td>
        <td class="d-flex align-items-center justify-content-between">
            <i class="fas fa-edit text-warning" data-toggle="modal" data-target="#exampleModal"></i>
            <i class="fas fa-trash-alt text-danger" id="${gastos.id}" ></i>
        </td>
        </tr>
        `
      })
    })

  axios.get('http://localhost:3000/users')
    .then(response => {
      const users = response.data;
      const tr = document.getElementById('roommates')

      users.forEach(user => {
        tr.innerHTML += `     
            <tr>                  
            <td>${user.nombre} </td>
            <td class="text-danger">100000</td>
            <td class="text-success">100000</td>
            </tr>
            `
      });

      users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.nombre;
        userSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al obtener la lista de usuarios', error);
    });
});

// function insertarDataModal() {

//   const 
//   axios.get('http://localhost:3000/gastos')

//   let modalBody = document.querySelector('.modal-body')
//   modalBody.innerHTML = `
//       <h5>${data1}</h5>
//       <img src=${data2} class="img-fluid"> </img>
//       <p class="p-3">${data3}</p>
//       `
// }