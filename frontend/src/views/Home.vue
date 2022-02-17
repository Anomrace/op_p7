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
  background: var(--grey);
}

.section-header {
  background: white;
}

h2 {
  text-align: center;
}

.neuf {
  margin-bottom: 1em;
  padding: 1em;
  max-width: 40em;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
  background: white;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%);
}
</style>