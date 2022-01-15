<template>
  <form
    @submit.prevent="handleSubmit"
    method="post"
    enctype="multipart/form-data"
  >
    <input type="email" required placeholder="Email" v-model="email" />
    <input
      type="text"
      required
      placeholder="Nom d'utilisateur"
      v-model="username"
    />
    <input type="text" required placeholder="Biographie" v-model="biography" />
    <label for="image">Profile Image</label>

    <input
      type="file"
      placeholder="ta photo de profil"
      ref="file"
      @change="handleChange"
    />
    <input
      type="password"
      required
      placeholder="Mot de passe"
      v-model="password"
    />
    <button type="submit">Sign up</button>
  </form>
</template>

<script>
import axios from "axios";

import { useRouter } from "vue-router";

export default {
  name: "Signup",
  // data() {
  //   return {
  //     file: "",
  //     email: "",
  //     username: "",
  //     biography: "",
  //     password: "",
  //   };
  // },
  methods: {
    handleChange() {
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(this.file);
    },

    handleSubmit() {
      console.log(
        this.email,
        this.username,
        this.password,
        this.biography,
        this.file
      );
      const myformData = new FormData();
      myformData.append("email", this.email);
      myformData.append("username", this.username);
      myformData.append("password", this.password);
      myformData.append("biography", this.biography);
      myformData.append("image", this.file);

      console.log(myformData.get("image"));

      const router = useRouter();
      axios
        .post("http://localhost:8082/api/auth/signup", myformData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(function (response) {
          console.log(response);
          router.push("/");
        })
        .catch((error) => console.error(error.response));
    },
  },
};
</script>