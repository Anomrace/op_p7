<template>
  <main>
    <img src="@/assets/images/icon-above-font.svg" alt="logo groupomania" />
    <section v-if="showLogin">
      <LoginForm />
      <br />
      <p>Pas encore de compte ?</p>
      <br />
      <button @click="showLogin = false">S'inscrire</button>
    </section>
    <section v-else>
      <h2>S'inscrire</h2>
      <SignupForm />
      <br />
      <p>Déjà inscrit?</p>
      <br />
      <button @click="showLogin = true">Se connecter</button>
    </section>
  </main>
</template>

<script>
import SignupForm from "../components/SignupForm.vue";
import LoginForm from "../components/LoginForm.vue";
import { ref } from "@vue/reactivity";
export default {
  components: { SignupForm, LoginForm },
  setup() {
    const showLogin = ref(true);
    return { showLogin };
  },
};
</script>

<style scoped>
img {
  width: 10em;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

h2 {
  text-align: center;
}

p {
  text-align: center;
}
button {
  cursor: pointer;
  width: 100%;
  border: none;
  padding: 0.5em;
  background-color: var(--blue);
  color: white;
  border-radius: 3px;
  box-shadow: -0.2px 0.3px 1px 1px rgba(0, 0, 0, 0.1);
}
</style>