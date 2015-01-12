rpgnode
=======

<ol>
  <li>El servidor envía todo el WORLD incluyendo los BEING y después también manda la instruccion newBeing, entonces esta enviando 2 veces a los BEINGS. Esto hace que el BEING creado en el createdObjects se reemplace por el nuevo BEING con la referencia del nuevo id. Una vez arreglado esto, sacar el parche en el World.js del cliente (linea 80)</li>
</ol>
