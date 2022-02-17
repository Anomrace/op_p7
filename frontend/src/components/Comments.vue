
<template>
  <p class="btn-commentaire" @click="showComment()">
    {{ comments.length }} Commentaires
  </p>

  <CommentsForm v-show="isCommentVisible" :postID="postID" />

  <article
    v-show="isCommentVisible"
    v-for="comment in comments"
    :key="comment.id"
    class="commentaire"
  >
    <img @click="showCommentEditForm()" :src="comment.User.image" alt="" />
    <div
      v-show="!isCommentEditFormVisible[comment.id]"
      class="text-commentaire"
    >
      <h2>{{ comment.User.username }}</h2>
      <p>
        {{ comment.content }}
      </p>
    </div>

    <div v-show="isCommentEditFormVisible[comment.id]">
      <form @submit.prevent="handleSubmit(comment.id)" method="post">
        <input type="text" required v-model="form.content" />
      </form>
    </div>

    <div
      v-if="comment.User.username === localUsername || userStatus === '1'"
      class="btn-editer-supprimer-commentaire"
    >
      <button @click="showCommentEditForm(comment.id, true)">Modifier</button>
      <button @click="deleteComment(comment.id)">Supprimer</button>
    </div>
  </article>
</template>

<script>
import axios from "axios";
import CommentsForm from "./CommentsForm.vue";
import { reactive } from "vue";

export default {
  name: "Comments",
  components: {
    CommentsForm,
  },
  props: ["comments", "postID"],
  data() {
    return {
      isCommentEditFormVisible: {},
      isCommentVisible: false,
      userStatus: localStorage.getItem("userStatus"),
      localUsername: localStorage.getItem("username"),
    };
  },
  setup() {
    let form = reactive({
      content: "",
    });

    let handleSubmit = async (id) => {
      form.commentID = id;
      const token = localStorage.getItem("token");
      await axios
        .put("http://localhost:3000/api/comments/" + id, form, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(function (response) {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => console.error(error.response.data));
    };

    return {
      form,
      handleSubmit,
    };
  },

  methods: {
    // handleSubmit(id) {
    //   const content = this.content;

    //   const token = localStorage.getItem("token");
    //   console.log(this.content);
    //   axios
    //     .put("http://localhost:3000/api/comments/" + id, content, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     .then(function (response) {
    //       console.log(response);
    //       // window.location.reload();
    //     })
    //     .catch((error) => console.error(error.response));
    // },
    deleteComment(id) {
      const token = localStorage.getItem("token");
      //console.log(id);
      axios
        .delete("http://localhost:3000/api/comments/" + id, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((error) => console.log(error));
    },
    showComment() {
      this.isCommentVisible = !this.isCommentVisible;
    },
    showCommentEditForm(id, status) {
      if (status) {
        this.isCommentEditFormVisible[id] = true;
      } else {
        this.isCommentEditFormVisible[id] = false;
      }
    },
  },
};
</script>

<style scoped>
.btn-commentaire {
  padding: 0.5em;
  text-align: right;
  text-decoration: underline;
  cursor: pointer;
}
article {
  padding: 1em;
}
/* .display-none {
  display: none;
} */
.active {
  display: inline;
  border: red solid 1px;
}
/* .btn-editer-supprimer-commentaire {
  display: none;
} */
.commentaire {
  display: flex;
  gap: 1em;
  margin-bottom: 1em;
}
.commentaire img {
  width: 2em;
  height: 2em;
  border-radius: 20px;
}
.text-commentaire {
  background: var(--grey);
  border-radius: 10px;
  padding: 0.5em;
}

.text-commentaire h2 {
  font-size: 1em;
}

.text-commentaire h2::first-letter {
  text-transform: uppercase;
}
</style>