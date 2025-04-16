// src/services/toastService.js
import mitt from 'mitt';

const emitter = mitt();

export default {
  // Função para disparar um toast
  show(message, type = 'success') {
    console.log('show toast', message, type);
    emitter.emit('toast', { message, type });
  },
  // Métodos para registrar e cancelar a inscrição em eventos
  on: emitter.on,
  off: emitter.off,
};
