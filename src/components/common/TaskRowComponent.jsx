import { memo } from "react"
import { Link } from "react-router-dom"

function TaskRowComponent({ task }) {

    return (
        <tr>
            <td style={{ backgroundColor: "rgba(201, 26, 26, 0.17)" }}><Link className="task-link" to={`/${task.id}`}>{task.title}</Link></td>
            <td style={{ backgroundColor: "rgba(201, 198, 26, 0.17)" }} >{task.status}</td>
            <td style={{ backgroundColor: "rgba(41, 201, 26, 0.17)" }}>{new Date(task.createdAt).toLocaleString()}</td>
        </tr>

    )
}
export default memo(TaskRowComponent)