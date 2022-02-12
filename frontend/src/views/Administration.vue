<template>
  <Nav />
  <section class="content">
    <h1 v-for="user in users" :key="user.id">
      {{ user.username }}
    </h1>
  </section>
</template>

<script>
import axios from "axios";
import Nav from "../components/Nav.vue";
export default {
  name: "Administration",
  components: {
    Nav,
  },

  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/auth/findAllUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.users = response.data;
        console.log(this.users);
      })
      .catch((error) => console.error(error.response));
  },
  data() {
    return {
      users: [],
    };
  },
};
</script>

<style scoped>
</style>