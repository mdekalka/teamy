export const setStyles = (DOMElement, styles) => {
  if (!DOMElement) {
    return
  }

  Object.assign(DOMElement.style, styles)
}

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

