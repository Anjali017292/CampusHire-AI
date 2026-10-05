console.log("CampusHire AI loaded successfully!");


// =========================
// REGISTRATION
// =========================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const role =
            document.getElementById("role").value;


        // Check passwords

        if (password !== confirmPassword) {

            alert("Passwords do not match!");

            return;
        }


        // Create user object

        const user = {

            name: name,

            email: email,

            password: password,

            role: role

        };


        // Save user in LocalStorage

        localStorage.setItem(
            "campusUser",
            JSON.stringify(user)
        );


        alert("Registration successful!");

        window.location.href = "login.html";

    });

}

// =========================
// LOGIN
// =========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail").value;

        const password =
            document.getElementById("loginPassword").value;


        // Get registered user

        const storedUser =
            localStorage.getItem("campusUser");


        if (!storedUser) {

            alert("No account found. Please register first.");

            return;
        }


        const user =
            JSON.parse(storedUser);


        // Check login details

        if (
            email === user.email &&
            password === user.password
        ) {

            alert("Login successful!");

            window.location.href =
                "student-dashboard.html";

        } else {

            alert(
                "Incorrect email or password."
            );

        }

    });

}

// =========================
// SHOW STUDENT NAME
// =========================

const studentName = document.getElementById("studentName");
const welcomeName = document.getElementById("welcomeName");

const storedUser = localStorage.getItem("campusUser");

if (storedUser) {

    const user = JSON.parse(storedUser);

    if (studentName) {
        studentName.textContent = user.name;
    }

    if (welcomeName) {
        welcomeName.textContent = user.name;
    }

}

// =========================
// SAVE STUDENT PROFILE
// =========================

const profileForm = document.getElementById("profileForm");

if (profileForm) {

    const storedUser = localStorage.getItem("campusUser");

    if (storedUser) {

        const user = JSON.parse(storedUser);

        // Automatically fill name and email

        document.getElementById("profileName").value =
            user.name || "";

        document.getElementById("profileEmail").value =
            user.email || "";
    }


    profileForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const profileData = {

            name: document.getElementById("profileName").value,

            email: document.getElementById("profileEmail").value,

            phone: document.getElementById("phone").value,

            location: document.getElementById("location").value,

            college: document.getElementById("college").value,

            course: document.getElementById("course").value,

            graduationYear:
                document.getElementById("graduationYear").value,

            cgpa: document.getElementById("cgpa").value,

            skills: document.getElementById("skills").value,

            jobRole: document.getElementById("jobRole").value,

            preferredLocation:
                document.getElementById("preferredLocation").value

        };


        // Save profile

        localStorage.setItem(
            "studentProfile",
            JSON.stringify(profileData)
        );


        alert("Profile saved successfully!");


        // Go back to dashboard

        window.location.href =
            "student-dashboard.html";

    });

}

window.applyJob = function(title, company) {

    // Get existing applications
    let applications =
        JSON.parse(localStorage.getItem("applications")) || [];

    // Check if already applied
    const alreadyApplied = applications.some(application =>
        application.title === title &&
        application.company === company
    );

    if (alreadyApplied) {

        alert("You have already applied for this job.");

        return;
    }


    // Create new application
    const newApplication = {

        title: title,

        company: company,

        status: "Applied",

        date: new Date().toLocaleDateString()

    };


    // Save application
    applications.push(newApplication);

    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );


    alert("Application submitted successfully!");


    // Open My Applications
    window.location.href = "my-applications.html";

};

// =============================
// SHOW MY APPLICATIONS
// =============================

const applicationsList =
    document.getElementById("applicationsList");

if (applicationsList) {

    const applications =
        JSON.parse(localStorage.getItem("applications")) || [];


    if (applications.length === 0) {

        applicationsList.innerHTML = `
            <div class="no-applications">
                <h3>No Applications Yet</h3>
                <p>You have not applied for any job yet.</p>
            </div>
        `;

    } else {

        applications.forEach(application => {

            const applicationCard =
                document.createElement("div");

            applicationCard.className =
                "application-card";

            applicationCard.innerHTML = `

                <div class="application-details">

                    <h2>
                        ${application.title}
                    </h2>

                    <div class="application-company">
                        ${application.company}
                    </div>

                    <div class="application-info">

                        <span>
                            📅 Applied: ${application.date}
                        </span>

                    </div>

                </div>


                <div class="application-status">

                    <span class="status-label">
                        ${application.status}
                    </span>

                </div>

            `;

            applicationsList.appendChild(applicationCard);

        });

    }

}

