<template>
<div class="setting">
    <h3>result: {{currentUserResults}}</h3>
    <select v-model="currentUser">
      <option selected>{{currentUser}}</option>
      <option v-for="user in users" v-bind:key="user">{{user}}</option>
    </select>
    <new-setting v-on:usercreated="reloadUsers()"></new-setting>
    <chart :width="300" :height="50" :result="currentUserResults" />
    <!--<h3>language: </h3>
        <select v-model="selectedLang">
            <option selected>русский</option>
            <option>english</option>
    </select>-->
</div>
</template>

<script>
import newSetting from "./newSetting.vue";
import chart from "./Charts.js";
import {
    LoadUserAchivment,
    SaveUserAchivment
} from "./settingFunctions.js";
export default {
    name: "setting",
    components: {
        newSetting,
        chart
    },
    props: {},
    data() {
        return {
            selectedLang: "русский",
            currentUser: "",
            users: [],
            chartdata: {
   //             datacollection: {
                    labels: [1,2,3,4,5,6,7,8,8, 10, 11,12, 13,2,3,4,5,6,7,8,8, 10, 11,12, 13],
                    datasets: [{
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [40, 20,23,33,33,44,40, 20,23,33,33,44]
                    }]
              //  }

            }
        }
    },
    computed: {
        currentUserResults: {
            get: function () {
                return this.$store.getters.GET_USER_ACHIEVEMENT_CHART;
            },
            set: function (newVal) {
                //console.log("SAVE_USER_ACHIEVEMENT_CHART<=" + newVal);
                this.$store.dispatch("SAVE_USER_ACHIEVEMENT_CHART", newVal); //Save result in Vuex
            }
        }
    },

    watch: {
        selectedLang: function (newVal) {
            var val = "en";
            if (newVal == "русский") val = "ru";
            this.$emit("langChanged", val);
        },
        currentUser: function () {
            localStorage.setItem("currentUser", this.currentUser);
            this.LoadCurrUserResult(); //user changed so we need Load result
        },
        currentUserResults: function () {
            // console.log(this.currentUserResults);
            SaveUserAchivment(this.currentUser, this.currentUserResults);
        }
    },
    methods: {
        reloadUsers: function () {
            var usersStr = localStorage.getItem("users");
            if (usersStr == null) usersStr = "";
            usersStr = usersStr.replace("s+", " ").replace(";+", ";");
            console.log("1 " + usersStr);
            if (usersStr.length > 0) {
                this.users.length = 0;
                this.users = usersStr.split(";");
                this.currentUser = localStorage.getItem("currentUser");
                if (this.currentUser == null || this.currentUser == "undefinded") {
                    this.currentUser = this.users[0]; //пока первый пол
                }
            } else {
                //
                this.users = ["unknown"]; //
                this.currentUser = this.users[0]; //пока первый пол
            }
        },
        LoadCurrUserResult: function () {
            //var curUserRes = localStorage.getItem(this.currentUser);
            //if (curUserRes == null) {//this user new 
            //  this.currentUserResults = [];
            //} else {
            //  this.currentUserResults = curUserRes.split(',');
            this.currentUserResults = LoadUserAchivment(this.currentUser);

        }
    },
    beforeMount() {
        //инициализация при загрузке
        this.reloadUsers();
        this.LoadCurrUserResult();
    }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
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
