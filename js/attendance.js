const studentIdInput =
    document.getElementById(
        "attendanceStudentId"
    );


studentIdInput.addEventListener(
    "blur",
    async function () {

        const studentId =
            this.value.trim();


        const studentNameInput =
            document.getElementById(
                "attendanceStudentName"
            );


        if (!studentId) {

            studentNameInput.value = "";

            return;

        }


        try {

            const response =
                await fetch(
                    `${STUDENT_API}/${studentId}`
                );


            if (!response.ok) {

                studentNameInput.value =
                    "Student Not Found";

                return;

            }


            const student =
                await response.json();


            studentNameInput.value =
                student.studentName;


        } catch (error) {

            studentNameInput.value =
                "Error Fetching Student";

        }

    }
);


document
    .getElementById("attendanceForm")
    .addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const studentId =
                document
                    .getElementById(
                        "attendanceStudentId"
                    )
                    .value
                    .trim();


            const message =
                document.getElementById(
                    "attendanceMessage"
                );


            try {

                const response =
                    await fetch(
                        `${ATTENDANCE_API}/mark`,
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify({
                                    studentId: studentId
                                })

                        }
                    );


                const result =
                    await response.text();


                message.innerText = result;


                message.style.color =
                    response.ok
                        ? "green"
                        : "red";


                if (response.ok) {

                    document
                        .getElementById(
                            "attendanceForm"
                        )
                        .reset();

                }


            } catch (error) {

                message.innerText =
                    "Error Connecting to Server";

                message.style.color =
                    "red";

            }

        }
    );