// import { shallowMount } from "@vue/test-utils";
// import inpVue from "@/components/klavaInp.vue";

// describe("input.vue", () => {
//     it("renders props.msg when passed", () => {
//         const inp = "new message";
//         const ex = "new message";
//         const wrapper = shallowMount(inpVue, {
//             propsData: { Example: ex, Inputed: inp }
//         });
//         expect(wrapper.text()).toMatch(inp);
//     });
// });

import { LoadUserAchivment,SaveUserAchivment,LoadCurrUser } from "@/components/settingFunctions.js";

describe(" UserAchivment Function Tests", () => {
  it("Save and load simple", () => {
    
    const userAchivment= [{date:'data',Errors:5,speed:100}]//
    
    SaveUserAchivment('userName',userAchivment);//save
    const inp = JSON.stringify(LoadUserAchivment('userName'));//laod and serialize
    const ex = JSON.stringify(userAchivment);//serialaze etalon
    expect(ex).toMatch(inp);//compare

  });
  it("load empty", () => {
    
     localStorage.removeItem ('userName'); 
    const inp = JSON.stringify(LoadUserAchivment('userName'));
    const ex = '[]'
    expect(ex).toMatch(inp);
  });
  it("load error string", () => {
    localStorage.setItem('userName','notValid');//save not Valid items
    const inp = JSON.stringify(LoadUserAchivment('userName'));
    const ex = '[]'
    expect(ex).toMatch(inp);
  }); 
});


describe("LoadCurrUser Tests", () => {
  it("User exists ", () => {
   var user='den';
    localStorage.setItem ('currentUser','den');
    const users= ["vac","den","pet"]//
    var loadedUser= LoadCurrUser(users);//save
    expect(user).toEqual(loadedUser);//compare
  });
  it("User not exists mast take first from Array", () => {
   
     localStorage.removeItem ('currentUser');
     const users= ["vac","den","pet"]//
      var user=users[0];
     var loadedUser= LoadCurrUser(users);//save
     expect(user).toEqual(loadedUser);//compare
   });
  it("User not exists users Empty mast create name unckown", () => {
     localStorage.removeItem ('currentUser');
    const users= [];//
      var user='unknown';
     var loadedUser= LoadCurrUser(users);//save
     expect(user).toEqual(loadedUser);//compare
   });
   it("User not in usersArray User mast by pushed in usersArray", () => {
    const usersArrey= ["vac","den","pet"];//
      var user='pig';
      localStorage.setItem ('currentUser',user);
     var loadedUser= LoadCurrUser(usersArrey);//save
       expect(usersArrey.includes(user)).toBe(true);//compare
   });
      it("User not exists usersArrey=>Empty mast create name unckown", () => {
   
     localStorage.removeItem ('currentUser');
    const users= [];//
      var user='unknown';
     var loadedUser= LoadCurrUser(users);//save
     expect(user).toEqual(loadedUser);//compare
    // console.log(users.length);
     expect(users.length).toBe(1);//compare
     expect(user).toEqual(users[0]);//compare
   });  
});
