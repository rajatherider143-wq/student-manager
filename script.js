
import { createClient } from
"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// 1. Supabase connection
const SUPABASE_URL = "https://eahaishqjcrdbjasqntk.supabase.co";

const SUPABASE_KEY = "sb_publishable_X66r0GXJjY1Um8ATNmjyFg_ikJm-kyn";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


// 2. HTML elements
const studentForm = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const totalStudents = document.getElementById("totalStudents");


// 3. Database se students lana
async function loadStudents() {

    const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error("Loading Error:", error.message);
        alert("Students load nahi hue!");
        return;
    }

    studentList.innerHTML = "";

    data.forEach(student => {

        const row = document.createElement("tr");

        const name = document.createElement("td");
        name.textContent = student.name;

        const email = document.createElement("td");
        email.textContent = student.email;

        const course = document.createElement("td");
        course.textContent = student.course;

        row.append(name, email, course);

        studentList.appendChild(row);

    });

    totalStudents.textContent = data.length;
}


// 4. Database mein student save karna
studentForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const course = document.getElementById("course").value;

    const { error } = await supabase
        .from("students")
        .insert([
            {
                name: name,
                email: email,
                course: course
            }
        ]);

    if (error) {

        alert("Error: " + error.message);
        console.error(error);
        return;

    }

    alert("Student database mein save ho gaya!");

    studentForm.reset();

    loadStudents();

});


// 5. Website open hote hi database se data lana
loadStudents();
