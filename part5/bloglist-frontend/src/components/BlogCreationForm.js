import React from 'react'

const BlogCreationForm = ({ submit, changeHandler } ) => {

  const styles = {
      display: 'grid',
      width: '15vw',
  }
  const spaced = {
    paddingTop: '5px',
    fontWeight: 'bold'
  }

  return(
    <div>
      <form style={styles} onSubmit={submit}>
        <h3>Add blog</h3>
        <label style={spaced} >Name</label>
        <input type="text" name="blogTitle" onChange={changeHandler} />

        <label style={spaced} >Author</label>
        <input type="text" name="blogAuthor" onChange={changeHandler} />

        <label style={spaced} >URL</label>
        <input type="text" name="blogURL" onChange={changeHandler} />

        <button style={{marginTop: '5px',fontWeight: 'bold'}} type="submit" >Add</button>
      </form>
    </div>
  )
}

export default BlogCreationForm
