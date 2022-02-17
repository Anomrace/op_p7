<template>
  <article class="post" v-for="post in posts" :key="post.id">
    <section class="padding-1em">
      <section class="post-header">
        <img :src="post.User.image" alt="user image" />
        <h1>{{ post.User.username }}</h1>
      </section>
      <section class="post-texte">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
      </section>
    </section>

    <section>
      <img v-if="post.image !== null" :src="post.image" alt="img" />
    </section>

    <section
      v-if="post.User.username === localUsername || userStatus === '1'"
      class="post-edit-delete"
    >
      <button type="button" class="btn" :post="post" @click="showModal()">
        Editer le post
      </button>

      <button class="delete" @click="deletePost(post.id, post.image)">
        Supprimer le post
      </button>
    </section>
    <div class="Comments">
      <Comments :comments="post.Comments" :postID="post.id" />
    </div>

    <PostEdit :post="post" v-show="isModalVisible" @close="closeModal" />
  </article>
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
        .delete("http://localhost:3000/api/posts/" + id, {
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
      commentID: 0,
      userStatus: localStorage.getItem("userStatus"),
      localUsername: localStorage.getItem("username"),
    };
  },
  beforeMount() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // console.log(response.data[0].id);
        this.posts = response.data;

        // console.log(this.posts[0].id);
      })
      .catch((error) => console.error(error.response.data));
  },
  // mounted() {
  //   const token = localStorage.getItem("token");
  //   axios
  //     .get("http://localhost:3000/api/posts", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       this.posts = response.data;
  //       console.log(this.posts);
  //     })
  //     .catch((error) => console.error(error.response.data));
  // },
};
</script>

<style scoped>
.post-edit-delete {
  display: flex;
  gap: 0.5em;
  padding: 1em;
}

article {
  background: white;
  margin-bottom: 1em;
  padding-bottom: 0.1em;
}
.post {
  border-radius: 10px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
}

.post-header {
  display: flex;
  align-items: center;
  gap: 1em;
}
.post-header h1 {
  font-size: 1.1em;
}
.post-header img {
  width: 2em;
  height: 2em;
  border-radius: 20px;
}

h1::first-letter {
  text-transform: uppercase;
}

.padding-1em {
  padding: 1em;
}
</style>