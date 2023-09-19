<template>
  <section>
    <v-main>
      <FormComponent />
    </v-main>
  </section>
</template>

<script>
import FormComponent from "@/components/FormComponent.vue";
export default {
  name: "LayoutComponent",
  components: {
    FormComponent,
  },
};
</script>
