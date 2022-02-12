<template>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      required
      placeholder="Nom d'utilisateur"
      v-model="form.username"
    />
    <!-- <input type="email" required placeholder="Email" v-model="form.email" /> -->
    <input
      type="password"
      required
      placeholder="Mot de passe"
      v-model="form.password"
    />
    <button>Se connecter</button>
  </form>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { reactive } from "vue";
export default {
  name: "Login",
  setup() {
    const form = reactive({
      username: "",
      password: "",
    });

    const router = useRouter();

    const handleSubmit = async () => {
      await axios
        .post("http://localhost:3000/api/auth/signin", form, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.userName);
          localStorage.setItem("userStatus", response.data.userStatus);
          localStorage.setItem("userImage", response.data.userImage);
          console.log(response.data);

          router.push("/home");
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    return {
      form,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
/* form {
  padding: 1em;
} */
</style>