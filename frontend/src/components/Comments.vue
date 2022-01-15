
<template>
  <div class="content" v-for="comment in comments" :key="comment.id">
    <h1>{{ comment.title }}</h1>
    <p>{{ comment.content }} {{ comment.User.username }}</p>
  </div>
  <CommentsForm :postID="postID" />
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
    return {};
  },
  props: ["comments", "postID"],
  mounted() {
    // const token = localStorage.getItem("token");
    // axios
    //   .get("http://localhost:8082/api/comments", {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     this.comments = response.data;
    //   })
    //   .catch((error) => console.error(error.response.data));
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 0.5em;
  border-radius: 5px;
}
</style>