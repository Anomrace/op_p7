<template>
    <form @submit.prevent="handleSubmit" >
        <input type="email" required placeholder="Email" v-model="email">
        <input type="password" required placeholder="Mot de passe" v-model="password">
        <button>S'inscrire</button>
    </form>

</template>

<script>


    export default {
    setup(){
        const email = ''
        const password = ''

        return { email, password}
    },
    methods :{
        handleSubmit(){


            console.log(this.email, this.password)
        }
    }
    
}
</script>