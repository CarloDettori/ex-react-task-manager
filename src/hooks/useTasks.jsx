import { useState } from "react";
import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext";
export default function useTask() {
    const setData = useContext(GlobalContext);

    function addTask() {

    }

    function removeTask() {

    }

    function updateTask() {

    }

    return [addTask, removeTask, updateTask]
}