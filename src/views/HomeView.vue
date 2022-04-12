<template>
  <div class="home">
    <TableComponent msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import TableComponent from "@/components/TableData.vue";

export default {
  name: "HomeView",
  components: {
    TableComponent,
  },
};
</script>