// =============================
// DASHBOARD DYNAMIC STATS
// =============================

const jobsAppliedElement =
    document.getElementById("jobsApplied");

const shortlistedElement =
    document.getElementById("shortlisted");

const interviewElement =
    document.getElementById("interview");

const aiMatchElement =
    document.getElementById("aiMatch");


if (
    jobsAppliedElement ||
    shortlistedElement ||
    interviewElement ||
    aiMatchElement
) {

    // Get applications
    const applications =
        JSON.parse(localStorage.getItem("applications")) || [];


    // Jobs Applied
    if (jobsAppliedElement) {

        jobsAppliedElement.textContent =
            applications.length;

    }


    // Shortlisted
    if (shortlistedElement) {

        const shortlistedCount =
            applications.filter(
                application =>
                    application.status === "Shortlisted"
            ).length;

        shortlistedElement.textContent =
            shortlistedCount;

    }


    // Interview
    if (interviewElement) {

        const interviewCount =
            applications.filter(
                application =>
                    application.status === "Interview"
            ).length;

        interviewElement.textContent =
            interviewCount;

    }


    // AI Match
    if (aiMatchElement) {

        const profile =
            JSON.parse(
                localStorage.getItem("studentProfile")
            );


        if (profile && profile.skills) {

            const studentSkills =
                profile.skills
                    .toLowerCase()
                    .split(",")
                    .map(skill => skill.trim());


           const jobs = [

    {
        title: "Software Engineer",
        company: "Infosys",
        location: "Noida",
        role: "Web Developer",
        package: "₹4 - 7 LPA",
        skills: ["HTML", "CSS", "JavaScript", "Python"]
    },

    {
        title: "Web Developer",
        company: "TCS",
        location: "Delhi",
        role: "Web Developer",
        package: "₹4 - 6 LPA",
        skills: ["HTML", "CSS", "JavaScript", "PHP"]
    },

    {
        title: "Python Developer",
        company: "Wipro",
        location: "Gurugram",
        role: "Python Developer",
        package: "₹5 - 8 LPA",
        skills: ["Python", "MySQL", "Flask"]
    },

    {
        title: "Frontend Developer",
        company: "Accenture",
        location: "Bangalore",
        role: "Frontend Developer",
        package: "₹4 - 7 LPA",
        skills: ["HTML", "CSS", "JavaScript", "React"]
    },

    {
        title: "Java Developer",
        company: "HCLTech",
        location: "Noida",
        role: "Java Developer",
        package: "₹5 - 8 LPA",
        skills: ["Java", "MySQL", "Spring"]
    },

    {
        title: "Data Analyst",
        company: "Cognizant",
        location: "Pune",
        role: "Data Analyst",
        package: "₹4 - 7 LPA",
        skills: ["Python", "SQL", "Excel", "Power BI"]
    },

    {
        title: "Web Developer",
        company: "Tech Mahindra",
        location: "Noida",
        role: "Web Developer",
        package: "₹4 - 6 LPA",
        skills: ["HTML", "CSS", "JavaScript", "PHP"]
    },

    {
        title: "Python Developer",
        company: "Capgemini",
        location: "Gurugram",
        role: "Python Developer",
        package: "₹5 - 7 LPA",
        skills: ["Python", "SQL", "Flask"]
    }

];

            let totalMatch = 0;


            jobs.forEach(job => {

                let matchedSkills = 0;

                job.skills.forEach(skill => {

                    if (
                        studentSkills.includes(skill)
                    ) {
                        matchedSkills++;
                    }

                });


                const match =
                    (matchedSkills /
                    job.skills.length) * 100;


                totalMatch += match;

            });


            const averageMatch =
                Math.round(
                    totalMatch / jobs.length
                );


            aiMatchElement.textContent =
                averageMatch + "%";

        } else {

            aiMatchElement.textContent =
                "0%";

        }

    }

}

