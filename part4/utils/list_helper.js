const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  let likes = blogs.map(blog => blog.likes)
  return likes.reduce((sum, curr) => {
    return curr + sum
  }, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.sort(comparator)[blogs.length-1]
}

const comparator = (a, b) => {
  if(a.likes < b.likes) {
    return -1
  } else if (a.likes > b.likes) {
    return 1
  }
  return 0
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}
