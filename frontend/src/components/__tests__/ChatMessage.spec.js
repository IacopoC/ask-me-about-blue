import { describe, it, vi,  beforeEach, afterEach, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ChatMessage from '@/components/ChatMessage.vue'
import { sendMessage } from '@/services/chatApi.js'

vi.mock("@/services/chatApi", () => ({
  sendMessage: vi.fn(),
}));
describe('ChatMessageInput', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            reply: { role: "assistant", content: "Answer Openai" },
          }),
      })
    );
    vi.spyOn(Storage.prototype, "setItem");
  });

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders input and button', () => {
    const wrapper = mount(ChatMessage);
    expect(wrapper.find("input").exists()).toBe(true);
    expect(wrapper.find("button").exists()).toBe(true);
  })

  it("sends message and receive Openai reply", async () => {
    sendMessage.mockResolvedValue({
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Answer Openai",
    });

    const wrapper = mount(ChatMessage);
    const input = wrapper.find("input");

    await input.setValue("Hi");
    await wrapper.find("form").trigger("submit.prevent");

    await vi.waitFor(() => {
      expect(wrapper.text()).toContain("Answer Openai");
    });

    expect(wrapper.text()).toContain("Hi");
  });

  it('saves messages to LocalStorage', async () => {
    const wrapper = mount(ChatMessage);
    const input = wrapper.find("input");

    await input.setValue("Hi");
    await wrapper.find("form").trigger("submit.prevent");
    await Promise.resolve();

    expect(localStorage.setItem).toHaveBeenCalled();
  })

  it("if clears chat works", async () => {
    const wrapper = mount(ChatMessage);
    wrapper.vm.messages.push({ role: "user", content: "Test" });

    await wrapper.findComponent({ name: "ChatMessageClear" })
      .vm.$emit("clearChat");

    expect(wrapper.vm.messages.length).toBe(0);
  });
});
