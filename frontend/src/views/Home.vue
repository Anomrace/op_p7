<template>
  <Nav />
  <div class="container">
    <h2>Exprimer-vous!</h2>
    <PostForm />
  </div>
  <br />
  <div class="container">
    <h2>Tous les posts</h2>
    <Posts />
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
import Posts from "../components/Posts.vue";
import PostForm from "../components/PostForm.vue";
export default {
  name: "Home",
  components: {
    Nav,
    Posts,
    PostForm,
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>