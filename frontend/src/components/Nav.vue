<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/home">Tous les posts</router-link></li>
      <li><router-link to="/profile">Votre profil</router-link></li>
      <li><router-link to="/">Logout</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style>
</style>