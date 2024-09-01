<template>
  <div class="container ">
    <form @submit.prevent="handleAddRecette" class="formulaire form mb-5 shadow p-3 mb-5 bg-body rounded">
      <div class="mb-3">
        <label for="title" class="form-label">Tilte :</label>
        <input
          type="text"
          class="form-control"
          v-model="title"
          id="title"
          required
        />
      </div>
      <div class="mb-3">
        <label for="ingredient" class="form-label">Ingredients :</label>
        <input
          type="text"
          class="form-control"
          v-model="ingredient"
          id="ingredient"
          required
        />
      </div>
      
      <div class="mb-3">
        <label for="type" class="form-label">Type :</label>
        <select class="input form-select" v-model="type" id="type" required>
          <option value="Entrée">Entrée</option>
          <option value="Plat">Plat</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div>
      <button class="clr btn text-white mt-3 mb-4 me-3">
      Ajouter
      </button>
      <RouterLink class="list text-decoration-none text-white me-5 fw-bold" to="/listrecette">
      <button class="btn btn-danger mt-3 mb-4 ">
      Annuler
      </button>
     </RouterLink> 
    </form>
  </div>
  
</template>

<script setup>
import { useGestionStore } from '@/stores/gestion';
import { useRouter } from 'vue-router';
const router = useRouter();
import { ref } from 'vue';
const store = useGestionStore();
const title = ref("");
const ingredient = ref("");
const type = ref("");

const handleAddRecette = () => {
  addRecette();
  router.push('/listrecette');
};

const addRecette = () => {
  store.addRecete({title: title.value, ingredient: ingredient.value, type: type.value })
  title.value= "",
  ingredient.value= "",
  type.value= ""
};

</script> 

<style scoped>
.clr {
  background-color: #343a40; 
}
.clr:hover {
  background-color: #24272a; 
}
  .formulaire{
    width: 50%;
    border-radius: 10px;
    padding: 20px;
    margin: auto;
    margin-top: 16vh;
  }
</style>
