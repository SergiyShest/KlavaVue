import { shallowMount } from "@vue/test-utils";
import inpVue from "@/components/klavaInp.vue";

describe("input.vue", () => {
  it("renders props.msg when passed", () => {
    const inp = "new message";
    const ex = "new message";
    const wrapper = shallowMount(inpVue, {
      propsData: { Example: ex, Inputed: inp }
    });
    expect(wrapper.text()).toMatch(inp);
  });
});
describe("input1.vue", () => {
  it("renders props.msg when passed", () => {
    const inp = "new message";
    const ex = "new messagesdddd";
    const wrapper = shallowMount(inpVue, {
      propsData: { Example: ex, Inputed: inp }
    });
    console.log("---" + wrapper.text());
    expect(wrapper.text()).toMatch(inp);
  });
});
//     wrapper.vm.$nextTick(() => {
//       expect(wrapper.vm.erText).toBe("Error");
//       expect(wrapper.vm.textOk).toBe("new ");
//      // expect(wrapper.vm.notInptText).toBe("message");
//     });
//   });
// });
