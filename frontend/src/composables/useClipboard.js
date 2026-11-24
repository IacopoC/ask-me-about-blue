import { ref } from 'vue'

export function useClipboard() {
  const copiedText = ref(false)
  const error = ref(null)
  const isSupported = typeof navigator !== 'undefined' && !!navigator.clipboard?.writeText

  const copy = async(text) => {
    error.value = null

    if(!isSupported) {
      error.value = new Error('Clipboard API is not supported')
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      copiedText.value = text

      setTimeout(() => {
        if(copiedText.value === text){
          copiedText.value = null
        }
      }, 2000)

      return true
    } catch(errorClipboard) {
      error.value = errorClipboard
      copiedText.value = null
      return false
    }
  }

  return {
    copiedText,
    error,
    copy,
    isSupported
  }
}
