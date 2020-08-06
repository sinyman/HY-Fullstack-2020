import React from 'react'

const styleVar = {
  margin: '0'
}

const Blog = ({ blog }) => (
  <div style={{marginBottom: '2vh'}}>
    <h4 style={styleVar}>{blog.title}</h4> by {blog.author}
  </div>
)

export default Blog
