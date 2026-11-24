// @vitest-environment jsdom

import { describe, it, expect, vi, afterEach } from 'vitest'
import { useClipboard } from "@/composables/useClipboard.js";

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('useClipboard', () =>{

  it('should copy text successfully', async () =>{
    const writeText = vi.fn().mockResolvedValue(undefined)

    vi.stubGlobal('navigator', {
      clipboard: { writeText }
    })

    const { copy, copiedText, error, isSupported } = useClipboard()

    const result = await copy('#FFFFFF')

    expect(isSupported).toBe(true)
    expect(result).toBe(true)
    expect(writeText).toHaveBeenCalledWith('#FFFFFF')
    expect(copiedText.value).toBe('#FFFFFF')
    expect(error.value).toBeNull()
  })

  it('should handle clipboard errors', async() => {
    const writeText = vi.fn().mockRejectedValue(
      new Error('Permission denied')
    )

    vi.stubGlobal('navigator', {
      clipboard: { writeText }
    })

    const { copy, copiedText, error } = useClipboard()

    const result = await copy('#FFFFFF')

    expect(result).toBe(false)
    expect(copiedText.value).toBeNull()
    expect(error.value.message).toBe('Permission denied')
  })

  it('should detect unsupported browser', async () => {
    vi.stubGlobal('navigator', {})

    const { copy, isSupported, error } = useClipboard()

    const result = await copy('#FFFFFF')

    expect(isSupported).toBe(false)
    expect(result).toBe(false)
    expect(error.value).toBeInstanceOf(Error)
  })

  it('should reset copiedText after 2 seconds', async () => {
    vi.useFakeTimers()
    const writeText = vi.fn().mockResolvedValue(undefined)

    vi.stubGlobal('navigator', {
      clipboard: { writeText }
    })

    const { copy, copiedText } = useClipboard()

    await copy('#FFFFFF')

    expect(copiedText.value).toBe('#FFFFFF')
    vi.advanceTimersByTime(2000)
    expect(copiedText.value).toBeNull()
  })
})
