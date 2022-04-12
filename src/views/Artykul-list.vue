<template>
  <div >
    <router-view></router-view>
      <div class ="d-flex flex-wrap col-3  p-5"> 
        <tr v-for="art in artykul" :key="art.id" @dblclick="$data.art =art">
          <div class="card p-2 " style="width: 60rem;">   
            <div class="card-body p-4 ">
              <h2 class="card-title">{{art.tytul}}</h2>
              <h6>{{art.streszczenie}}</h6>
              <router-link :to="`/wyswietl/${art.id}`" >
                <button class ="btn btn-outline-info p-2" >Show the article</button>
              </router-link>
              <button class ="btn btn-outline-info p-2" @click="deleteArtykul(art)">Delete the article</button>
              <section class="d-flex "> 
                <p class=" flex "></p> 
                  <tr  v-for="tag in tags" :key="tag.id" @dblclick="$data.tag =tag">
                    <router-link :to="`/dostep/${tag.nazwa}`">
                      <button class ="btn btn-link p-2" >{{tag.nazwa}}</button>
                    </router-link>
                  </tr> 
              </section> 
            </div>
          </div>   
        </tr>
      </div>
  </div>
</template>
<script>
import axios from 'axios';
import http from '@/http';
export default {
    name: 'Publish',
    data() {
    return {
      tag:{
        'nazwa': '',
      },
       art:{
        'tytul': '',
        'streszczenie': '',  
      },
      tags: [],
      artykul: [],
    }
  },
    async created() {
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
        async getTag(){
          const response = await http().get('http://localhost:8000/blog/tags/',)
          this.tags = response.data;
        },
        async getArtykul(){
          const response = await http().get ('http://127.0.0.1:8000/blog/artykul/');
          this.artykul = response.data;
        },
        async getArtykul1(){
          const response = await axios.get ('http://127.0.0.1:8000/blog/artykul/');
          this.artykul = response.data;
        },
        async deleteArtykul(){
          await http().delete(`http://localhost:8000/blog/artykul/${this.art.id}/`)
          this.artykul = this.artykul.filter(item => item.id !== this.art.id ); 
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
}</style>