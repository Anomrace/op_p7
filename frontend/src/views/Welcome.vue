<template>
    <div class="welcome container">

    <div v-if="showLogin">
        <h2>Se connecter</h2>
        <LoginForm />
        <p>Pas encore de compte ? <span @click="showLogin = false">S'inscrire</span></p>

    </div>
    <div v-else>
        <h2>S'inscrire</h2>
        <SignupForm />
        <p>Déjà inscrit? <span @click="showLogin = true">Se connecter</span></p>


    </div>
        
    </div>
    
</template>

<script>
import SignupForm from '../components/SignupForm.vue'
import LoginForm from '../components/LoginForm.vue'
import { ref } from '@vue/reactivity'

export default {
    components: { SignupForm, LoginForm },
    setup() {
        const showLogin = ref(true)

        return { showLogin }
    }
}
</script>

<style>
.welcome{
    text-align: center;
    padding: 20px 0;
}

.welcome form{
    width: 300px;
    margin: 20px auto;

}

.welcome label{
    display: block;
    margin: 20px 0 10px;
}

.welcome input {
    width: 100%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #eee;
    outline:none;
    color: #999;
    margin: 10px auto;
}

.welcome span{
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
}

.welcome button{
    margin: 20px auto;
}
</style>