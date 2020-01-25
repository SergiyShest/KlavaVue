/* jshint ignore:start*/
import { shallowMount ,createLocalVue} from "@vue/test-utils";
import setting from "@/components/setting.vue";
import {store} from '@/store/store';

const localVue = createLocalVue()

localVue.use(store)
 const usersArrey= ["vac","den","pet"];//
const user='pet'
localStorage.clear();
describe("test ", () => {
  // it("User is choiced", () => {
  //   const usersArrey= ["vac","den","pet"];//
  //   var user='pet';
  //   localStorage.setItem ('currentUser',user);
  //   localStorage.setItem ('users',usersArrey);
  //   const wrapper = shallowMount(setting, { store, localVue })
  //   var text= wrapper.vm.currentUser;
  //   console.log("------------------->"+text);
  //   expect(text).toMatch(user);
  // });
  // it("User selected lang is choiced", () => {
  
  //   localStorage.setItem ('currentUser_1',user);
  //   localStorage.setItem ('users',usersArrey);

  //   const wrapper =shallowMount(setting, { store, localVue })
  //   var text= wrapper.vm.currentUser;
  //   //console.log("------------------->"+text);
  //   expect(text).toMatch(user);
  // });
  

it("User selected lang is choiced", () => {

   localStorage.setItem ('currentUser_1',user);
   localStorage.setItem ('users',usersArrey);
   const userAchivment= [{date:'data',Errors:5,speed:100}]//simple userAchivment 

   //SaveUserAchivment('userName',userAchivment,'1');//save 
    
    //  expect(userAchivment).toEqual(LoadeduserAchivment);
    const wrapper =shallowMount(setting, { store, localVue })
    wrapper.vm.currentUserResults=userAchivment;//user Achivment mast bi saved
    //console.log("------------------->"+JSON.stringify(wrapper.vm.currentUserResults));
    wrapper.vm.currentUserSettings.selectedLang= "английский";//this time currentUserResults mast be reloaded
    wrapper.vm.$nextTick(() => {
    expect(userAchivment).not.toEqual(wrapper.vm.currentUserResults);
    });
  });



});