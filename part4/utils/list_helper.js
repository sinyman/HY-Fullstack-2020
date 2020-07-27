const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  let likes = blogs.map(blog => blog.likes)
  return likes.reduce((sum, curr) => {
    return curr + sum
  }, 0)
}

module.exports = {
  dummy,
  totalLikes
}
