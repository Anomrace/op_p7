<template>
  <div class="modal-background">
    <div class="modal">
      <header>
        <slot name="header"> Editer votre post </slot>
        <button type="button" class="btn-close" @click="$emit('closeModal')">
          x
        </button>
      </header>

      <section>
        <Form
          @submit="handleSubmit(post.id, post.image)"
          method="post"
          enctype="multipart/form-data"
        >
          <Field name="title" type="text" v-model="title" rules="required" />
          <ErrorMessage name="title" />
          <Field
            name="content"
            type="text"
            v-model="content"
            rules="required"
          />
          <ErrorMessage name="content" />
          <img v-if="post.image !== null" :src="post.image" alt="img" />
          <Field name="userimage" placeholder="ta photo de profil"
            ><input
              type="file"
              ref="file"
              accept="image/*"
              @change="handleChange"
              rules="image" /><ErrorMessage name="userimage"
          /></Field>

          <button type="submit">Publier</button>
        </Form>
      </section>

      <button type="button" @click="$emit('closeModal')">Close Modal</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Form, Field, defineRule, ErrorMessage } from "vee-validate";
import { required, email, min, mimes } from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("mimes", mimes);

export default {
  name: "PostEdit",
  props: ["post", "isModalVisible"],
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data(props) {
    return {
      modalIsNotVisible: false,
      title: props.post.title,
      content: props.post.content,
      image: props.post.image,
    };
  },

  methods: {
    handleChange() {
      let file = this.$refs.file.files[0];
      this.file = file;
      console.log(this.file);
    },
    handleSubmit(id) {
      const myformData = new FormData();

      myformData.append("title", this.title);
      myformData.append("content", this.content);
      myformData.append("image", this.file);

      console.log(myformData.get("image"));

      const token = localStorage.getItem("token");

      axios
        .put("http://localhost:3000/api/posts/" + id, myformData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/Form-data",
          },
        })
        .then((response) => {
          console.log(response);
          this.close();
          this.reloadPage();
        })
        .catch((error) => console.error(error.response));
    },
    close() {
      this.modalIsNotVisible = true;
    },
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>

<style>
.modal-background {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* width: 100%; */
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  position: fixed;
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  padding: 1em;
  background: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
}

.btn-close {
  width: 2em;
  height: 2em;
  border-radius: 30px;
}
</style>