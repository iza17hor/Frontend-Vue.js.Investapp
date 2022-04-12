<template>
  <div >
    <router-view></router-view>
    <form @submit.prevent="submitForm">
      <div class = "form-group row">
        <input type="text" class="form-control col-3 mx-2" placeholder="tag" v-model="tag.nazwa">
        <div class=" p-2">
          <button class="btn btn-success">Confirm</button>
          <button class ="btn btn-danger mx-2" @click="deleteTag(tag)">Delete</button>
          <router-link :to="`/dodaj`">
            <button class ="btn btn-warning mx-2">Go back to the previous page</button>
          </router-link>
        </div>
      </div>
    </form>
    <router-link :to="`/slowa`" @click="getTag(tag)">
      <p class="flex "></p> 
      <tr  v-for="tag in tags" :key="tag.id" @dblclick="$data.tag =tag">
        <h4 class=" flex p-2 ">{{tag.nazwa}}</h4>
      </tr> 
    </router-link>
  </div>
</template>
<script>
import http from '@/http';
export default {
  data(){
    return {
      tag:{
        'nazwa': '',  
      },
      tags: [],
    }
  },
  async created(){
    try {
      const response = await http().get ('http://127.0.0.1:8000/blog/tags/');
      this.tags = response.data;
    }
      catch (err) {
        console.log(err);
      }  
  },
  methods: {
    submitForm(){
       if (this.tag.id == undefined){
         this.createTag();
         }
         else {
           this.editTag();
         }
    },
    async getTag(){
      const response = await http().get ('http://127.0.0.1:8000/blog/tags/');
      this.tags = response.data;
    },
    async createTag(){
      const response = await http().post(`http://localhost:8000/blog/tags/`, {nazwa: this.tag.nazwa});
      this.tags = [...this.tags, response.data];
    },
    async editTag(){
      const response = await http().patch(`http://localhost:8000/blog/tags/${this.tag.id}/`,this.tag) 
      this.tags = this.tags.map(item=> item.id === this.tag.id ? response.data: item); 
    },
    async deleteTag(){
      await http().delete(`http://localhost:8000/blog/tags/${this.tag.id}/`)
      this.tags = this.tags.filter(item => item.id !== this.tag.id );
    },      
  } 
}
</script>
<style>
#app {
  text-align: center;
  background-color: rgb(194, 194, 194); 
}
#ap{
    text-align: center;
    color: #2c3e50;
    margin-top: 10px;
}
</style>
