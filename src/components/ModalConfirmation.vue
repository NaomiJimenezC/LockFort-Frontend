<!-- components/ModalConfirmacion.vue -->
<template>
  <div v-if="visible" class="confirmation-modal">
    <div class="modal-content">
      <h3>{{ titulo }}</h3>
      <p>{{ mensaje }}</p>
      <div class="modal-actions">
        <button @click="confirmar" class="confirm-action">{{ textoConfirmacion }}</button>
        <button @click="cancelar" class="cancel-action">{{ textoCancelacion }}</button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @vue-component
 * @name ModalConfirmacion
 * @description This component provides a confirmation modal that can be displayed to the user to confirm an action. It includes a title, a message, and two buttons: one to confirm and one to cancel. It emits 'confirmado' when the confirm button is clicked and 'cancelado' when the cancel button is clicked.
 */
export default {
  props: {
    visible: Boolean,
    titulo: {
      type: String,
      default: '¿Estás seguro?'
    },
    mensaje: {
      type: String,
      default: 'Esta acción no se puede deshacer'
    },
    textoConfirmacion: {
      type: String,
      default: 'Confirmar'
    },
    textoCancelacion: {
      type: String,
      default: 'Cancelar'
    }
  },
  methods: {
    confirmar() {
      this.$emit('confirmado');
    },
    cancelar() {
      this.$emit('cancelado');
    }
  }
}
</script>

<style scoped>
.confirmation-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;
}

.modal-actions {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.confirm-action {
  background: #e74c3c;
  color: white;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-action {
  background: #bdc3c7;
  color: #2c3e50;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>