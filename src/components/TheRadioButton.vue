<template>
  <label :for="value" class="radio">
    <input :id="value" v-model="selected" :name="name" :value="value" type="radio">
    <span>{{ text }}</span>
  </label>
</template>

<script>
export default {
  name: "TheRadioButton",
  data() {
    return {
      selected: this.defaultSelected
    }
  },
  props: {
    value: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    defaultSelected: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.radio {
  display: flex;
  flex-direction: column;

  & > input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  & > span {
    display: inline-flex;
    align-items: center;
    user-select: none;
    margin-right: 2rem;
  }

  & > span::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    flex-grow: 0;
    border: 0.5px solid #EFF5FC;
    background-color: rgba(238, 246, 255, 0.5);
    border-radius: 50%;
    margin-right: 0.5em;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
  }

  & > input:not(:disabled):not(:checked) + span:hover::before {
    border-color: #3781EF;
  }

  & > input:checked + span::before {
    content: '';
    border-color: #3781EF;
    background-color: #3781EF;
    transition: all 0.3s ease;
  }
}
</style>
