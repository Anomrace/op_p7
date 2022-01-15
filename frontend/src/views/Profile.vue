<template>
  <Nav />
  <div class="container">
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

      <button type="submit" @click="reloadPage">Modifier</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Nav from "../components/Nav.vue";
export default {
  name: "Profile",
  components: {
    Nav,
  },
  data(user) {
    return {
      user: [],
      username: "",
      email: user.email,
      biography: user.biography,
      password: user.password,
      file: user.image,
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8082/api/auth/findUser", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        this.user = response.data;
        this.username = this.user.username;
        this.email = this.user.email;
        this.biography = this.user.biography;
        this.password = this.user.password;
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

      myformData.append("user", this.username);
      myformData.append("email", this.email);
      myformData.append("biography", this.biography);
      myformData.append("password", this.password);
      // myformData.append("image", this.file);

      // console.log(myformData.get("image"));

      for (var pair of myformData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      const token = localStorage.getItem("token");

      axios
        .put("http://localhost:8082/api/auth/updateUser/" + id, myformData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response);
          // this.close();
          // this.reloadPage();
        })
        .catch((error) => console.error(error.response));
    },
    // // reloadPage() {
    // //   window.location.reload();
    // // },
  },
};
</script>

<style scoped>
h2 {
  text-decoration: underline;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>