
<template>
  <article>
    <p @click="showComment()">{{ comments.length }} Commentaires</p>
    <CommentsForm v-show="isCommentVisible" :postID="postID" />
    <section
      v-show="isCommentVisible"
      v-for="comment in comments"
      :key="comment.id"
    >
      <h1>{{ comment.title }}</h1>
      <p>{{ comment.content }} {{ comment.User.username }}</p>
    </section>
  </article>
</template>

<script>
//import axios from "axios";
import CommentsForm from "./CommentsForm.vue";
export default {
  name: "Comments",
  components: {
    CommentsForm,
  },
  data() {
    return {
      isCommentVisible: false,
    };
  },
  props: ["comments", "postID"],
  mounted() {
    // const token = localStorage.getItem("token");
    // axios
    //   .get("http://localhost:3000/api/comments", {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     this.comments = response.data;
    //   })
    //   .catch((error) => console.error(error.response.data));
  },
  methods: {
    showComment() {
      this.isCommentVisible = !this.isCommentVisible;
    },
  },
};
</script>

<style scoped>
p {
  padding: 0.5em;
  text-align: right;
  text-decoration: underline;
  cursor: pointer;
}
</style>