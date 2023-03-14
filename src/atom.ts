import { atom } from "recoil";

export const selectedDate = atom({
    key:"date",
    default: new Date(),
})