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
/**
 * @vue-component
 * @name SearchBar
 * @description This component provides a search bar that allows users to filter a list of data based on the title of each item. It emits a 'filtered-data' event with the array of filtered items whenever the input changes.
 */
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