// =============================
// SHOW JOBS
// =============================

const jobsList = document.getElementById("jobsList");

if (jobsList) {

    const jobs = [

        {
            title: "Software Engineer",
            company: "Infosys",
            location: "Noida",
            role: "Web Developer",
            package: "₹4 - 7 LPA",
            skills: ["HTML", "CSS", "JavaScript", "Python"]
        },

        {
            title: "Web Developer",
            company: "TCS",
            location: "Delhi",
            role: "Web Developer",
            package: "₹4 - 6 LPA",
            skills: ["HTML", "CSS", "JavaScript", "PHP"]
        },

        {
            title: "Python Developer",
            company: "Wipro",
            location: "Gurugram",
            role: "Python Developer",
            package: "₹5 - 8 LPA",
            skills: ["Python", "MySQL", "Flask"]
        },

        {
            title: "Frontend Developer",
            company: "Accenture",
            location: "Bangalore",
            role: "Frontend Developer",
            package: "₹4 - 7 LPA",
            skills: ["HTML", "CSS", "JavaScript", "React"]
        },

        {
            title: "Java Developer",
            company: "HCLTech",
            location: "Noida",
            role: "Java Developer",
            package: "₹5 - 8 LPA",
            skills: ["Java", "MySQL", "Spring"]
        },

        {
            title: "Data Analyst",
            company: "Cognizant",
            location: "Pune",
            role: "Data Analyst",
            package: "₹4 - 7 LPA",
            skills: ["Python", "SQL", "Excel", "Power BI"]
        }

    ];


    jobs.forEach(job => {

        const jobCard = document.createElement("div");

        jobCard.className = "job-card";

        jobCard.innerHTML = `

            <div class="job-card-content">

                <h2>${job.title}</h2>

                <h3>${job.company}</h3>

                <p>📍 ${job.location}</p>

                <p>💼 ${job.role}</p>

                <p>💰 ${job.package}</p>

                <p>
                    <strong>Skills:</strong>
                    ${job.skills.join(", ")}
                </p>

                <div class="job-buttons">

    <button
        onclick="viewJob('${job.title}')"
    >
        View Details
    </button>

    <button
        onclick="applyJob('${job.title}', '${job.company}')"
    >
        Apply Now
    </button>

</div>

            </div>

        `;

        jobsList.appendChild(jobCard);

    });

}

// =============================
// JOB SEARCH & FILTER
// =============================

const searchJob = document.getElementById("searchJob");
const locationFilter = document.getElementById("locationFilter");
const roleFilter = document.getElementById("roleFilter");

