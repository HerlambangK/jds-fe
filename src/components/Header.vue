<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />
    </div>
    <h1 class="text-center">Data Penerima Bansos</h1>

    <v-spacer></v-spacer>

    <v-btn href="https://github.com/HerlambangK" target="_blank" text>
      <span class="mr-2">About us</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>
