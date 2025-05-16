import { memo } from "react"

function TaskRowComponent({ tasks }) {
    return (
        <tr>
            <td style={{ backgroundColor: "rgba(201, 26, 26, 0.17)" }}>{tasks.title}</td>
            <td style={{ backgroundColor: "rgba(201, 198, 26, 0.17)" }} >{tasks.status}</td>
            <td style={{ backgroundColor: "rgba(41, 201, 26, 0.17)" }}>{new Date(tasks.createdAt).toLocaleString()}</td>
        </tr>
    )
}
export default memo(TaskRowComponent)