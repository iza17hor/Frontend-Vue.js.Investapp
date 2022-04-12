<template>
 <div class="flex p-2">
  <router-view></router-view>
    <form @submit.prevent="submitForm1">
      <section class="flex  mb-11 p-4"> 
        <tr v-for="art in artykul" :key="art.id" @dblclick="$data.art =art" >
          <th v-if="art.id ==$route.params.id">
            <textarea class="form-control col-7 mx-8  my-6" style=" width:150rem "  placeholder="Titel" v-model="art.tytul"></textarea>
            <textarea class="form-control col-7 mx-8 my-4" style="width:150rem"  placeholder="Details" v-model="art.streszczenie"></textarea>
            <textarea  class=" form-control col-7 mx-8 my 4" style="width:150rem"  placeholder="Tex" v-model="art.tresc"></textarea>
          </th>
        </tr>
        <button class ="btn btn-success" style ="width: 15rem"> Confirm </button>
      </section>
    </form>
  </div>
</template>
<script>
import http from '@/http';
export default {
  name: 'Publish',
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
        selected: null,
        tags: [],
        artykul: [],
    }
  },
  async created(){
    try {
      this.art.id=this.$route.params.id;
      const response = await http().get ('http://127.0.0.1:8000/blog/artykul/');
      this.artykul = response.data;
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
    async getArtykul(){
      const response = await http().get ('http://127.0.0.1:8000/blog/artykul/');
      this.artykul = response.data;
    },
    async createArtykul(){
      this.art.tags=[this.selected];
      const response = await http().post(`http://localhost:8000/blog/artykul/`, {tytul: this.art.tytul, streszczenie: this.art.streszczenie, tresc: this.art.tresc});
      this.artykul = [...this.artykul, response.data];
    },
    async editArtykul(){
      const response = await http().patch(`http://localhost:8000/blog/artykul/${this.art.id}/`,this.art) 
      this.artykul = this.artykul.map(item=> item.id === this.art.id ? response.data: item); 
      this.art= {};
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
