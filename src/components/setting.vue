<template>
  <div class="setting">
    <Table>
      <tr>
        <td>
          <h3>User:</h3>
        </td>
        <td>
          <select v-model="currentUser">
            <option v-for="user in users" v-bind:key="user">{{user}}</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>
          <h3>Language:</h3>
        </td>
        <td>
          <select v-model="currentUserSettings.selectedLang">
            <option selected>русский</option>
            <option>english</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>
          <h3>Centanion count:</h3>
        </td>
        <td >
          <input type="number" v-model="currentUserSettings.SentationsCount" style="width:50px" >
        </td>

      </tr>
      <tr>
        <td>
          <h3>Ignore Capital:</h3>
        </td>
        <td >
          <input type="checkbox" 
          v-model="currentUserSettings.IgnoreCapital"
             >
        </td>
      </tr>
    </Table>

    <new-setting v-on:usercreated="reloadUsers()"></new-setting>
  </div>
</template>

<script>
import newSetting from "./newSetting.vue";

    import {
  Set,
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
       currentUserSettings:new Set()
      //currentUserSettings: {
      //  selectedLang: "русский",
      //  Mode: "KvaziText",
      //  IgnoreCapital: false,
      //  IgnoreRepeetWhiteSpace: false,
      //  SentationsCount: 1
      //  }

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
        
        this.$emit("settingsChanged", newVal);
        this.LoadCurrUserResult(); //load result for this langr
      },
      deep: true
    },
    currentUser: function() {
      localStorage.setItem("currentUser", this.currentUser);

      this.LoadCurrUserResult(); //user changed so we need Load result
    },
    currentUserResults: function() {
      const serSerring = SerialazeUserSettings(this.currentUserSettings);
      SaveUserAchivment(this.currentUser, this.currentUserResults, serSerring);
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
        this.users = usersStr.split(";");
        } else {
        this.users = new Array(); //Create empty Array
      }
    },
    LoadCurrUserResult: function() {
      const serSerring = SerialazeUserSettings(this.currentUserSettings);
//     console.log("serSerring=" + serSerring);
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
