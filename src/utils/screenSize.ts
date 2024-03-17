export type TScreenSize = "sm" | "md" | "lg" | "xl";

export const getScreenSize = ():TScreenSize => {
    if (window.innerWidth < 640) {
        return "sm";
    }
    if (window.innerWidth < 768) {
        return "md";
    }
    if (window.innerWidth < 1024) {
        return "lg";
    }
    if (window.innerWidth < 1280) {
        return "xl";
    }
    return "xl";
}