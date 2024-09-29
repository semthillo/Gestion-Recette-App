<template>
  <div class="container">
    <!-- <div class="mb-4 d-flex justify-content-end">
      <button @click="changeLanguage('en')" class="btn btn-info me-2">{{ $t('buttons.english') }}</button>
      <button @click="changeLanguage('fr')" class="btn btn-info">{{ $t('buttons.french') }}</button>
    </div> -->
    <form
      @submit.prevent="addCategory"
      class="formulaire form mb-5 shadow p-3 mb-5 bg-body rounded"
    >
    <!-- <h1>{{ `size is ${size}` }}</h1> -->

      <div class="mb-3">
        <label for="name" class="form-label">{{ $t('form.name') }} :</label>
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
      <button class="clr btn text-white mt-3 mb-4 me-3"> {{ $t('buttons.add') }}</button>
      <RouterLink
        class="list text-decoration-none text-white me-5 fw-bold"
        to="/list-category"
      >
        <button class="btn btn-danger mt-3 mb-4">{{ $t('buttons.cancel') }}</button>
      </RouterLink>
    </form>
  </div>
</template>

<script setup>
import { useGestionStore } from "@/stores/gestion";
import { useRouter } from "vue-router";
import { getCurrentInstance } from 'vue';
// import axios from "axios";

const router = useRouter();
import { ref } from "vue";
const store = useGestionStore();
const name = ref("");
const addCategory = async () => {
  try {
    await store.addCategory(name.value);
    name.value = "";
    router.push("/list-category");
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const errors = error.response.data.errors;
      
      errors.forEach((err) => {
        alert(err.msg); 
      });
    } else {
      alert("Une erreur inattendue est survenue.");
    }

  }
};
const { proxy } = getCurrentInstance();

const changeLanguage = (locale) => {
  proxy.$i18n.locale = locale;
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
