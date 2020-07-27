var _ = require('lodash');

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

  let comparator = (a, b) => {
    if(a.likes < b.likes) {
      return -1
    } else if (a.likes > b.likes) {
      return 1
    }
    return 0
  }

  return blogs.sort(comparator)[blogs.length-1]
}

const topAuthor = (blogs) => {
  let publications = _.groupBy(blogs, 'author')

  let tmp = []

  _.forEach(publications, (pubs, author) => {
    tmp.push({ 'author': author, 'blogs': pubs.length, })
  });

  // Reverse order sort so person with most publications will be at tmp[0]
  tmp.sort((a, b) => {
    if(a.blogs < b.blogs) {
      return 1
    } else if (a.blogs > b.blogs) {
      return -1
    }
    return 0
  })

  return tmp[0]
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  topAuthor
}
