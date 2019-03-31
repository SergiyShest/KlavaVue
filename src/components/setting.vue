<template>
    <div class="setting">
        
        <h3>Name: {{currentUser}}</h3>
        <select v-model="currentUser">
            <option selected>{{currentUser}}</option>
            <option v-for="user in users" >{{user}}</option>
        </select>
        <new-setting v-on:usercreated="reloadUsers()" ></new-setting>
        <h3>language: </h3>
        <select v-model="selectedLang">
            <option selected>русский</option>
            <option>english</option>
        </select>
    </div>
</template>
<script>
    import newSetting from "./newSetting.vue";
    export default {
        name: "setting",
        components: { newSetting},
        props: {
        },
        data() {
            return {

                selectedLang: 'русский',
                currentUser: '',
                users: []
            }
        }
        , watch: {
            selectedLang: function (newVal) {
                var val = 'en';
                if (newVal == 'русский') val = 'ru'
                this.$emit('langChanged', val);;;
            }
        }
        ,
        methods: {
            reloadUsers: function () {
                var usersStr = localStorage.getItem('users');
                console.log("0 " +usersStr)
                usersStr = usersStr.replace("\s+", " ").replace(";+", ';');
                console.log("1 "+usersStr)
                if (usersStr.length > 0) {
                    this.users.length = 0;
                    this.users = usersStr.split(';');
                    this.currentUser = localStorage.getItem("currentUser");
                    if (this.currentUser == null || this.currentUser =="undefinded")
                    {
                        this.currentUser = this.users[0];//пока первый пол
                    }
                    

                }
                else {
                    this.users = ['unknown'];//
                    this.currentUser = this.users[0];//пока первый пол
                }
            }
        },
        beforeMount() {
            //инициализация первый раз
            this.reloadUsers();
        },
        watch: {
            currentUser: function () {
                  localStorage.setItem("currentUser", this.currentUser);
            }
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
        color: #42b983;
        text-align: left;
    }
</style>
