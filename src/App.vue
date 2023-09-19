<template>
  <v-app>
    <v-main>
      <HeaderComponent />
      <Home />
    </v-main>
  </v-app>
</template>

<script>
import Home from "../src/View/Home.vue";
// import FormSection from "../src/components/FormComponent.vue";
import HeaderComponent from "./components/Header.vue";
export default {
  name: "App",

  components: {
    Home,
    HeaderComponent,
  },

  data: () => ({
    //
  }),
};
</script>
