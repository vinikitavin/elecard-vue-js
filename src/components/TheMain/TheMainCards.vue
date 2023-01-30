<template>
  <div class="main-cards">
    <div class="main-cards__item">
      <div class="main-cards__item-content item-content">
        <img alt="close-icon"
             class="item-content__close-icon"
             src="@/assets/img/close-icon.png"
             @click="$emit('cardId', card.id)"
        />
        <div class="item-content__img-wrapper">
          <img :src="`http://contest.elecard.ru/frontend_data/${card.image}`" alt="image" class="item-content__img"/>
        </div>
        <div class="item-content__description">
          <p class="item-content__category">
            Категория: {{ firstCursiveLetter(card.category) }}
          </p>
          <p class="item-content__date">
            Дата: {{ timeConverter(card.timestamp) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheMainCards",
  props: {
    card: {
      type: Object,
      required: true,
    }
  },
  computed: {
    setCategory() {
      this.firstCursiveLetter(this.card.category)
    }
  },
  methods: {
    firstCursiveLetter(word) {
      const firstLetterToUpperCase = word.split('')[0].toUpperCase();
      const restPartOfTheWord = word.slice(1);
      return firstLetterToUpperCase + restPartOfTheWord;
    },
    timeConverter(UNIX_timestamp) {
      let a = new Date(UNIX_timestamp);
      let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
      let year = a.getFullYear();
      let month = months[a.getMonth()];
      let date = a.getDate();
      let time = date + '.' + month + '.' + year;
      return time;
    }
  },
}
</script>

<style lang="scss" scoped>
.main-cards {

  &__item {
    padding: 20px;
  }

  &__item-content {
    min-width: 300px;
    min-height: 250px;
    border: 1px solid black;
  }
}

.item-content {
  position: relative;

  &__close-icon {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  &__img-wrapper {
    display: flex;
    justify-content: center;
    min-height: 200px;
  }

  &__img {
    max-width: 300px;
    max-height: 200px;
  }

  &__description {
    padding: 10px;
  }
}
</style>
