"use client"

import { createContext, useContext, useReducer, useEffect } from "react"

const AuthContext = createContext()

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      }
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      }
    case "UPDATE_PROFILE":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        dispatch({ type: "LOGIN", payload: parsedUser })
      } catch (error) {
        console.error("Error loading user from localStorage:", error)
        localStorage.removeItem("user")
      }
    }
    dispatch({ type: "SET_LOADING", payload: false })
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user))
    } else {
      localStorage.removeItem("user")
    }
  }, [state.user])

  const login = async (email, password) => {
    dispatch({ type: "SET_LOADING", payload: true })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - in real app, this would be an API call
    if (email && password) {
      const user = {
        id: Date.now(),
        email,
        name: email.split("@")[0],
        firstName: email.split("@")[0],
        lastName: "User",
        avatar: `https://ui-avatars.com/api/?name=${email.split("@")[0]}&background=6366f1&color=fff`,
        joinDate: new Date().toISOString(),
        orders: [],
        addresses: [],
        preferences: {
          newsletter: true,
          notifications: true,
        },
      }
      dispatch({ type: "LOGIN", payload: user })
      return { success: true }
    } else {
      dispatch({ type: "SET_LOADING", payload: false })
      return { success: false, error: "Invalid credentials" }
    }
  }

  const signup = async (userData) => {
    dispatch({ type: "SET_LOADING", payload: true })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user creation
    const user = {
      id: Date.now(),
      email: userData.email,
      name: `${userData.firstName} ${userData.lastName}`,
      firstName: userData.firstName,
      lastName: userData.lastName,
      avatar: `https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&background=6366f1&color=fff`,
      joinDate: new Date().toISOString(),
      orders: [],
      addresses: [],
      preferences: {
        newsletter: userData.newsletter || false,
        notifications: true,
      },
    }

    dispatch({ type: "LOGIN", payload: user })
    return { success: true }
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" })
  }

  const updateProfile = (updates) => {
    dispatch({ type: "UPDATE_PROFILE", payload: updates })
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