function filterJobs() {

    const searchValue =
        searchJob.value.toLowerCase().trim();

    const locationValue =
        locationFilter.value;

    const roleValue =
        roleFilter.value;


    const jobCards =
        document.querySelectorAll(".job-card");


    jobCards.forEach(card => {

        const jobText =
            card.textContent.toLowerCase();

        const locationMatch =
            !locationValue ||
            jobText.includes(locationValue.toLowerCase());

        const roleMatch =
            !roleValue ||
            jobText.includes(roleValue.toLowerCase());

        const searchMatch =
            !searchValue ||
            jobText.includes(searchValue);


        if (
            locationMatch &&
            roleMatch &&
            searchMatch
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


// Search while typing
if (searchJob) {

    searchJob.addEventListener(
        "input",
        filterJobs
    );

}


// Location filter
if (locationFilter) {

    locationFilter.addEventListener(
        "change",
        filterJobs
    );

}


// Role filter
if (roleFilter) {

    roleFilter.addEventListener(
        "change",
        filterJobs
    );

}

// =============================
// VIEW JOB DETAILS
// =============================

window.viewJob = function(title) {

    localStorage.setItem("selectedJob", title);

    window.location.href = "job-details.html";

};

// =============================
// SHOW JOB DETAILS
// =============================

const jobDetails =
    document.getElementById("jobDetails");

if (jobDetails) {

    const selectedJob =
        localStorage.getItem("selectedJob");


    const jobs = [

        {
            title: "Software Engineer",
            company: "Infosys",
            location: "Noida",
            role: "Web Developer",
            package: "₹4 - 7 LPA",
            skills: ["HTML", "CSS", "JavaScript", "Python"],
            eligibility: "BCA / MCA / B.Tech",
            description:
                "Work on web applications, develop new features and solve technical problems."
        },

        {
            title: "Web Developer",
            company: "TCS",
            location: "Delhi",
            role: "Web Developer",
            package: "₹4 - 6 LPA",
            skills: ["HTML", "CSS", "JavaScript", "PHP"],
            eligibility: "BCA / MCA / B.Tech",
            description:
                "Develop and maintain responsive websites and web applications."
        },

        {
            title: "Python Developer",
            company: "Wipro",
            location: "Gurugram",
            role: "Python Developer",
            package: "₹5 - 8 LPA",
            skills: ["Python", "MySQL", "Flask"],
            eligibility: "BCA / MCA / B.Tech",
            description:
                "Develop Python-based applications and work with databases and backend technologies."
        },

        {
            title: "Frontend Developer",
            company: "Accenture",
            location: "Bangalore",
            role: "Frontend Developer",
            package: "₹4 - 7 LPA",
            skills: ["HTML", "CSS", "JavaScript", "React"],
            eligibility: "BCA / MCA / B.Tech",
            description:
                "Build responsive and interactive user interfaces using modern frontend technologies."
        },

        {
            title: "Java Developer",
            company: "HCLTech",
            location: "Noida",
            role: "Java Developer",
            package: "₹5 - 8 LPA",
            skills: ["Java", "MySQL", "Spring"],
            eligibility: "BCA / MCA / B.Tech",
            description:
                "Develop Java applications and work with backend systems and databases."
        },

        {
            title: "Data Analyst",
            company: "Cognizant",
            location: "Pune",
            role: "Data Analyst",
            package: "₹4 - 7 LPA",
            skills: ["Python", "SQL", "Excel", "Power BI"],
            eligibility: "BCA / MCA / B.Tech",
            description:
                "Analyze data, create reports and dashboards, and generate useful business insights."
        }

    ];


    const job =
        jobs.find(job => job.title === selectedJob);


    if (job) {

        jobDetails.innerHTML = `

            <div class="job-detail-card">

                <h1>${job.title}</h1>

                <h2>${job.company}</h2>

                <div class="job-detail-info">

                    <p>📍 <strong>Location:</strong>
                        ${job.location}
                    </p>

                    <p>💼 <strong>Role:</strong>
                        ${job.role}
                    </p>

                    <p>💰 <strong>Package:</strong>
                        ${job.package}
                    </p>

                </div>


                <hr>


                <h3>Required Skills</h3>

                <p>
                    ${job.skills.join(" • ")}
                </p>


                <h3>Eligibility</h3>

                <p>
                    ${job.eligibility}
                </p>


                <h3>Job Description</h3>

                <p>
                    ${job.description}
                </p>


                <button
                    onclick="applyJob('${job.title}', '${job.company}')"
                >
                    Apply Now
                </button>

            </div>

        `;

    } else {

        jobDetails.innerHTML = `

            <div class="no-applications">

                <h2>Job Not Found</h2>

                <p>Please go back and select a job.</p>

                <a href="jobs.html">
                    Back to Jobs
                </a>

            </div>

        `;

    }

}

// =============================
// RESUME ANALYZER
// =============================

const resumeFile = document.getElementById("resumeFile");
const fileName = document.getElementById("fileName");
const analyzeResumeBtn = document.getElementById("analyzeResumeBtn");
const resumeResults = document.getElementById("resumeResults");


// File select hone par filename show hoga
if (resumeFile) {

    resumeFile.addEventListener("change", function () {

        if (resumeFile.files.length > 0) {

            fileName.textContent =
                resumeFile.files[0].name;

        } else {

            fileName.textContent =
                "No file selected";

        }

    });

}


// Analyze button
if (analyzeResumeBtn) {

    analyzeResumeBtn.addEventListener("click", function () {

        // Resume select nahi kiya
        if (!resumeFile || resumeFile.files.length === 0) {

            alert("Please select your resume first.");
            return;

        }


        // Loading state
        analyzeResumeBtn.textContent =
            "Analyzing...";

        analyzeResumeBtn.disabled = true;


        // Demo analysis
        setTimeout(function () {

            document.getElementById("resumeScore").textContent =
                "78%";


            document.getElementById("skillsFound").innerHTML = `
                <span>HTML</span> •
                <span>CSS</span> •
                <span>JavaScript</span> •
                <span>Python</span> •
                <span>MySQL</span>
            `;


            document.getElementById("missingSkills").innerHTML = `
                React • Git • REST API
            `;


            document.getElementById("resumeStrengths").innerHTML = `
                Strong technical skills<br>
                Good project experience<br>
                Relevant educational background
            `;


            document.getElementById("resumeImprovements").innerHTML = `
                Add measurable project achievements<br>
                Improve resume summary<br>
                Add more role-specific keywords
            `;


            document.getElementById("atsKeywords").innerHTML = `
                <span>JavaScript</span>
                <span>Python</span>
                <span>HTML</span>
                <span>CSS</span>
                <span>MySQL</span>
                <span>Web Development</span>
            `;


            // Show results
            resumeResults.style.display =
                "block";


            // Reset button
            analyzeResumeBtn.textContent =
                "Analyze Resume";

            analyzeResumeBtn.disabled =
                false;


            // Scroll to results
            resumeResults.scrollIntoView({
                behavior: "smooth"
            });

        }, 1200);

    });

}

// =============================
// SKILL GAP ANALYZER
// =============================

const targetRole = document.getElementById("targetRole");
const analyzeSkillsBtn = document.getElementById("analyzeSkillsBtn");
const skillGapResults = document.getElementById("skillGapResults");

if (analyzeSkillsBtn) {

    analyzeSkillsBtn.addEventListener("click", function () {

        const selectedRole = targetRole.value;

        if (!selectedRole) {
            alert("Please select a target job role.");
            return;
        }


        // Student profile se skills lena
        const savedProfile =
            JSON.parse(localStorage.getItem("studentProfile")) || {};

        const studentSkills = savedProfile.skills
            ? savedProfile.skills
                .toLowerCase()
                .split(",")
                .map(skill => skill.trim())
                .filter(skill => skill !== "")
            : [];


        // Required skills for each role
        const roleSkills = {

            "Web Developer": [
                "HTML",
                "CSS",
                "JavaScript",
                "PHP",
                "MySQL"
            ],

            "Frontend Developer": [
                "HTML",
                "CSS",
                "JavaScript",
                "React",
                "Git"
            ],

            "Python Developer": [
                "Python",
                "MySQL",
                "Flask",
                "Git",
                "REST API"
            ],

            "Java Developer": [
                "Java",
                "MySQL",
                "Spring",
                "Git",
                "REST API"
            ],

            "Data Analyst": [
                "Python",
                "SQL",
                "Excel",
                "Power BI",
                "Pandas"
            ]

        };


        const requiredSkills =
            roleSkills[selectedRole];


        // Current skills
        const currentSkills = requiredSkills.filter(skill =>
            studentSkills.includes(skill.toLowerCase())
        );


        // Missing skills
        const missingSkills = requiredSkills.filter(skill =>
            !studentSkills.includes(skill.toLowerCase())
        );


        // Match percentage
        const matchPercentage =
            Math.round(
                (currentSkills.length / requiredSkills.length) * 100
            );


        // Show current skills
        const currentSkillsElement =
            document.getElementById("currentSkills");

        if (currentSkills.length > 0) {

            currentSkillsElement.innerHTML =
                currentSkills.map(skill =>
                    `<span class="current-skill">${skill}</span>`
                ).join("");

        } else {

            currentSkillsElement.innerHTML =
                `<p>No matching skills found.</p>`;

        }


        // Show missing skills
        const missingSkillsElement =
            document.getElementById("missingSkills");

        if (missingSkills.length > 0) {

            missingSkillsElement.innerHTML =
                missingSkills.map(skill =>
                    `<span class="missing-skill">${skill}</span>`
                ).join("");

        } else {

            missingSkillsElement.innerHTML =
                `<p>You have all required skills!</p>`;

        }


        // Show percentage
        document.getElementById(
            "skillMatchPercentage"
        ).textContent =
            matchPercentage + "%";


        // Learning recommendation
        document.getElementById(
            "learningMessage"
        ).innerHTML =
            missingSkills.length > 0
                ? `For the <strong>${selectedRole}</strong> role, consider learning: <strong>${missingSkills.join(", ")}</strong>.`
                : `Great! Your current skills cover the basic requirements for the <strong>${selectedRole}</strong> role.`;


        // Show results
        skillGapResults.style.display = "block";


        // Scroll to results
        skillGapResults.scrollIntoView({
            behavior: "smooth"
        });

    });

}

// =============================
// AI INTERVIEW
// =============================

const interviewRole = document.getElementById("interviewRole");
const startInterviewBtn = document.getElementById("startInterviewBtn");
const interviewSetup = document.getElementById("interviewSetup");
const interviewSection = document.getElementById("interviewSection");
const interviewResult = document.getElementById("interviewResult");

const interviewQuestion =
    document.getElementById("interviewQuestion");

const interviewAnswer =
    document.getElementById("interviewAnswer");

const nextQuestionBtn =
    document.getElementById("nextQuestionBtn");

const questionNumber =
    document.getElementById("questionNumber");


// Interview questions

const interviewQuestions = {

    "Web Developer": [
        "Tell me about yourself and your web development experience.",
        "What is the difference between HTML and CSS?",
        "What is JavaScript and why is it used?",
        "What is PHP used for in web development?",
        "Tell me about a web development project you have worked on."
    ],

    "Frontend Developer": [
        "Tell me about yourself.",
        "What is the difference between HTML, CSS and JavaScript?",
        "What is responsive web design?",
        "What is the DOM in JavaScript?",
        "Why is React used in frontend development?"
    ],

    "Python Developer": [
        "Tell me about yourself and your Python experience.",
        "What are the main features of Python?",
        "What is the difference between a list and a tuple?",
        "What is Flask?",
        "Tell me about a Python project you have worked on."
    ],

    "Java Developer": [
        "Tell me about yourself and your Java experience.",
        "What are the main principles of OOP?",
        "What is the difference between a class and an object?",
        "What is inheritance in Java?",
        "Tell me about a Java project you have worked on."
    ],

    "Data Analyst": [
        "Tell me about yourself and your interest in data analytics.",
        "What is the difference between SQL and Excel?",
        "What is data cleaning?",
        "What is Power BI used for?",
        "Tell me about a data analysis project you have worked on."
    ]

};


let currentQuestion = 0;
let selectedInterviewRole = "";


// Start Interview

if (startInterviewBtn) {

    startInterviewBtn.addEventListener("click", function () {

        selectedInterviewRole = interviewRole.value;

        if (!selectedInterviewRole) {

            alert("Please select a job role first.");
            return;

        }

        currentQuestion = 0;

        interviewSetup.style.display = "none";
        interviewSection.style.display = "block";
        interviewResult.style.display = "none";

        showInterviewQuestion();

    });

}


// Show Question

function showInterviewQuestion() {

    const questions =
        interviewQuestions[selectedInterviewRole];

    interviewQuestion.textContent =
        questions[currentQuestion];

    interviewAnswer.value = "";

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    if (currentQuestion === questions.length - 1) {

        nextQuestionBtn.textContent =
            "Finish Interview";

    } else {

        nextQuestionBtn.textContent =
            "Next Question";

    }

}


// Next Question

if (nextQuestionBtn) {

    nextQuestionBtn.addEventListener("click", function () {

        if (interviewAnswer.value.trim() === "") {

            alert("Please write your answer first.");
            return;

        }


        const questions =
            interviewQuestions[selectedInterviewRole];


        if (currentQuestion < questions.length - 1) {

            currentQuestion++;

            showInterviewQuestion();

        } else {

            finishInterview();

        }

    });

}


// Finish Interview

function finishInterview() {

    interviewSection.style.display = "none";
    interviewResult.style.display = "block";


    // Basic demo score
    const score =
        Math.floor(Math.random() * 21) + 70;


    document.getElementById(
        "interviewScore"
    ).textContent = score + "%";


    interviewResult.scrollIntoView({
        behavior: "smooth"
    });

}
