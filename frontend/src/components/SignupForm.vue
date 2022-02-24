<template>
  <Form @submit="handleSubmit" enctype="multipart/form-data">
    <Field
      name="email"
      type="email"
      placeholder="Email"
      rules="required|email"
      v-model="email"
    />
    <ErrorMessage name="email" />
    <Field
      name="username"
      type="text"
      placeholder="Nom d'utilisateur"
      rules="required"
      v-model="username"
    />
    <ErrorMessage name="username" />
    <Field
      name="biography"
      type="text"
      placeholder="Biographie"
      rules="required"
      v-model="biography"
    />
    <ErrorMessage name="biography" />
    <Field name="userimage">
      <input
        type="file"
        ref="file"
        accept="image/*"
        rules="required|image"
        @change="handleChange"
      />
    </Field>
    <ErrorMessage name="userimage" />
    <Field
      name="password"
      type="password"
      rules="required|min:6"
      placeholder="Mot de passe"
      v-model="password"
    />
    <ErrorMessage name="password" />
    <button type="submit">Inscription</button>
  </Form>
</template>

<script>
import axios from "axios";
import { Form, Field, defineRule, ErrorMessage } from "vee-validate";
import { required, email, min, image } from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("image", image);

export default {
  name: "Signup",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      file: "",
      email: "",
      username: "",
      biography: "",
      password: "",
      errorEmail: "Votre email est invalide",
    };
  },
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

      for (var pair of myformData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      axios
        .post("http://localhost:3000/api/auth/signup", myformData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => console.error(error));
    },
  },
};
</script>