import { ProvidePalette, usePalette } from "./use-palette";
import React from "react";
import theme, {resDarkTheme} from "./styles";

export default function darkMode() {
    palette = usePalette();
    if (palette.darkMode) {


        console.log("dark")
        return(theme.dark)
    }

    else {
        console.log("light")
        return(theme.light)
    }
}