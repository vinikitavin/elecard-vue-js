<template>
  <div id="app" class="wrapper">
    <TheHeader/>
    <TheMain/>
    <TheFooter/>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheMain from "@/components/TheMain";
import TheFooter from "@/components/TheFooter";


export default {
  components: {
    TheHeader,
    TheMain,
    TheFooter
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
