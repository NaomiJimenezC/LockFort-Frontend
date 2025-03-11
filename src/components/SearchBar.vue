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
      const filtered = this.data.filter(item =>
          item.title.toLowerCase().includes(this.query.toLowerCase())
      );
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
