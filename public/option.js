document.addEventListener('DOMContentLoaded', () => {
    const userSelect = document.getElementById('seleccion');
  
    axios.get('http://localhost:3000/users')
      .then(response => {
        const users = response.data;
  
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