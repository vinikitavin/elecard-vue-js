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
      isLoading: false,
      pageNumber: 0,
      cardsPerPage: 6,
      ro: null
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
    },
    onResize() {
      this.$emit('resize', this.$refs.main.offsetHeight)
    },
  },
  created() {
  },
  async mounted() {
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
    this.ro = new ResizeObserver(this.onResize)
    this.ro.observe(this.$refs.main)
    // localStorage.setItem('cards', JSON.stringify(this.defaultCardArray))
  },
  beforeDestroy() {
    this.ro.unobserve(this.$refs.main)
    // if (this.defaultCardArray.length !== this.getFilteredCardsArray.length) {
    //   localStorage.setItem('cards', JSON.stringify(this.getFilteredCardsArray))
    // }
  }
}
</script>

<style lang="scss" scoped>
.main {
  flex: 1 1 auto;

  &__form {
    margin-top: 90px;
  }

  &__form,
  &__sort {
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }

  &__spinner {
    display: flex;
    justify-content: center;
  }

  &__content {
    margin-bottom: 30px;
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
  border: 0.5px solid #3781EF;
  background: #EFF5FC;
  color: black;
  padding: 5px 20px;

  &:hover {
    background: #3781EF;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
  }

  &:disabled:hover {
    background: #EFF5FC;
    color: black;
  }
}
</style>
