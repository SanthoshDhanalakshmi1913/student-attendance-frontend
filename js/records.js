async function getAttendance() {

    const table =
        document.getElementById(
            "attendanceTable"
        );


    try {

        const response =
            await fetch(
                ATTENDANCE_API
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load attendance"
            );

        }


        const attendanceList =
            await response.json();


        table.innerHTML = "";


        if (attendanceList.length === 0) {

            table.innerHTML = `

                <tr>

                    <td colspan="7">
                        No Attendance Records Found
                    </td>

                </tr>

            `;

            return;

        }


        attendanceList.forEach(
            attendance => {

                const student =
                    attendance.student || {};


                table.innerHTML += `

                    <tr>

                        <td>
                            ${attendance.id || "-"}
                        </td>

                        <td>
                            ${student.studentId || "-"}
                        </td>

                        <td>
                            ${student.studentName || "-"}
                        </td>

                        <td>
                            ${student.department || "-"}
                        </td>

                        <td>
                            ${attendance.attendanceDate || "-"}
                        </td>

                        <td>
                            ${formatDateTime(
                                attendance.inTime
                            )}
                        </td>

                        <td>
                            ${formatDateTime(
                                attendance.outTime
                            )}
                        </td>

                    </tr>

                `;

            }
        );


    } catch (error) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    style="color:red"
                >

                    Error Loading Attendance Data

                </td>

            </tr>

        `;

    }

}


async function getStudentHistory() {

    const studentId =
        document
            .getElementById(
                "historyStudentId"
            )
            .value
            .trim();


    if (!studentId) {

        alert(
            "Please Enter Student ID"
        );

        return;

    }


    const table =
        document.getElementById(
            "attendanceTable"
        );


    try {

        const response =
            await fetch(
                `${ATTENDANCE_API}/student/${studentId}`
            );


        if (!response.ok) {

            throw new Error(
                "Attendance Not Found"
            );

        }


        const attendanceList =
            await response.json();


        table.innerHTML = "";


        attendanceList.forEach(
            attendance => {

                const student =
                    attendance.student || {};


                table.innerHTML += `

                    <tr>

                        <td>${attendance.id || "-"}</td>

                        <td>${student.studentId || "-"}</td>

                        <td>${student.studentName || "-"}</td>

                        <td>${student.department || "-"}</td>

                        <td>${attendance.attendanceDate || "-"}</td>

                        <td>
                            ${formatDateTime(
                                attendance.inTime
                            )}
                        </td>

                        <td>
                            ${formatDateTime(
                                attendance.outTime
                            )}
                        </td>

                    </tr>

                `;

            }
        );


    } catch (error) {

        alert(error.message);

    }

}


function downloadPdf() {

    window.location.href =
        `${ATTENDANCE_API}/download-pdf`;

}


function formatDateTime(dateTime) {

    if (!dateTime) {

        return "-";

    }


    return new Date(
        dateTime
    ).toLocaleString();

}


getAttendance();