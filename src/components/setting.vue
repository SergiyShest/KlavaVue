<template>
    <div class="setting">
      <Table><tr><td><h3>User:</h3></td><td><select v-model="currentUser">
            <option selected>{{currentUser}}</option>
            <option v-for="user in users" v-bind:key="user">{{user}}</option>
        </select></td></tr> </Table> 
        
        <new-setting v-on:usercreated="reloadUsers()"></new-setting>
       <h3>language: </h3>
        <select v-model="selectedLang">
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
        LoadCurrUser
    } from "./settingFunctions.js";
    export default {
        name: "setting",
        components: {
            newSetting
        },
        props: {},
        data() {
            return {
                selectedLang: "русский",
                currentUser: "",
                users: []
            }
        },
        computed: {
            currentUserResults: {
                get: function () {
                  return this.$store.getters.GET_USER_ACHIEVEMENT_CHART;
               
                },
                set: function (newVal) {

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
                SaveUserAchivment(this.currentUser, this.currentUserResults);
            },
            users: function (val) {
                console.log('log-->'+val);
            },
        },
        methods: {
            //load All Users and 
            LoadAllUsersNames: function () {
                var usersStr = localStorage.getItem("users");
                
                if (usersStr == null) usersStr = "";
                usersStr = usersStr.replace("s+", " ").replace(";+", ";");//remove white space
             if (usersStr.length > 0) {
                 this.users.length = 0;
                 console.log(usersStr);
                 this.users = usersStr.split(";");
                 console.log(this.users.length);
                 console.log(this.users);
                } else {
                    this.users = new Array(); //Create empty Array
                }
            },
            //LoadCurrUser: function () {
            //    this.currentUser = LoadCurrUser(this.users);
            //    console.log(this.users);
            //},
            LoadCurrUserResult: function () {
                this.currentUserResults = LoadUserAchivment(this.currentUser);
            },
            reloadUsers(){
                this.LoadAllUsersNames();
               
                this.currentUser = LoadCurrUser(this.users);
              
                this.currentUserResults= LoadUserAchivment(this.currentUser);
            }
        },
        beforeMount() {
            //инициализация при загрузке
            this.reloadUsers();
            console.log("-->"+this.users);
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
