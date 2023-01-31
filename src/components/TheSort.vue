<template>
  <div class="sort">
    <div class="sort__menu" @click="isOpened = !isOpened">Сортировать</div>
    <div v-show="isOpened" class="sort__content">
      <div class="sort__radio" @click="sortedByValue('category')">
        <TheRadioButton
            :default-selected="''"
            :name="'sort'"
            :text="'Категория'"
            :value="'category'"
        />
      </div>
      <div class="sort__radio" @click="sortedByValue('timestamp')">
        <TheRadioButton
            :default-selected="''"
            :name="'sort'"
            :text="'Дата'"
            :value="'timestamp'"
        />
      </div>
      <div class="sort__radio" @click="sortedByValue('image')">
        <TheRadioButton
            :default-selected="''"
            :name="'sort'"
            :text="'Название'"
            :value="'image'"
        />
      </div>
      <div class="sort__radio" @click="sortedByValue('filesize')">
        <TheRadioButton
            :default-selected="''"
            :name="'sort'"
            :text="'Размер'"
            :value="'filesize'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TheRadioButton from "@/components/TheRadioButton";

export default {
  name: "TheSort",
  components: { TheRadioButton },
  data() {
    return {
      isOpened: false,
      radioValue: ''
    }
  },
  computed: {},
  methods: {
    sortedByValue(value) {
      const cards = this.$store.getters.getCards
      if (value === 'image') {
        const sortedCards = cards.sort((a, b) =>
            a.image.split('/')[1]
            > b.image.split('/')[1]
                ? 1
                : -1
        )
        this.$emit('sort', sortedCards)
      } else {
        const sortedCards = cards.sort((a, b) =>
            a[value]
            > b[value]
                ? 1
                : -1
        )
        this.$emit('sort', sortedCards)
      }
    },
    hideSortMenu() {
      this.isOpened = false
    }
  },
  mounted() {
    document.addEventListener('click', this.hideSortMenu.bind(this), true)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideSortMenu)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_colors.scss';

.sort {
  position: relative;

  &__menu {
    width: 138px;
    border: 1px solid $black;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 5px;
    cursor: pointer;
  }

  &__content {
    position: absolute;
    border: 1px solid $black;
    border-radius: 5px;
    padding: 20px;
    background: $white;
    z-index: 999;
  }
}
</style>
