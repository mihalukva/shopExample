<template>
  <div class="fullScreanMsg">
    <div class="fullScreanMsg__block">
      <div class="fullScreanMsg__closeBtn" v-on:click="$emit('closeMsg')">
        +
      </div>
      <div class="fullScreanMsg__message">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.fullScreanMsg {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.6);
  &__block {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 0 2rem 2rem 2rem;
    border-radius: 1rem;
  }
  &__closeBtn {
    font-size: 3rem;
    align-self: flex-end;
    transform: rotate(45deg);
    cursor: pointer;
    color: #999999;
    &:hover {
      color: #333333;
    }
  }
  &__message {
    font-size: 2rem;
  }
}
</style>
