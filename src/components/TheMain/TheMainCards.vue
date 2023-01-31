<template>
  <div class="main-cards">
    <img :src="`http://contest.elecard.ru/frontend_data/${card.image}`" alt="image" class="main-cards__img"/>
    <ul class="main-cards__description">
      <li class="main-cards__category">
        Категория: {{ firstCursiveLetter(card.category) }}
      </li>
      <li class="main-cards__date">
        Дата: {{ timeConverter(card.timestamp) }}
      </li>
    </ul>
    <img alt="close-icon"
         class="main-cards__close-icon"
         src="@/assets/img/close-icon.png"
         @click="$emit('cardId', card.id)"
    />
  </div>
</template>

<script>
import { utils } from "@/mixins/utils";

export default {
  name: "TheMainCards",
  mixins: [ utils ],
  props: {
    card: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_colors.scss';

.main-cards {
  background-color: $light-blue;
  box-shadow: 5px 5px 10px $grey;
  width: 250px;
  min-height: 184px;
  max-height: 240px;
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  position: relative;
  margin: 20px;

  &__img {
    object-fit: cover;
    height: 177px;
    border-radius: 5px;
    background-position: 50% 50%;
  }

  &__description {
    padding: 10px;
  }

  &__close-icon {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 3px;
    right: 3px;
    cursor: pointer;
  }
}
</style>
