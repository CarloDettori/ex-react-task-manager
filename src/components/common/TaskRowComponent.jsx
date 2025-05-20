import { memo } from "react"
import { useState } from "react";
import Modal from "./ModalComponent";
import { Link } from "react-router-dom"

function TaskRowComponent({ task }) {
    let color
    if (task.status === "To do") {
        color = "rgba(201, 26, 26, 0.17)"
    } else if (task.status === "Doing") {
        color = "rgba(201, 198, 26, 0.17)"
    } else if (task.status === "Done") {
        color = "rgba(41, 201, 26, 0.17)"
    }
    return (
        <tr>
            <td><Link className="task-link" to={`/${task.id}`}>{task.title}</Link></td>
            <td style={{ backgroundColor: color }} >{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleString()}</td>

        </tr>
    )

}
export default memo(TaskRowComponent)