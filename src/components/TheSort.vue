<template>
  <div class="sort">
    <div class="sort__radio" @click="sortedByCategory">
      <TheRadioButton
          :default-selected="''"
          :name="'sort'"
          :text="'Категория'"
          :value="'category'"
      />
    </div>
    <div class="sort__radio" @click="sortedByTimestamp">
      <TheRadioButton
          :default-selected="''"
          :name="'sort'"
          :text="'Дата'"
          :value="'timestamp'"
      />
    </div>
    <div class="sort__radio" @click="sortedByImage">
      <TheRadioButton
          :default-selected="''"
          :name="'sort'"
          :text="'Название'"
          :value="'image'"
      />
    </div>
    <div class="sort__radio" @click="sortedByFilesize">
      <TheRadioButton
          :default-selected="''"
          :name="'sort'"
          :text="'Размер'"
          :value="'filesize'"
      />
    </div>
  </div>
</template>

<script>
import TheRadioButton from "@/components/TheRadioButton";

export default {
  name: "TheSort",
  components: {TheRadioButton},
  data() {
    return {
      radioValue: '',
    }
  },
  computed: {},
  methods: {
    getRadioValue(data) {
      this.radioValue = data
    },
    sortedByCategory() {
      const cards = this.$store.getters.getCards
      const sortedCards = cards.sort((a, b) => a.category > b.category ? 1 : -1)
      this.$emit('sort', sortedCards)
    },
    sortedByTimestamp() {
      const cards = this.$store.getters.getCards
      const sortedCards = cards.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1)
      this.$emit('sort', sortedCards)
    },
    sortedByImage() {
      const cards = this.$store.getters.getCards
      const sortedCards = cards.sort((a, b) => a.image.split('/')[1] > b.image.split('/')[1] ? 1 : -1)
      this.$emit('sort', sortedCards)
    },
    sortedByFilesize() {
      const cards = this.$store.getters.getCards
      const sortedCards = cards.sort((a, b) => a.filesize > b.filesize ? 1 : -1)
      this.$emit('sort', sortedCards)
    }
  },
}
</script>

<style lang="scss" scoped>
.sort {
  display: flex;
}
</style>
