RPG Node.js
=======
Juego/Experimento MMORPG hecho con Node.js y Socket.io


<ol>
  <li>El servidor envía todo el WORLD incluyendo los BEING y después también manda la instruccion newBeing, entonces esta enviando 2 veces a los BEINGS. Esto hace que el BEING creado en el createdObjects se reemplace por el nuevo BEING con la referencia del nuevo id. Una vez arreglado esto, sacar el parche en el World.js del cliente (linea 80)</li>
  <li>Bug position undefined</li>
  <li>Sprite: Fantasma (animacion), que no pueda pegar, etc.</li>
  <li>Invetario: Interfaz, Seleccion de objetos</li>
  <li>Invetario: Equipar, desequipar, usar, tirar</li>
  <li>Sprites: Pj con ropa, con escudo, etc.</li>
  <li>Mapa: Agrandar el mapa, agregar rango de vision del Pj, que no le llegue info de los tiles lejanos. Hacer niebla donde  no llegue info.</li>
  <li>Conectarse: Que te conectes en un espacio vacio</li>
  <li>Magia: Poder tirar hechizos</li>
  <li>Simular/Predecir movimientos en el Cliente ( que no espere la respuesta del servidor para moverse ).</li>
</ol>
