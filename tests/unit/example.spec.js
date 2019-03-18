import { shallowMount } from "@vue/test-utils";
import inpVue from "@/components/klavaInp.vue";

describe("input.vue", () => {
  it("renders props.msg when passed", () => {
    const inp = "new message";
    const ex = "new message";
    const wrapper = shallowMount(inpVue, {
      propsData: { inp,ex }
    });
    expect(wrapper.text()).toMatch(inp);
  });

});


  

