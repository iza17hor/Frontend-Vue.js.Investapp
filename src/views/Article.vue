<template>
 <div >
 <router-view></router-view>
    <div class ="d-flex flex-wrap  p-4"> 
      <tr v-for="art in artykul" :key="art.id" @dblclick="$data.art =art">
        <th v-if="art.id ==$route.params.id">
          <div class="card p-2 " style="width: 60rem;">   
            <div class="card-body p-4 ">
              <h1 class="card-title">{{art.tytul}}</h1>
              <h4>{{art.streszczenie}}</h4>
              <h6>{{art.tresc}}</h6>
              <router-link :to="`/home`">
                <button class ="btn btn-success p-2" >Back</button>
                <router-link :to="`/edytuj/${art.id}`">
                  <button class ="btn btn-outline-info p-2" >Edit the article</button>
                </router-link>
              </router-link>                     
            </div>
          </div> 
        </th>  
      </tr>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import http from '@/http';
export default {
  name: 'Opublikuj',
  data(){
    return {
      tag:{
        'nazwa': '', 
      },
      art:{
        'tytul': '',
        'streszczenie': '',
        'tresc': ',' 
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
    try {
      const response = await axios.get ('http://127.0.0.1:8000/blog/artykul/');
      this.artykul = response.data;
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
    async getArtykul(){
      const response = await http().get ('http://127.0.0.1:8000/blog/artykul/');
      this.artykul = response.data;
    },
    async getArtykul1(){
      const response = await axios.get ('http://127.0.0.1:8000/blog/artykul/');
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
