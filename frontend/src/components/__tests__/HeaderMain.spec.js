import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import HeaderMain from '@/components/HeaderMain.vue'
import { RouterLinkStub } from '@vue/test-utils'

it('Renders navigation links', () => {
  const wrapper = mount(HeaderMain, {
    global: {
      stubs: {
        RouterLink: RouterLinkStub
      }
    }
  })

  const links = wrapper.findAllComponents(RouterLinkStub)

  expect(links).toHaveLength(2)
  expect(links[0].props().to).toBe('/')
  expect(links[1].props().to).toBe('/about')
})

describe('HeaderMain component renders', () => {
  it('renders texts', () => {
    const wrapper = mount(HeaderMain,  {
      global: {
        stubs: { RouterLink: RouterLinkStub }
      }
    })

    expect(wrapper.text()).toContain('Ask me about Blue')
  })

  it('activate e deactivate italic class every second', async () => {
    vi.useFakeTimers()

    const wrapper = mount(HeaderMain,  {
      global: {
        stubs: { RouterLink: RouterLinkStub }
      }
    })

    const span = wrapper.find('span')
    expect(span.classes()).not.toContain('italic')

    await vi.advanceTimersByTimeAsync(1000)
    await wrapper.vm.$nextTick()
    expect(span.classes()).toContain('italic')

    await vi.advanceTimersByTimeAsync(1000)
    await wrapper.vm.$nextTick()
    expect(span.classes()).not.toContain('italic')

    vi.useRealTimers()
  });
});
