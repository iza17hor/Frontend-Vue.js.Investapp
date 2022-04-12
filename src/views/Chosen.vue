<template>
  <div>    
    <router-view></router-view>
    <form @submit.prevent="submitForm">
      <div class = "form-group row p-5 " >
        <router-link :to="`/home`">
          <button class ="btn btn-warning p-2"  style ="width: 20rem" >Back</button>
        </router-link>         
      </div>
    </form>
    <tbody>
     <div class ="flex  p-5"> 
        <tr v-for="tag in tags" :key="tag.nazwa" @dblclick="$data.tag =tag">
          <th v-if="tag.nazwa ==$route.params.nazwa">
            <h1> Lista Tagów: {{ tag.nazwa}} </h1>
            <tr v-for="art in artykul" :key="art.tags" @dblclick="$data.art =art" >
                <th v-if="art.tags == tag.id">
                  <h3>{{art.tytul}}</h3>
                  <router-link :to="`/wyswietl/${art.id}`" >
                    <button class ="btn btn-secondary p-2" >Show the article</button>
                  </router-link></th></tr>
          </th>  
        </tr>   
      </div>
    </tbody>
    </div>
</template>
<script>
//import axios from 'axios';
import http from '@/http';
export default {
  name: 'Compo3',
  data(){
    return {
      tag:{
        'nazwa': '',
        'check': '',
      },
       art:{
        'tytul': '',
        'streszczenie': '',
      },
      tags: [],
      artykul: [],
    }
  },
  async created(){
    try {
      const response = await http().get ('http://127.0.0.1:8000/blog/artykul/');
      this.artykul = response.data;
    }
      catch (err) {
        console.log(err);
      }
    try {
      const response = await http().get ('http://127.0.0.1:8000/blog/tags/');
      this.tags = response.data;
    }
      catch (err) {
        console.log(err);
      }
    this.tag.nazwa=this.$route.params.nazwa;
    this.art.tags=this.tag.id;
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
  async getArtykul(){
      const response = await http().get ('http://127.0.0.1:8000/blog/artykul/');
      this.artykul = response.data;
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
