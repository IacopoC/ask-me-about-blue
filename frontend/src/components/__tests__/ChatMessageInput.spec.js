import { describe, it, vi,  beforeEach, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ChatMessageInput from '@/components/ChatMessageInput.vue'

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
  });

  it('renders input and button', () => {
    const wrapper = mount(ChatMessageInput);
    expect(wrapper.find("input").exists()).toBe(true);
    expect(wrapper.find("button").exists()).toBe(true);
  })

  it('sends message and receive Openai reply', async () => {
    const wrapper = mount(ChatMessageInput);
    const input = wrapper.find("input");

    await input.setValue("Hi");
    await wrapper.find("form").trigger("submit.prevent");

    await Promise.resolve();

    expect(wrapper.text()).toContain("Hi");
    expect(wrapper.text()).toContain("Answer Openai")
  })
})
