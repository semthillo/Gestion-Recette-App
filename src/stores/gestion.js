import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useGestionStore = defineStore("gestion", {
  state: () => ({
    // taches: [
    //   {
    //     id : 1,
    //     Titre: "README",
    //     Ingredients: "redaction du fichier",
    //     date_debut: "2024-10-22",
    //     date_fin: "2024-10-22",
    //     projet: "Projet A",
    //   },
    // ],

    recettes: [
      {
        id: 1,
        title: "Poulet Yassa",
        ingredient: "oignons, citron épices",
        type: "plat"
      },

    ],
    // nextId: 2,
    nextIdP: 2
  }),

  actions: {
    // addTache(tache) {
    //   tache.id = this.nextId++;
    //   this.taches.push(tache)
    // },
    // deleteTache(id) {
    //   this.taches.splice(id, 1);
    // },
    // updateTache(updatedTache) {
    //   const index = this.taches.findIndex(tache => tache.id === updatedTache.id);
    //   if (index !== -1) {
    //     this.taches[index] = updatedTache;
    //   }
    // },


    addRecete(recette) {
      recette.id = this.nextIdP++;
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
