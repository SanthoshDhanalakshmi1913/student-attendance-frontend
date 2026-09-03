document
    .getElementById("studentForm")
    .addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const studentName =
                document
                    .getElementById("studentName")
                    .value
                    .trim();

            const department =
                document
                    .getElementById("department")
                    .value
                    .trim();


            const studentData = {

                studentName: studentName,

                department: department

            };


            const message =
                document.getElementById(
                    "studentMessage"
                );


            try {

                const response =
                    await fetch(
                        STUDENT_API,
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    studentData
                                )

                        }
                    );


                if (!response.ok) {

                    const errorText =
                        await response.text();

                    throw new Error(errorText);

                }


                const result =
                    await response.json();


                message.innerText =
                    "Student Registered Successfully";

                message.style.color =
                    "green";


                document
                    .getElementById(
                        "generatedStudentId"
                    )
                    .innerText =
                    result.studentId;


                document
                    .getElementById(
                        "generatedIdBox"
                    )
                    .style.display =
                    "block";


                document
                    .getElementById(
                        "studentForm"
                    )
                    .reset();


            } catch (error) {

                console.error(error);

                message.innerText =
                    "Student Registration Failed: "
                    + error.message;

                message.style.color =
                    "red";

            }

        }
    );