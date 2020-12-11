import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')

        if (loggedUserJson) {
            const user = JSON.parse(loggedUserJson)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const logout = () => {
        setUser(null)
        blogService.setToken(null)
        window.localStorage.removeItem('loggedBlogappUser')
    }

    const handleCreate = (blog) => {
        blogService.create(blog).then(blog => {
            setBlogs(blogs.concat(blog))
            blogFormRef.current.toggleVisibility()
        })
    }

    const handleLogin = async(credentials) => {
        try {
            const user = await loginService.login(credentials)

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            return true
        } catch (exception) {
            console.log('Wrong credentials')
            return false
        }
    }

    const handleLike = (blog) => {
        blogService.update(blog)
    }

    const handleDelete = (blog) => {

    }



    const loginForm = () => {
        return ( 
            <Togglable show = "login" >
                <LoginForm handleLogin = { handleLogin }/>  
            </Togglable>
        )
    }

    const blogFormRef = useRef()

    const blogForm = () => {
        return ( 
            <Togglable show = "create new blog" ref = { blogFormRef } >
                <BlogForm handleCreate = { handleCreate } /> 
            </Togglable>
        )
    }

    return ( 
        <div> {
            user === null ?
            loginForm() :
                ( 
                <div> { user.name }
                  logged in
                  <button onClick = { logout }> logout </button> { blogForm() } 
                </div>
            )
        } {
            blogs.map(blog =>
                <
                Blog key = { blog.id }
                blog = { blog }
                handleLike = { handleLike }
                />
            )
        } 
        </div>
    )
}

export default App