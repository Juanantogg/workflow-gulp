const aqui = document.querySelector('.aqui'),
  color = 'blue',
  numero = 2,
  cadena = `Esto es una cadena de color ${color}`;

const escribir = () => {
  aqui.innerHTML = cadena + numero;
};

escribir();
