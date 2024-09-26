<template>
  <div class="container">
    <form
      @submit.prevent="addCategory"
      class="formulaire form mb-5 shadow p-3 mb-5 bg-body rounded"
    >
    <!-- <h1>{{ `size is ${size}` }}</h1> -->

      <div class="mb-3">
        <label for="name" class="form-label">Name :</label>
        <input
          type="text"
          class="form-control"
          v-model="name"
          id="name"
          required
        />
      </div>
      <!-- <div class="mb-3">
        <label for="ingredient" class="form-label">Ingrédients :</label>
        <textarea
          class="form-control"
          v-model="ingredient"
          id="ingredient"
          required
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="type" class="form-label">Type :</label>
        <select class="input form-select" v-model="type" id="type" required>
          <option value="Entrée">Entrée</option>
          <option value="Plat">Plat</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div> -->
      <button class="clr btn text-white mt-3 mb-4 me-3">Ajouter</button>
      <RouterLink
        class="list text-decoration-none text-white me-5 fw-bold"
        to="/list-category"
      >
        <button class="btn btn-danger mt-3 mb-4">Annuler</button>
      </RouterLink>
    </form>
  </div>
</template>

<script setup>
import { useGestionStore } from "@/stores/gestion";
import { useRouter } from "vue-router";
// import axios from "axios";

const router = useRouter();
import { ref } from "vue";
const store = useGestionStore();
const name = ref("");
// const size = ref(0);
// const axiosAddRecette = async() => {
//   try {
//     const resp = await axios.get("http://localhost:3005/api/recipes");
//     console.log(resp.data);
    
//     size.value = resp.data.length; 
//   } catch (error) {
    
//   }  
 
// };

// const addCategory = async () => {
//   try {
//     await store.addCategory(name.value);

//   name.value = "";
//   router.push("/list-category");
//   } catch (error) {
//     console.log(error)    
//   }
  
// };
const addCategory = async () => {
  try {
    await store.addCategory(name.value);
    name.value = "";
    router.push("/list-category");
  } catch (error) {
    console.log(error.response.data);  // Voir les détails de l'erreur
  }
};


</script> 

<style scoped>
.clr {
  background-color: #343a40;
}
.clr:hover {
  background-color: #24272a;
}
.formulaire {
  width: 50%;
  border-radius: 10px;
  padding: 20px;
  margin: auto;
  margin-top: 16vh;
}
textarea {
  resize: none;
}
</style>
