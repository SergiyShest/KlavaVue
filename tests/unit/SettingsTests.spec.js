 import {shallowMount }  from "@vue/test-utils";
import  inpVue  from "@components/klavaInp.vue";

import { LoadUserAchivment,SaveUserAchivment } from "@/components/settingFunctions.js";
describe("Save_load_userAchivment", () => {
  it("Save and load simple", () => {
    
    const userAchivment= [{date:'data',Errors:5,speed:100}]
    
    SaveUserAchivment('userName',userAchivment);
    const inp = JSON.stringify(LoadUserAchivment('userName'));
    const ex = JSON.stringify(userAchivment);
    expect(ex).toMatch(inp);
  });
  it("load empty", () => {
    
     localStorage.removeItem ('userName'); 
    const inp = JSON.stringify(LoadUserAchivment('userName'));
    const ex = '[]'
    expect(ex).toMatch(inp);
  });
  it("load error string", () => {
    localStorage.setItem('userName','notValid');

    const inp = JSON.stringify(LoadUserAchivment('userName'));
    const ex = '[]'
    expect(ex).toMatch(inp);
  }); 
});

