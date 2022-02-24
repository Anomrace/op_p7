<template>
  <Nav />
  <main>
    <article>
      <h1>Profil</h1>
      <Form
        @submit="handleSubmit(user.id)"
        method="post"
        enctype="multipart/form-data"
      >
        <h2>Nom d'utilisateur</h2>

        <Field name="username" type="text" v-model="username" rules="" />
        <ErrorMessage name="username" />
        <h2>Email</h2>
        <Field name="email" type="text" v-model="email" />
        <ErrorMessage name="email" />
        <h2>Biographie</h2>
        <Field name="biography" type="text" v-model="biography" />
        <ErrorMessage name="biography" />
        <h2>Mot de passe</h2>
        <Field name="password" type="text" v-model="password" />
        <ErrorMessage name="password" />
        <h2>Image de profil</h2>
        <img :src="user.image" alt="img" />

        <Field name="userimage"
          ><input
            placeholder="ta photo de profil"
            ref="file"
            accept="image/*"
            @change="handleChange"
            type="file"
        /></Field>
        <ErrorMessage name="userimage" />

        <button type="submit">Modifier</button>
      </Form>
      <br />

      <Form @submit="handleDelete(user.id)" method="post">
        <button type="submit">Supprimer votre compte</button>
      </Form>
      <p>Attention, cette action supprimera toutes vos données</p>
    </article>
  </main>
</template>

<script>
import axios from "axios";
import Nav from "../components/Nav.vue";
import { Form, Field, defineRule, ErrorMessage } from "vee-validate";
import { required, email, min, mimes } from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("mimes", mimes);

export default {
  name: "Profile",
  components: {
    Nav,
    Form,
    Field,
    ErrorMessage,
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
            "Content-Type": "multipart/Form-data",
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