<template>
  <Nav />
  <main class="content">
    <article><h1>Liste d'utilisateurs</h1></article>
    <br />

    <article v-for="user in users" :key="user.id">
      <h2>{{ user.username }}</h2>
      <br />
      <form @submit.prevent="handleDelete(user.id, user.image)" method="post">
        <button type="submit">Supprimer ce compte</button>
        <p>Attention, cette action supprimera toutes vos données</p>
      </form>
    </article>
  </main>
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
  methods: {
    // changement de l'image
    handleChange() {
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(this.file);
    },
    // modification du profil
    handleSubmit(id) {
      const myformData = new FormData();

      console.log(this.username, this.email, id);

      myformData.append("username", this.username);
      myformData.append("email", this.email);
      myformData.append("biography", this.biography);
      myformData.append("password", this.password);
      myformData.append("image", this.file);

      // console.log(myformData.get("image"));

      for (var pair of myformData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      const token = localStorage.getItem("token");

      axios
        .put("http://localhost:3000/api/auth/updateUser/" + id, myformData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response.data);

          window.location.reload();
        })
        .catch((error) => console.error(error.response));
    },
    handleDelete(id, image) {
      const token = localStorage.getItem("token");
      //console.log(id);
      axios
        .delete("http://localhost:3000/api/auth/deleteOneUser/" + id, {
          headers: { Authorization: `Bearer ${token}` },
          image,
        })
        .then((res) => {
          console.log(res);

          window.location.reload();
        })
        .catch((error) => console.log(error));
    },
  },
  data() {
    return {
      users: [],
      username: "",
      email: "",
      biography: "",
      password: "",
      file: "",
    };
  },
};
</script>

<style scoped>
main {
  padding: 1em;
  background: var(--grey);
  min-height: 100vh;
}

article {
  margin-bottom: 1em;
  padding: 1em;
  max-width: 40em;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
  background: white;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%);
}
</style>