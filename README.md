rpgnode
=======

<ol>
  <li>El servidor envía todo el WORLD incluyendo los BEING y después también manda la instruccion newBeing, entonces esta enviando 2 veces a los BEINGS. Esto hace que el BEING creado en el createdObjects se reemplace por el nuevo BEING con la referencia del nuevo id. Una vez arreglado esto, sacar el parche en el World.js del cliente (linea 80)</li>
  <li>Preload de recursos, para que sepas que esta haciendo algo, y no de error si moves antes, etc.</li>
  <li>Sprite fantasma, que no pueda pegar, etc.</li>
  <li>Sprite direcciones con animacion.</li>
  <li>No permitir apretar otra tecla cuando esta animando hacia el otro casillero.</li>
</ol>
