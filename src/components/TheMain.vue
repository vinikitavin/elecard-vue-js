<template>
  <main class="main">
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
      <img src="@/assets/img/spinner.gif" alt="spinner"/>
    </div>
    <div v-else class="main__content content">
      <div class="content__card">
        <TheMainCard
            v-for="card in getFilteredCardsArray"
            v-if="radioValue === 'cards'"
            :key="card.id"
            :card="card"
            @cardId="getClosedCards"
        />
      </div>
      <div class="content__tree">
        <TheMainTree
            v-for="card in getFilteredCardsArray"
            v-if="radioValue === 'tree'"
            :key="card.id"
            :card="card"
        />
      </div>
    </div>
  </main>
</template>

<script>
import api from '@/api/axios'
import TheRadioButton from "@/components/TheRadioButton";
import TheMainCard from "@/components/TheMainCards";
import TheMainTree from "@/components/TheMainTree";
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
      isLoading: false
    }
  },
  computed: {
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
  },
}
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 1s;
}

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
}

.content {
  &__tree {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__card {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
