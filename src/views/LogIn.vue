<template>
 <div class="m-auto ">
   <router-view></router-view>
   <form @submit.prevent="submit">
     <section class="flex flex-row w-full h-screen bg-light border mb-11 p-4"> 
      <div class="col-3 mx-8 my 4">
        <input type="text" class=" form-control col-7 mx-8  my-4" style="height:40px " placeholder="Login" v-model= "email">
        <input  type="password" class=" form-control col-7 mx-8 my-4" style="height:40px" placeholder="Password" v-model= "password">
        <button  type ='submit'> Log in</button>
      </div>
      </section>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import router from '@/router';
export default {
  data(){
    return {
      email: '',
      password: ''  
    };
  },
 methods: {
  ...mapActions({
     login: 'login'
   }),
   async submit() {
     const { email, password } = this;
     if(await this.login({ email, password })){
       console.log('zalogowano');
       router.push({ name: 'Home'})
     }else {
       console.log('nie zalogowano');
     }
   }
 }
}   
</script>
<style>
</style>
