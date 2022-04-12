<template>
  <div class="container">
    <h2>HTML Table</h2>

    <table>
      <tr>
        <th>ID</th>
        <th>Profile</th>
        <th>Name</th>
        <th>Email</th>
      </tr>
      <tr v-for="user in getUsers" :key="user.id">
        <td>{{ user.id }}</td>
        <td><img src="@/assets/dog.jpg" alt="#" /></td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions("userData", ["fetchUsers"]),
  },
  mounted() {
    this.fetchUsers();
  },
  computed: {
    ...mapGetters("userData", ["getUsers"]),
  },
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.container {
  max-width: 1170px;
  margin: 0 auto;
}
</style>
