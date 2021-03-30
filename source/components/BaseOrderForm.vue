<template>
  <div class="contactForm">
    <h3>Контактные данные</h3>
    <div class="contactForm__input">
      <label for="basketFirstnameFild">Имя</label>
      <input
        type="text"
        name=""
        id="basketFirstnameFild"
        placeholder="Введите ваше имя"
        v-model="firstName"
      />
    </div>
    <div class="contactForm__input">
      <label for="basketLastnameFild">Фамилия</label>
      <input
        type="text"
        name=""
        id="basketLastnameFild"
        placeholder="Введите вашу фамилию"
        v-model="lastName"
      />
    </div>

    <div class="contactForm__input">
      <label for="basketTelFild">Телефон</label>
      <input type="tel" name="" id="basketTelFild" placeholder="+7" v-model="telephone" />
    </div>

    <div class="contactForm__input">
      <label for="basketAddrFild">Адрес </label>
      <input
        type="text"
        name=""
        id="basketAddrFild"
        placeholder="Введите ваш адрес"
        v-model="address"
      />
    </div>
    <input
      class="contactForm__button"
      type="button"
      value="Отправить"
      v-on:click="submitBtnClick"
    />
  </div>
</template>

<script>
export default {
  data: function() {
    return { firstName: "", lastName: "", telephone: "", address: "" };
  },
  methods: {
    submitBtnClick: function() {
      const submitingData = {
        firstName: this.firstName,
        lastName: this.lastName,
        telephone: this.telephone,
        address: this.address,
      };
      this.$emit("submitBtnClick", submitingData);
    },
  },
};
</script>

<style lang="scss">
.contactForm {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  h3 {
    flex: 0 0 100%;
  }

  &__input {
    flex: 0 0 45%;
    margin-bottom: 1rem;
    label {
      display: block;
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
    }
    input {
      padding: 0.3rem;
      width: 100%;
      box-sizing: border-box;
      font-size: 1rem;
      border-style: none;
      border-bottom: 1px solid black;
    }
  }
  &__button {
    padding: 0.5rem 2rem;
    box-sizing: border-box;
    font-size: 1rem;
    border-style: none;
    margin-bottom: 1rem;
    cursor: pointer;
    flex: 0 0 45%;
  }
}
@media (min-width: 767px) {
  .contactForm {
    flex-direction: row;
  }
}
</style>
