import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useGestionStore = defineStore("gestion", {
  state: () => ({
    recettes: [
      {
        id: 1,
        title: "Poulet Yassa",
        ingredient: "Oignons, citron épices",
        type: "Plat"
      },

    ],
    nextId: 2
  }),

  actions: {

    addRecete(recette) {
      recette.id = this.nextId++;
      this.recettes.push(recette);
    },
    deleteRecette(id) {
      this.recettes.splice(id, 1);
    },
    updateRecette(updatedRecette) {
      const index = this.recettes.findIndex(p => p.id === updatedRecette.id);
      if (index !== -1) {
        this.recettes[index] = updatedRecette;
      }
    },
  }
})
