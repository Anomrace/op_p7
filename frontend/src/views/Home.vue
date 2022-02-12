<template>
  <Nav />
  <main>
    <article class="main-content">
      <section class="neuf">
        <PostForm />
      </section>
      <section>
        <Posts />
      </section>
    </article>
  </main>
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
  data() {
    return {
      userName: localStorage.getItem("username"),
    };
  },
};
</script>

<style scoped>
main {
  background-color: var(--grey);
}
/* section {
  border: 1px solid red;
} */

.section-header {
  background: white;
}

h2 {
  text-align: center;
}

.neuf {
  margin-bottom: 2em;
}
</style>