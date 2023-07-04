document.addEventListener('DOMContentLoaded', () => {

  const abrirModal = (data1, data2, data3, data4) => {
    console.log(data1, data2, data3)
    const nombreModal = document.getElementById('roommatesSelectModal')
    nombreModal.innerHTML = `<option id="${data4}" value="${data1}">${data1}</option>`
    const descripcionModal = document.getElementById('descripcionModal')
    descripcionModal.innerHTML = `${data2}`
    const montoModal = document.getElementById('montoModal')
    montoModal.value = `${data3}`
    const idNombreModal = document.getElementById
  }

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
    <i class="fas fa-edit text-warning editar" data-toggle="modal" data-target="#exampleModal" data-nombre="${gastos.nombreAsociado}" data-descr="${gastos.descripcion}" data-monto="${gastos.monto}" data-id="${gastos.id}"></i>
    <i class="fas fa-trash-alt text-danger basurero" id="${gastos.id}"></i>
    </td>
    </tr>
    `
      })
      const elementos = document.querySelectorAll('.basurero');
      console.log(elementos)
      elementos.forEach(elemento => {
        console.log(elemento)
        elemento.addEventListener('click', (e) => {
          const id = e.target.id
          console.log(`botón tocado ${id}`);
          axios.delete(`http://localhost:3000/gastos/${id}`)
            .then(() => {
              console.log(`Se ha eliminado el registro con el ID ${id}`);
              location.reload();
            })
            .catch(error => {
              console.log('Ha ocurrido un error intentando borrar el registro', error);
            });
        });

        const botones = document.querySelectorAll('.editar')
        console.log(botones)
        botones.forEach(boton => {
          console.log(boton.getAttribute('data-id'))
          boton.addEventListener('click', (e) => {
            console.log(e.id)
            const nombre = e.target.getAttribute('data-nombre');
            const idNombre = e.target.getAttribute('data-id')
            const descripcion = e.target.getAttribute('data-descr')
            const monto = e.target.getAttribute('data-monto')
            console.log(nombre, descripcion, monto)
            abrirModal(nombre, descripcion, monto, idNombre)
          })

        })

        const botonActualizarInfo = document.getElementById('ActualizarData');
        botonActualizarInfo.addEventListener('click', async () => {
          try {
            const nombreModalinfo = document.getElementById('roommatesSelectModal')
            const option = nombreModalinfo.querySelector('option');
            const idOption = option.getAttribute('id');
            const nuevoNombre = nombreModalinfo.value;
            const nuevaDescr = descripcionModal.value;
            const nuevoMonto = montoModal.value;

            const respuesta = await axios.get(`http://localhost:3000/gastos/${idOption}`)


            const updateData = {
              "idGasto": respuesta.data.idGasto,
              "nombreAsociado": nuevoNombre,
              "monto": nuevoMonto,
              "descripcion": nuevaDescr,
              "userAsociate": respuesta.data.userAsociate,
              "id": respuesta.data.id
            }

            const response = await axios.put(`http://localhost:3000/gastos/${idOption}`, updateData);
            console.log(response.data);
            location.reload()
          } catch (error) {
            console.error(error);
          }
        });



      });
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
        const userSelect = document.getElementById('seleccion');
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