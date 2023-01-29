<template>
  <div class="main-tree">
    <ul
        class="
        main-tree__tree-padding
        main-tree__tree-vertical-lines
        main-tree__tree-horizontal-lines
        main-tree__tree-summaries
        main-tree__tree-markers
        main-tree__tree-buttons"
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
export default {
  name: "TheMainTree",
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
.main-tree {
  &__tree-padding {
    --spacing: 1.5rem;
    --radius: 10px;
    padding-left: 1rem;
  }

  &__tree-padding li {
    display: block;
    position: relative;
    padding-left: calc(2 * var(--spacing) - var(--radius) - 2px);
  }

  &__tree-padding ul {
    margin-left: calc(var(--radius) - var(--spacing));
    padding-left: 0;
  }

  &__tree-vertical-lines ul li {
    border-left: 2px solid var(--dark-grey);
  }

  &__tree-vertical-lines ul li:last-child {
    border-color: transparent;
  }

  &__tree-horizontal-lines ul li::before {
    content: '';
    display: block;
    position: absolute;
    top: calc(var(--spacing) / -2);
    left: -2px;
    width: calc(var(--spacing) + 2px);
    height: calc(var(--spacing) + 1px);
    border: solid var(--dark-grey);
    border-width: 0 0 2px 2px;
  }

  &__tree-summaries summary {
    display: flex;
    cursor: pointer;
    align-items: center;
  }

  &__tree-summaries summary::marker,
  &__tree-summaries summary::-webkit-details-marker {
    display: none;
  }

  &__tree-summaries summary:focus {
    outline: none;
  }

  &__tree-summaries summary:focus-visible {
    outline: 1px dotted #000;
  }

  &__tree-markers li::after,
  &__tree-markers summary::before {
    content: '';
    display: block;
    position: absolute;
    top: calc(var(--spacing) / 2 - var(--radius));
    left: calc(var(--spacing) - var(--radius) - 1px);
    width: calc(2 * var(--radius));
    height: calc(2 * var(--radius));
    border-radius: 50%;
    background: var(--dark-grey);
  }

  &__tree-buttons summary::before {
    content: '+';
    z-index: 1;
    background: var(--accent);
    color: #fff;
    font-weight: 400;
    line-height: calc(2 * var(--radius) - 2px);
    text-align: center;
  }

  &__tree-buttons details[open] > summary::before {
    content: '−';
  }

  &__header {
    width: 420px;
    border: 0.5px solid #3781EF;
    background: #EFF5FC;
    padding-left: 10px;
    margin: 1px;
  }

  &__header:hover {
    background: #3781EF;
    color: white;
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
    background: white;
    width: 100%;
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
}
</style>
