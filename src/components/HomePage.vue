<template>
  <div class="page-background container mt-5">
    <h1 class="animated-header mt-4 text-center">Welcome you're at a good place</h1>
    <div class="d-flex flex-row justify-content-center">
      <div class="card mt-5 me-5" style="width: 18rem; height: fit-content">
        <img
          src="/src/assets/images/poulet-yassa.jpg"
          class="card-img-top"
          alt="Poulet Yassa"
          style="height: 12rem"
        />
        <div class="card-body">
          <h5 class="card-title">Poulet Yassa</h5>
          <p class="card-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas,
            vitae quaerat commodi illum earum aspernatur aut, doloremque beatae
            omnis quisquam id quidem aliquam.
          </p>
        </div>
      </div>
      <div class="card mt-5 me-5" style="width: 18rem; height: fit-content">
        <img
          src="/src/assets/images/niébé.jpg"
          class="card-img-top"
          alt="Niébé"
          style="height: 12rem"
        />
        <div class="card-body">
          <h5 class="card-title">Niébé</h5>
          <p class="card-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas,
            vitae quaerat commodi illum earum aspernatur aut, doloremque beatae
            omnis quisquam id quidem aliquam.
          </p>
        </div>
      </div>
      <div class="card mt-5" style="width: 18rem; height: fit-content">
        <img
          src="/src/assets/images/Riz.jpg"
          class="card-img-top"
          alt="Riz au Poisson"
          style="height: 12rem"
        />
        <div class="card-body">
          <h5 class="card-title">Riz au Poisson</h5>
          <p class="card-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas,
            vitae quaerat commodi illum earum aspernatur aut, doloremque beatae
            omnis quisquam id quidem aliquam.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.page-background {
  background-color: #f0f0f0;
  min-height: 100vh;
  color: #333;
  padding: 20px;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animated-header {
  animation: fadeInUp 1s ease-out;
}
</style>
