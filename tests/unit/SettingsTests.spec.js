
import { shallowMount } from "@vue/test-utils";
//import inpVue from "@/components/klavaInp.vue";
import speedometer from "@/components/speedometer.vue";



describe("input.vue", () => {
  it("renders props.msg when passed", () => {
    const inp = "new message";
    const ex = "new message";
    const wrapper = shallowMount(speedometer);
    //expect(wrapper.text()).toMatch(inp);
  });
});