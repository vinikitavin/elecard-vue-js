<template>
  <header class="header">
    <div class="header__content">
      <img class="header__logo" src="@/assets/img/logo.png" alt="logo"/>
    </div>
  </header>
</template>

<script>
export default {
  name: "TheHeader"
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_colors.scss';

.header {
  position: fixed;
  width: 100% ;
  top: 0;
  left: 0;
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 50%);
  background-color: $white;
  z-index: 99;

  &__content {
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }

  &__logo {
    width: 200px;
    height: 50px;
  }
}
</style>
