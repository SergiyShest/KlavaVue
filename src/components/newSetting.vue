<template>
  <div>
    <modal v-if="showModal" @close="showModal = false" @ok="createNewUser">
      <h2 slot="header">input your name please</h2>
      <input type="text" slot="body" v-model="userName" />
    </modal>
    <button @click="showModal = true">createNewUser</button>
  </div>
</template>
<script>
import modal from "./core/modal.vue";
export default {
  name: "newSetting",
  components: { modal },
  data() {
    return {
      showModal: false,
      userName: ""
    };
  },
  methods: {
    createNewUser: function() {
      var users = localStorage.getItem("users");
      users += ";" + this.userName;
      localStorage.setItem("users", users);
      localStorage.setItem("currentUser", this.userName);
      this.$emit("usercreated");
      this.showModal = false;
    }
  }
};
</script>
<style></style>
