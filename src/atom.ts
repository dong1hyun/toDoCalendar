import { atom } from "recoil";

export const selectedDate = atom({
    key: "date",
    default: new Date(),
});

export interface ITodo {
    id: number;
    text: string;
}

export interface IToDostate {
    //App.tsx의 Board요소의 toDos={toDos[boardId] 속성에서
    //tsx는 boardId가 to_do, doing, done만 오는 것으로 알고 있음
    //그래서 오류가 뜨기 때문에 형식을 알려줘야 함
    [key1: string]: {[key2: string]: ITodo[]};
}

export const toDoCategory = atom<IToDostate>({
    key: "toDoCategory",
    default: {}
})