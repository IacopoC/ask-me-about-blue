// @vitest-environment jsdom

import { describe, it, vi,  beforeEach, afterEach, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import ChatMessage from '@/components/ChatMessage.vue'
import { sendMessage } from '@/services/chatApi.js'

vi.mock("@/services/chatApi", () => ({
  sendMessage: vi.fn(),
}));
describe('ChatMessage', () => {
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
    vi.unstubAllGlobals()
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

  it('should copy the selected color when clicking the button', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)

    vi.stubGlobal('navigator', {
      clipboard: { writeText }
    })

    const messages = [
      {
        id: '1',
        role: 'assistant',
        content: 'Here are your colors!',
        colors: [
          { name: 'White', hex: '#FFFFFF' },
          { name: 'Red', hex: '#FF0000' }
        ]
       }
      ]

    localStorage.setItem('chatMessages', JSON.stringify(messages))
    const wrapper = mount(ChatMessage)

    await flushPromises()
    const colorItems = wrapper.findAll('.color-item')

    expect(colorItems).toHaveLength(2)

    const firstButton = colorItems[0].find('button')
    const secondButton = colorItems[1].find('button')

    await firstButton.trigger('click')
    await flushPromises()

    expect(writeText).toHaveBeenCalledWith('#FFFFFF')
    expect(firstButton.text()).toContain('Copied!')
    expect(secondButton.text()).toContain('Copy')

    wrapper.unmount()
  })
});
