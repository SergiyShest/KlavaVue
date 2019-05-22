<template>
  <div class="setting">
    <Table>
      <tr>
        <td>
          <h3>User:</h3>
        </td>
        <td>
          <select v-model="currentUser">
            <option selected>{{currentUser}}</option>
            <option v-for="user in users" v-bind:key="user">{{user}}</option>
          </select>
        </td>
      </tr>
    </Table>

    <new-setting v-on:usercreated="reloadUsers()"></new-setting>
    <h3>language:</h3>
    <select v-model="currentUserSettings.selectedLang">
      <option selected>русский</option>
      <option>english</option>
    </select>
  </div>
</template>

<script>
import newSetting from "./newSetting.vue";

import {
  LoadUserAchivment,
  SaveUserAchivment,
  LoadCurrUser,
  LoadUserSettings,
  SerialazeUserSettings
} from "./settingFunctions.js";
export default {
  name: "setting",
  components: {
    newSetting
  },
  props: {},
  data() {
    return {
      currentUser: "",
      users: [],
      currentUserSettings: {
        selectedLang: "русский",
        Mode: "KvaziText",
        IgnoreCapital: false,
        IgnoreRepeetWhiteSpace: false
      }
    };
  },
  computed: {
    currentUserResults: {
      get: function() {
        return this.$store.getters.GET_USER_ACHIEVEMENT_CHART;
      },
      set: function(newVal) {
        this.$store.dispatch("SAVE_USER_ACHIEVEMENT_CHART", newVal); //Save result in Vuex
      }
    }
  },

  watch: {
    currentUserSettings: {
      handler: function(newVal, oldVal) {
        var val = "en";
        //if (newVal.selectedLang != oldVal.selectedLang) {
           var val = "en";
          if (newVal.selectedLang === "русский")
          {val = "ru";}
          this.$emit("langChanged", val);//send event

          this.LoadCurrUserResult();//load result for this langr
        //}this.LoadCurrUserResult();//load result for this langr
       // console.log('newVal===================================================');
       // console.log(newVal.selectedLang);
      },
      deep: true
    },
    currentUser: function() {
      localStorage.setItem("currentUser", this.currentUser);

      this.LoadCurrUserResult(); //user changed so we need Load result
    },
    currentUserResults: function() {
       const serSerring = SerialazeUserSettings(this.currentUserSettings);
      SaveUserAchivment(this.currentUser, this.currentUserResults,serSerring);
    }
  },
  methods: {
    //load All Users and
    LoadAllUsersNames: function() {
      var usersStr = localStorage.getItem("users");

      if (usersStr == null) usersStr = "";
      usersStr = usersStr.replace("s+", " ").replace(";+", ";"); //remove white space
      if (usersStr.length > 0) {
        this.users.length = 0;
        //console.log(usersStr);
        this.users = usersStr.split(";");
       // console.log(this.users.length);
       // console.log(this.users);
      } else {
        this.users = new Array(); //Create empty Array
      }
    },
    LoadCurrUserResult: function() {
     // this.currentUserSettings = LoadUserSettings(this.currentUser);
      const serSerring = SerialazeUserSettings(this.currentUserSettings);
      console.log('serSerring='+serSerring);
      this.currentUserResults = LoadUserAchivment(this.currentUser, serSerring);
    },
    reloadUsers() {
      this.LoadAllUsersNames();

      this.currentUser = LoadCurrUser(this.users);
      this.currentUserSettings = LoadUserSettings(this.currentUser);
      const serSerring = SerialazeUserSettings(this.currentUserSettings);
      this.currentUserResults = LoadUserAchivment(this.currentUser, serSerring);
    }
  },
  beforeMount() {
    //инициализация при загрузке
    this.reloadUsers();
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped >
h3 {
  margin: 4px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.setting {
  border: 2px;
  border-radius: 2;
  border-width: 2px;
  color: #4335bb;
  text-align: left;
  height: 200px;
}
</style>
