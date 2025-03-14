<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,Footer
  }
}
</script>

<template>
 <Header />

  <main>
    <Suspense fallback={null}>
      <router-view></router-view>
    </Suspense>
  </main>

  <Footer />
</template>

<style lang="sass">
 @use "@/sass/style.scss"
</style>
