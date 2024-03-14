export const getSmallImages = (images) => {
  const arr = []
  for(let i = 0; i < images.length; i++) {
    if(i === 3) {
      break
    }
    arr.push({
      original: images[i],
      thumbnail: images[i]
    })
  }
  return arr
}

export const getLocation = (location) => {
  const arr = location.search.split('=')
  return arr.length < 2
}