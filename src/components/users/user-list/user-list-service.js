const colorMapping = {
  1: '#2980b9',
  2: '#8e44ad',
  3: '#27ae60',
  4: '#f1c40f',
  5: '#e74c3c',
  6: '#1abc9c'
}

export const extendWithColors = (list) => {
  return list.map(item => {
    if (colorMapping[item.key]) {
      return { ...item, color: colorMapping[item.key] }
    } else {
      return item
    }
  })
}
