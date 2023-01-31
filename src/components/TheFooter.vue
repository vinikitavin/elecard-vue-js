<template>
  <footer class="footer">
    <div class="footer__content">
      <a class="footer__link" href="https://www.elecard.com/ru" target="_blank">Сайт компании</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter"
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_colors.scss';

.footer {
  position: fixed;
  width: 100% ;
  bottom: 0;
  left: 0;
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 50%);
  background-color: $white;
  z-index: 99;

  &__content {
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }

  &__link {
    color: $black;
  }
}
</style>
