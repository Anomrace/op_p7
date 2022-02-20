<template>
  <Nav />
  <main>
    <article>
      <h1>Profil</h1>
      <form
        @submit.prevent="handleSubmit(user.id)"
        method="post"
        enctype="multipart/form-data"
      >
        <h2>Nom d'utilisateur</h2>

        <input type="text" v-model="username" />

        <h2>Email</h2>
        <input type="text" v-model="email" />

        <h2>Biographie</h2>
        <input type="text" v-model="biography" />

        <h2>Mot de passe</h2>
        <input type="text" v-model="password" />
        <h2>Image de profil</h2>
        <img :src="user.image" alt="img" />

        <input
          type="file"
          placeholder="ta photo de profil"
          ref="file"
          @change="handleChange"
        />

        <button type="submit">Modifier</button>
      </form>
      <br />

      <form @submit.prevent="handleDelete(user.id)" method="post">
        <button type="submit">Supprimer votre compte</button>
      </form>
      <p>Attention, cette action supprimera toutes vos données</p>
    </article>
  </main>
</template>

<script>
import axios from "axios";
import Nav from "../components/Nav.vue";
// import { useRouter } from "vue-router";
export default {
  name: "Profile",
  components: {
    Nav,
  },
  data() {
    return {
      user: [],
      username: "",
      email: "",
      biography: "",
      password: "",
      file: "",
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/auth/findUser", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.user = response.data;
        this.username = this.user.username;
        this.email = this.user.email;
        this.biography = this.user.biography;

        // this.password = this.user.password;
      })
      .catch((error) => console.error(error.response.data));
  },
  methods: {
    handleChange() {
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(this.file);
    },
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
          localStorage.setItem("userImage", response.data.userImage);

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
          this.$router.push("/");

          localStorage.clear();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
main {
  background: var(--grey);
  padding: 1em;
}
article {
  padding: 1em;
  max-width: 40em;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
  background: white;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%);
}
article img {
  max-width: 10em;
}
</style>