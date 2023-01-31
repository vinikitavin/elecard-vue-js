<template>
  <main ref="main" class="main">
    <div class="main__form radio">
      <div class="radio__wrapper" @click="radioValue = 'cards'">
        <TheRadioButton
            :default-selected="'cards'"
            :name="'change'"
            :text="'Карточки'"
            :value="'cards'"
        />
      </div>
      <div class="radio__wrapper" @click="radioValue = 'tree'">
        <TheRadioButton
            :default-selected="''"
            :name="'change'"
            :text="'Дерево'"
            :value="'tree'"
        />
      </div>
    </div>
    <div class="main__sort">
      <TheSort @sort="getSortValue"/>
    </div>
    <transition>
      <div class="main__reset">
        <button :disabled="!isReset" @click="resetCardsArray" class="main__reset-btn">Сбросить</button>
      </div>
    </transition>
    <div v-if="isLoading" class="main__spinner spinner">
      <img alt="spinner" src="@/assets/img/spinner.gif"/>
    </div>
    <div v-else class="main__content content">
      <div v-if="radioValue === 'cards'" class="content__card">
        <TheMainCard
            v-for="card in getPaginatedFilteredPage"
            :key="card.id"
            :card="card"
            @cardId="getClosedCards"
        />
      </div>
      <div v-if="radioValue === 'tree'" class="content__tree">
        <TheMainTree
            v-for="card in getFilteredCardsArray"
            :key="card.id"
            :card="card"
        />
      </div>
    </div>
    <div v-if="radioValue === 'cards'" class="main__pagination pagination">
      <button
          :disabled="pageNumber === 0"
          class="pagination__prev-btn btn"
          @click="pageNumber--"
      >Назад
      </button>
      <button :disabled="pageNumber >= getFilteredCardsArray.length / cardsPerPage"
              class="pagination__next-btn btn"
              @click="pageNumber++"
      >Вперед
      </button>
    </div>
  </main>
</template>

<script>
import api from '@/api/axios'
import TheRadioButton from "@/components/TheRadioButton";
import TheMainCard from "@/components/TheMain/TheMainCards";
import TheMainTree from "@/components/TheMain/TheMainTree";
import TheSort from "@/components/TheSort";

export default {
  name: "TheMain",
  components: {
    TheSort,
    TheMainTree,
    TheMainCard,
    TheRadioButton
  },
  data() {
    return {
      radioValue: 'cards',
      sortedArray: '',
      closedCards: [],
      defaultCardArray: [],
      isReset: false,
      isLoading: false,
      pageNumber: 0,
      cardsPerPage: 6,
    }
  },
  computed: {
    getPaginatedFilteredPage() {
      const start = this.pageNumber * this.cardsPerPage
      const end = start + this.cardsPerPage
      return this.getFilteredCardsArray.slice(start, end)
    },
    getFilteredCardsArray() {
      return this.defaultCardArray
          // Sort filter
          .filter(card => {
            return this.closedCards || this.sortedArray.includes(card)
          })
          // Deleted filter
          .filter(card => {
            return this.sortedArray || !this.closedCards.includes(card.id)
          })
          //Both filters || No one
          .filter(card => {
            if (this.sortedArray && this.closedCards) {
              return !this.closedCards.includes(card.id) && this.sortedArray.includes(card)
            }
            return card
          })
    }
  },
  methods: {
    getSortValue(sortedArray) {
      this.sortedArray = sortedArray
    },
    getClosedCards(closedCard) {
      this.closedCards.push(closedCard)
      localStorage.setItem('cards', JSON.stringify(this.getFilteredCardsArray))
      this.isReset = true
    },
    resetCardsArray() {
      localStorage.removeItem('cards')
      this.isReset = false
      location.reload()
    }
  },
  async mounted() {
    if (!localStorage.getItem('cards')) {
      try {
        this.isLoading = true
        const response = await api.get('catalog.json')
        this.defaultCardArray = response.map((card, index) => {
          return {
            id: index + 1,
            image: card.image,
            filesize: card.filesize,
            timestamp: card.timestamp,
            category: card.category
          }
        })
        await this.$store.dispatch('changeCards', this.defaultCardArray)
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    } else {
      this.defaultCardArray = JSON.parse(localStorage.getItem('cards'))
      await this.$store.dispatch('changeCards', this.defaultCardArray)
      this.isReset = true
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_colors.scss';

.main {
  flex: 1 1 auto;

  &__form {
    margin-top: 90px;
  }

  &__form,
  &__sort {
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }

  &__sort {
    padding: 10px 0 0 0;
  }

  &__reset {
    display: flex;
    justify-content: center;
  }

  &__reset-btn {
    width: 138px;
    border: 1px solid $black;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 5px;
    cursor: pointer;
    transition: 0.4s;
  }

  &__reset-btn:disabled {
    background: $black;
    color: $white;
    opacity: 0.5;
  }

  &__spinner {
    display: flex;
    justify-content: center;
    padding: 130px 0;
  }

  &__content {
    max-width: 1000px;
    margin: 0 auto 30px auto;
  }

  &__pagination {
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
  }
}

.radio {
  &__wrapper {
    margin-right: 10px;
  }
}

.content {
  &__tree {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 90px;
  }

  &__card {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}

.pagination {
  &__prev-btn {
    margin-right: 10px;
  }
}

.btn {
  border: 0.5px solid $blue;
  border-radius: 5px;
  background: $light-blue;
  color: $black;
  padding: 5px 20px;
  transition: 0.6s;


  &:hover {
    background: $blue;
    color: $white;
  }

  &:disabled {
    opacity: 0.5;
  }

  &:disabled:hover {
    background: $light-blue;
    color: $black;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
