import React from 'react';
const themes = {
    light: {
        background: "white",
        font: 'black',
        primary: 'green',
        secondary: 'darkgreen',
        red: 'rgb(252,68,34)',
        green: 'rgb(0,181,137)'
    },
    dark :{
        background: "#1f2022",
        font: 'white',
        primary: 'green',
        secondary: 'darkgreen',
        red: 'rgb(252,68,34)',
        green: 'rgb(0,181,137)'
    }
}

const initialState = {
   dark: false,
   theme: themes.light,
   toggle: () => {}
 }
export const ThemeContext = React.createContext(initialState)

export function ThemeProvider({ children }) {
const [dark, setDark] = React.useState(false) // Default theme is light

// To toggle between dark and light modes
const toggle = () => {
   setDark(!dark)
}

// Filter the styles based on the theme selected
const theme = dark ? themes.dark : themes.light

return (
    <ThemeContext.Provider value={{ theme, dark, toggle }}>
       {children}
    </ThemeContext.Provider>
    )
}