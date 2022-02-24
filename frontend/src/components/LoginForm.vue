<template>
  <Form @submit="handleSubmit" enctype="multipart/form-data">
    <Field
      name="username"
      type="text"
      placeholder="Nom d'utilisateur"
      v-model="username"
      rules="required"
    />
    <ErrorMessage name="username" />
    <Field
      name="password"
      type="password"
      placeholder="Mot de passe"
      v-model="password"
      rules="required"
    />
    <ErrorMessage name="password" />
    <button type="submit">Se connecter</button>
  </Form>
</template>

<script>
import axios from "axios";
// import { useRouter } from "vue-router";
import { Form, Field, defineRule, ErrorMessage } from "vee-validate";
import { required } from "@vee-validate/rules";

defineRule("required", required);

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleSubmit() {
      const form = {
        username: this.username,
        password: this.password,
      };

      axios
        .post("http://localhost:3000/api/auth/signin", form)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.userName);
          localStorage.setItem("userStatus", response.data.userStatus);
          localStorage.setItem("userImage", response.data.userImage);
          console.log(response.data);

          this.$router.push("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
</style>