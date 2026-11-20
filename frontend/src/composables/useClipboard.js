import { ref } from 'vue'

export function useClipboard() {
  const copiedText = ref(false)
  const error = ref(null)

  const copy = async(text) => {
    try {
      error.value = null
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
      return false
    }
  }

  return {
    copiedText,
    error,
    copy
  }
}
