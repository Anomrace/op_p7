<template>
    <form @submit.prevent="handleSubmit" method="post">
        <input type="text" required placeholder="Nom d'utilisateur" v-model="displayName">
        <input type="email" required placeholder="Email" v-model="email">
        <input type="password" required placeholder="Mot de passe" v-model="password">
        <button type="submit">Sign up</button>
    </form>

</template>

<script>
const axios = require('axios').default;
export default {
    setup(){
        const displayName = ''
        const email = ''
        const password = ''

        return { displayName, email, password}
    },
    methods :{
        handleSubmit(){
           let data = JSON.stringify({
        username : this.displayName,
        email : this.email,
        password : this.password
           })
            axios
    .post('http://localhost:8082/api/auth/signup', data, {
        headers:{'Content-Type': 'application/json'}
    })
    .then(function(response){
        console.log(response)
    })
    .catch(error => console.error(error.response.data));
       
        }
    }
    
}
</script>