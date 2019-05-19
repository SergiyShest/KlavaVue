import { shallowMount ,createLocalVue} from "@vue/test-utils";
import setting from "@/components/setting.vue";
import {store} from '@/store/store';

const localVue = createLocalVue()

localVue.use(store)

describe("test ", () => {
  it("User is choiced", () => {
    const usersArrey= ["vac","den","pet"];//
    var user='pet';
    localStorage.setItem ('currentUser',user);
    localStorage.setItem ('users',usersArrey);
    const wrapper =shallowMount(setting, { store, localVue })
    var text= wrapper.vm.currentUser;
    console.log("------------------->"+text);
    expect(text).toMatch(user);
  });
  it("User selected lang is choiced", () => {
    const usersArrey= ["vac","den","pet"];//
    var user='pet';
    localStorage.setItem ('currentUser',user);
    localStorage.setItem ('users',usersArrey);
    const wrapper =shallowMount(setting, { store, localVue })
    var text= wrapper.vm.currentUser;
    console.log("------------------->"+text);
    expect(text).toMatch(user);
  });
  
});