export const setStyles = (DOMElement, styles) => {
  if (!DOMElement) {
    return
  }

  Object.assign(DOMElement.style, styles)
}
