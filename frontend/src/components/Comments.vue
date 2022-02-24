
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
      <Form @submit="handleSubmit(comment.id)" method="post">
        <Field name="content" type="text" v-model="content" />
        <ErrorMessage name="content" />
      </Form>
    </div>

    <div
      v-if="comment.User.username === localUsername || userStatus === '1'"
      class="btn-editer-supprimer-commentaire"
      v-show="!isCommentEditFormVisible[comment.id]"
    >
      <button @click="showCommentEditForm(comment.id, true)">Modifier</button>
      <button @click="deleteComment(comment.id)">Supprimer</button>
    </div>
  </article>
</template>

<script>
import axios from "axios";
import CommentsForm from "./CommentsForm.vue";

import { Form, Field, defineRule, ErrorMessage } from "vee-validate";
import { required } from "@vee-validate/rules";

defineRule("required", required);

export default {
  name: "Comments",
  components: {
    CommentsForm,
    Field,
    Form,
    ErrorMessage,
  },
  props: ["comments", "postID"],
  data() {
    return {
      content: "",
      isCommentEditFormVisible: {},
      isCommentEditButtonFormVisible: true,
      isCommentVisible: false,
      userStatus: localStorage.getItem("userStatus"),
      localUsername: localStorage.getItem("username"),
    };
  },

  methods: {
    handleSubmit(id) {
      const token = localStorage.getItem("token");
      const form = {
        content: this.content,
        commentID: id,
      };

      axios
        .put("http://localhost:3000/api/comments/" + id, form, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
    reloadPage() {
      window.location.reload();
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

.active {
  display: inline;
  border: red solid 1px;
}

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