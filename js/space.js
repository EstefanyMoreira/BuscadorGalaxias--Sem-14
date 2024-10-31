async function buscarImagenes(query) {
    const url = `https://images-api.nasa.gov/search?q=${query}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      mostrarResultados(data.collection.items);
    } catch (error) {
      console.error('Error al realizar la solicitud', error);
    }
  }
  
  function mostrarResultados(items) {
    const resultadosDiv = document.getElementById('contenedor');
    resultadosDiv.innerHTML = ''; 
  
    items.forEach(item => {
      const imagen = item.links ? item.links[0].href : '';
      const titulo = item.data[0].title;
      const descripcion = item.data[0].description;
      const fecha = item.data[0].date_created;
  
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('resultado-item');
  
      itemDiv.innerHTML = `
      
    <div class="card mx-auto col-4 my-2 p-0 background" style="width: 23rem;">
    <div class="imagen"> 
      <img src="${imagen}" class="card-img-top" alt="${titulo}"></div>
      <div class="card-body">
        <h5 class="card-title text-light">${titulo}</h5>
        <p class="card-text"  overflow-auto text-light" style="height: 7rem;">${descripcion}</p>
      </div>
      <div class="card-footer">
        <small class="card-text p-2 text-muted">${new Date(fecha).toLocaleDateString()}</small>
      </div>
    </div>
      `;
  
      resultadosDiv.appendChild(itemDiv);
    });
  }
  
  document.getElementById('btnBuscar').addEventListener('click', () => {
    const query = document.getElementById('inputBuscar').value;
    buscarImagenes(query);
  });
