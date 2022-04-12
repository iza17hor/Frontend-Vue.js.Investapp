<template>
  <div class="flex p-2">
    <router-view></router-view>
    <form @submit.prevent="submitForm1">
      <section class="flex flex-row w-full h-screen bg-light border mb-11 p-4"> 
        <p>
          <textarea class="form-control col-7 mx-8  my-4" style="height:40px "  placeholder="Titel" v-model="art.tytul"></textarea>
          <textarea class="form-control col-7 mx-8 my-4" style="height:100px"  placeholder="Details" v-model="art.streszczenie"></textarea>
          <textarea  class=" form-control col-7 mx-8 my 4" style="height:170px"  placeholder="Text" v-model="art.tresc"></textarea>
          <select class="form-control col-3 mx-8 my 4" v-model="selected" multiple>
            <option v-for="tag in tags" :value="tag.id" :key="tag.id">{{tag.nazwa}}</option>
          </select>
          <button class ="btn btn-success" style ="width: 15rem"> Confirm </button>
        </p>        
        <div class="col-3 mx-8 my 4">
          <router-link :to="`/slowa`">
            <button class ="btn btn-link" >Manage your keywords</button>
          </router-link>
        </div>
      </section>
    </form>
  </div>
</template>
<script>
//import axios from 'axios';
import http from '@/http';
export default {
  data(){
    return {
      tag:{
        'nazwa': '',
      },
       art:{
        'tytul': '',
        'streszczenie': '',
        'tresc': '',
        'tags':'', 
      },
      selected: [],
      tags: [],
      artykul: [],
    }
  },
  async created(){
     try {
        const response = await http().get ('http://127.0.0.1:8000/blog/tags/');
        this.tags = response.data;
        this.art.tags= this.tag.id;
      }
        catch (err) {
          console.log(err);
        }
      try {
        const response = await http().get ('http://127.0.0.1:8000/blog/artykul/');
        this.artykul = response.data; 
        this.art.tags= this.tag.id;
      }
        catch (err) {
          console.log(err);
        }  
  },  
  methods: {
    submitForm1(){
       if (this.art.id == undefined){
         this.createArtykul();
         }
         else {
           this.editArtykul();
         }
    },
    async getTag(){
      const response = await http().get ('http://127.0.0.1:8000/blog/tags/');
      this.tags = response.data;
    },
    async getArtykul(){
      const response = await http().get ('http://127.0.0.1:8000/blog/artykul/');
      this.artykul = response.data;
    },
    async createTag(){
      this.art.tags=this.selected;
      const response = await http().post(`http://localhost:8000/blog/tags/`, {nazwa: this.tag.nazwa});
      this.tags = [...this.tags, response.data];
    },
    async createArtykul(){
      const response = await http().post(`http://localhost:8000/blog/artykul/`, {tytul: this.art.tytul, streszczenie: this.art.streszczenie, tresc: this.art.tresc, tags: this.art.tags=this.selected});
      this.artykul = [...this.artykul, response.data];
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
