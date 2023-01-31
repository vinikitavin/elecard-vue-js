<template>
  <div class="main-tree">
    <ul
        class="
        main-tree__tree-padding
        main-tree__tree-summaries"
    >
      <li>
        <details close>
          <summary class="main-tree__header">Карточка №{{ card.id }}</summary>
          <ul>
            <li>
              <details>
                <summary class="main-tree__img-wrapper">
                  <p class="main-tree__img-head">Картинка:</p>
                  <img :src="`http://contest.elecard.ru/frontend_data/${card.image}`" alt="image"
                       class="main-tree__img"
                       @click="openImg = true"/>
                </summary>
              </details>
            </li>
            <li>
              <details>
                <summary>Размер файла: {{ Math.round(Number(card.filesize) / 1024) }} КБ</summary>
              </details>
            </li>
            <li>
              <details>
                <summary>Дата: {{ timeConverter(card.timestamp) }}</summary>
              </details>
            </li>
            <li>
              <details>
                <summary>Категория: {{ firstCursiveLetter(card.category) }}</summary>
              </details>
            </li>
          </ul>
        </details>
      </li>
    </ul>
    <transition v-if="openImg" class="main-tree__modal modal" name="modal">
      <div class="modal__mask">
        <div class="modal__wrapper">
          <div class="modal__container">
            <div class="modal__content">
              <img :src="`http://contest.elecard.ru/frontend_data/${card.image}`" alt="image"
                   class="modal__img"/>
              <button class="modal__btn" @click="openImg = !openImg">Закрыть</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { utils } from "@/mixins/utils";

export default {
  name: "TheMainTree",
  mixins: [ utils ],
  data() {
    return {
      openImg: false
    }
  },
  props: {
    card: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_colors.scss';

.main-tree {
  &__tree-padding li {
    display: block;
    position: relative;
    padding-left: calc(2 * var(--spacing) - var(--radius) - 2px);
  }

  &__tree-summaries summary {
    display: flex;
    cursor: pointer;
    align-items: center;
  }

  &__header {
    width: 420px;
    border: 0.5px solid $blue;
    background: $light-blue;
    padding-left: 10px;
    margin: 1px;
  }

  &__header:hover {
    background: $blue;
    color: $white;
  }

  &__img-head {
    margin-right: 5px;
  }

  &__img {
    width: 25px;
    height: 15px;
  }
}

.modal {
  &__mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  &__wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 2px;
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  &__btn {
    background: $white;
    width: 100%;
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
