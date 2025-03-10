<template>
  <div class="search-bar">
    <input
        type="text"
        v-model="query"
        placeholder="Buscar por título"
        @input="handleInput"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      query: '',
    };
  },
  methods: {
    handleInput() {
      // Se filtra el array basándose en la propiedad 'title'
      const filtered = this.data.filter(item =>
          item.title.toLowerCase().includes(this.query.toLowerCase())
      );
      // Se emite el array filtrado para que el componente padre lo reciba
      this.$emit('filtered-data', filtered);
    },
  },
};
</script>

<style scoped>
.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
