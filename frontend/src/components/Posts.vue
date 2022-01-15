<template>
  <div class="content" v-for="post in posts" :key="post.id">
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
    <img :src="post.image" alt="img" />

    <p>publié par {{ post.User.username }}</p>

    <section class="post-edit-delete">
      <button type="button" class="btn" :post="post" @click="showModal()">
        Editer votre post!
      </button>

      <button class="delete" @click="deletePost(post.id, post.image)">
        Supprimer votre post
      </button>
    </section>
    <div class="Comments">
      <Comments :comments="post.Comments" :postID="post.id" />
    </div>

    <PostEdit :post="post" v-show="isModalVisible" @close="closeModal" />
  </div>
</template>

<script>
import axios from "axios";
import PostEdit from "./PostEdit.vue";
import Comments from "./Comments.vue";
export default {
  name: "Posts",
  components: {
    Comments,
    PostEdit,
  },
  methods: {
    deletePost(id, image) {
      const token = localStorage.getItem("token");
      //console.log(id);
      axios
        .delete("http://localhost:8082/api/posts/" + id, {
          headers: { Authorization: `Bearer ${token}` },
          image,
        })
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((error) => console.log(error));
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
  data() {
    return {
      posts: [],
      isModalVisible: false,
      postId: 0,
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8082/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        this.posts = response.data;
      })
      .catch((error) => console.error(error.response.data));
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 1em;
  border-radius: 5px;
}
</style>