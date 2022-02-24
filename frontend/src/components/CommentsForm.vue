<template>
  <section class="comments-form">
    <Form @submit="handleSubmit(postID)" method="post">
      <Field name="content" type="text" v-model="content" rules="required" />
      <ErrorMessage name="content" />
    </Form>
  </section>
</template>

<script>
import axios from "axios";
import { Form, Field, defineRule, ErrorMessage } from "vee-validate";
import { required } from "@vee-validate/rules";
// import { reactive } from "vue";
defineRule("required", required);
export default {
  name: "CommentsForm",
  props: ["postID"],
  data() {
    return {
      content: "",
    };
  },
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  methods: {
    handleSubmit(id) {
      const form = {
        content: this.content,
        postID: id,
      };
      const token = localStorage.getItem("token");
      axios
        .post("http://localhost:3000/api/comments", form, {
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
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.comments-form {
  border-radius: 20px;
  padding: 1em;
}
</style>