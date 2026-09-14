// ============================================================
// LEDGERX - COMPLETE PROTOTYPE JAVASCRIPT
// ============================================================

export function initLegacyApp() {

    // ========================================================
    // GLOBAL PAGE INFORMATION
    // ========================================================

    const pageName =
        ({"/":"/","/index.html":"/"}[window.location.pathname] || (window.location.pathname.split("/").filter(Boolean).pop() + ".html"));

    const isDashboardPage =
        document.body.classList.contains("dashboard-page");

    const isLoginPage =
        document.body.classList.contains("login-page");

    const isRegisterPage =
        document.body.classList.contains("register-page");

    const isOnboardingPage =
        document.body.classList.contains("onboarding-page");


    // ========================================================
    // HELPER FUNCTIONS
    // ========================================================

    function formatINR(value) {

        value = Number(value) || 0;

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0
            }
        ).format(value);

    }


    function getUser() {

        try {

            return JSON.parse(
                localStorage.getItem("ledgerXUser")
            );

        } catch (error) {

            return null;

        }

    }


    function getFinancialProfile() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "ledgerXFinancialProfile"
                )
            );

        } catch (error) {

            return null;

        }

    }


    function saveFinancialProfile(profile) {

        localStorage.setItem(
            "ledgerXFinancialProfile",
            JSON.stringify(profile)
        );

    }


    function isLoggedIn() {

        return (
            localStorage.getItem(
                "ledgerXLoggedIn"
            ) === "true"
        );

    }


    function calculateFinancialHealth(profile) {

        if (!profile || profile.monthlyIncome <= 0) {

            return 0;

        }

        let score = 50;

        const savingsRate =
            profile.savingsRate || 0;

        if (savingsRate >= 50) {

            score += 25;

        } else if (savingsRate >= 30) {

            score += 18;

        } else if (savingsRate >= 20) {

            score += 10;

        } else if (savingsRate < 10) {

            score -= 15;

        }


        const emergencyMonths =
            profile.totalMonthlyExpenses > 0
                ?
                profile.savings /
                profile.totalMonthlyExpenses
                :
                0;


        if (emergencyMonths >= 6) {

            score += 15;

        } else if (emergencyMonths >= 3) {

            score += 8;

        }


        const debtRatio =
            profile.monthlyIncome > 0
                ?
                profile.emi /
                profile.monthlyIncome
                :
                0;


        if (debtRatio > 0.4) {

            score -= 20;

        } else if (debtRatio > 0.25) {

            score -= 10;

        } else if (debtRatio < 0.15) {

            score += 10;

        }


        return Math.max(
            0,
            Math.min(
                100,
                Math.round(score)
            )
        );

    }


    // ========================================================
    // REGISTER PAGE
    // ========================================================

    if (isRegisterPage) {

        const registerForm =
            document.querySelector(
                ".register-card form"
            );

        const nameInput =
            document.getElementById("name");

        const emailInput =
            document.getElementById("email");

        const passwordInput =
            document.getElementById("password");

        const confirmPasswordInput =
            document.getElementById(
                "confirm-password"
            );


        if (registerForm) {

            registerForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const name =
                        nameInput.value.trim();

                    const email =
                        emailInput.value
                            .trim()
                            .toLowerCase();

                    const password =
                        passwordInput.value;

                    const confirmPassword =
                        confirmPasswordInput.value;


                    if (
                        !name ||
                        !email ||
                        !password ||
                        !confirmPassword
                    ) {

                        alert(
                            "Please fill in all fields."
                        );

                        return;

                    }


                    if (name.length < 2) {

                        alert(
                            "Please enter your full name."
                        );

                        return;

                    }


                    if (password.length < 6) {

                        alert(
                            "Password must contain at least 6 characters."
                        );

                        return;

                    }


                    if (
                        password !==
                        confirmPassword
                    ) {

                        alert(
                            "Passwords do not match."
                        );

                        return;

                    }


                    const existingUser =
                        getUser();


                    if (
                        existingUser &&
                        existingUser.email === email
                    ) {

                        alert(
                            "An account already exists with this email."
                        );

                        return;

                    }


                    const newUser = {

                        name: name,
                        email: email,
                        password: password,
                        phone: "",
                        currency: "INR",
                        createdAt:
                            new Date().toISOString()

                    };


                    localStorage.setItem(
                        "ledgerXUser",
                        JSON.stringify(newUser)
                    );


                    localStorage.removeItem(
                        "ledgerXFinancialProfile"
                    );


                    alert(
                        "Account created successfully!"
                    );


                    window.location.href =
                        "/login";

                }
            );

        }


        const googleRegister =
            document.querySelector(
                ".google-register"
            );


        if (googleRegister) {

            googleRegister.addEventListener(
                "click",
                function () {

                    alert(
                        "Google authentication will be connected when the backend authentication system is added."
                    );

                }
            );

        }

    }



    // ========================================================
    // LOGIN PAGE
    // ========================================================

    if (isLoginPage) {

        const loginForm =
            document.querySelector(
                ".login-card form"
            );

        const emailInput =
            document.getElementById("email");

        const passwordInput =
            document.getElementById(
                "password"
            );

        const rememberCheckbox =
            document.querySelector(
                ".remember-me input"
            );


        const rememberedEmail =
            localStorage.getItem(
                "ledgerXRememberEmail"
            );


        if (
            rememberedEmail &&
            emailInput
        ) {

            emailInput.value =
                rememberedEmail;

            if (rememberCheckbox) {

                rememberCheckbox.checked =
                    true;

            }

        }


        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const email =
                        emailInput.value
                            .trim()
                            .toLowerCase();

                    const password =
                        passwordInput.value;


                    const user =
                        getUser();


                    if (!user) {

                        alert(
                            "No LedgerX account found. Please create an account first."
                        );

                        return;

                    }


                    if (
                        user.email !== email ||
                        user.password !== password
                    ) {

                        alert(
                            "Incorrect email or password."
                        );

                        return;

                    }


                    localStorage.setItem(
                        "ledgerXLoggedIn",
                        "true"
                    );


                    if (
                        rememberCheckbox &&
                        rememberCheckbox.checked
                    ) {

                        localStorage.setItem(
                            "ledgerXRememberEmail",
                            email
                        );

                    } else {

                        localStorage.removeItem(
                            "ledgerXRememberEmail"
                        );

                    }


                    const profile =
                        getFinancialProfile();


                    if (profile) {

                        window.location.href =
                            "/dashboard";

                    } else {

                        window.location.href =
                            "/onboarding";

                    }

                }
            );

        }


        const forgotPassword =
            document.querySelector(
                ".password-label a"
            );


        if (forgotPassword) {

            forgotPassword.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const user =
                        getUser();


                    if (!user) {

                        alert(
                            "No registered account was found."
                        );

                        return;

                    }


                    alert(
                        "Password reset email functionality will be connected when backend authentication is implemented."
                    );

                }
            );

        }


        const googleLogin =
            document.querySelector(
                ".google-login"
            );


        if (googleLogin) {

            googleLogin.addEventListener(
                "click",
                function () {

                    alert(
                        "Google authentication will be connected during backend integration."
                    );

                }
            );

        }

    }



    // ========================================================
    // ONBOARDING PAGE
    // ========================================================

    if (isOnboardingPage) {

        if (!isLoggedIn()) {

            window.location.href =
                "/login";

            return;

        }


        const form =
            document.querySelector(
                ".onboarding-card form"
            );


        if (form) {

            form.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const age =
                        Number(
                            document.getElementById(
                                "age"
                            ).value
                        );


                    const occupation =
                        document.getElementById(
                            "occupation"
                        ).value;


                    const income =
                        Number(
                            document.getElementById(
                                "income"
                            ).value
                        ) || 0;


                    const living =
                        Number(
                            document.getElementById(
                                "living"
                            ).value
                        ) || 0;


                    const otherExpenses =
                        Number(
                            document.getElementById(
                                "other-expenses"
                            ).value
                        ) || 0;


                    const savings =
                        Number(
                            document.getElementById(
                                "savings"
                            ).value
                        ) || 0;


                    const investments =
                        Number(
                            document.getElementById(
                                "investments"
                            ).value
                        ) || 0;


                    const loans =
                        Number(
                            document.getElementById(
                                "loans"
                            ).value
                        ) || 0;


                    const emiElement =
                        document.getElementById(
                            "emi"
                        );


                    const emi =
                        emiElement
                            ?
                            Number(
                                emiElement.value
                            ) || 0
                            :
                            0;


                    if (
                        !age ||
                        age < 18 ||
                        age > 100
                    ) {

                        alert(
                            "Please enter a valid age."
                        );

                        return;

                    }


                    if (!occupation) {

                        alert(
                            "Please select your occupation."
                        );

                        return;

                    }


                    if (income <= 0) {

                        alert(
                            "Please enter your monthly income."
                        );

                        return;

                    }


                    const goals = [];


                    document
                        .querySelectorAll(
                            'input[name="goal"]:checked'
                        )
                        .forEach(
                            function (goal) {

                                const text =
                                    goal.parentElement
                                        .querySelector(
                                            "span"
                                        )
                                        .textContent
                                        .trim();

                                goals.push(text);

                            }
                        );


                    const totalExpenses =
                        living +
                        otherExpenses +
                        emi;


                    const monthlySavings =
                        income -
                        totalExpenses;


                    const totalAssets =
                        savings +
                        investments;


                    const netWorth =
                        totalAssets -
                        loans;


                    const savingsRate =
                        income > 0
                            ?
                            (
                                monthlySavings /
                                income
                            ) * 100
                            :
                            0;


                    const profile = {

                        age,
                        occupation,

                        monthlyIncome:
                            income,

                        livingExpenses:
                            living,

                        otherExpenses,

                        totalMonthlyExpenses:
                            totalExpenses,

                        savings,

                        investments,

                        loans,

                        emi,

                        totalAssets,

                        netWorth,

                        monthlySavings,

                        savingsRate,

                        goals,

                        onboardingCompleted:
                            true,

                        createdAt:
                            new Date().toISOString()

                    };


                    saveFinancialProfile(
                        profile
                    );


                    alert(
                        "Your Financial Twin has been created!"
                    );


                    window.location.href =
                        "/dashboard";

                }
            );

        }

    }



    // ========================================================
    // PROTECT ALL INTERNAL DASHBOARD PAGES
    // ========================================================

    if (isDashboardPage) {

        if (
            pageName !== "admin.html" &&
            !isLoggedIn()
        ) {

            alert(
                "Please sign in to access LedgerX."
            );


            /*
            Most dashboard files appear to be
            inside the same pages folder.
            */

            window.location.href =
                "/login";

            return;

        }


        // ====================================================
        // NOTIFICATION BUTTON
        // ====================================================

        const notification =
            document.querySelector(
                ".notification"
            );


        if (notification) {

            notification.style.cursor =
                "pointer";


            notification.addEventListener(
                "click",
                function () {

                    alert(
                        "🔔 No new LedgerX notifications."
                    );

                }
            );

        }



        // ====================================================
        // LOGOUT
        // ====================================================

        const logoutButton =
            document.querySelector(
                ".logout-link"
            );


        if (logoutButton) {

            logoutButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const confirmed =
                        confirm(
                            "Are you sure you want to log out?"
                        );


                    if (!confirmed) {

                        return;

                    }


                    localStorage.removeItem(
                        "ledgerXLoggedIn"
                    );


                    /*
                    Registered account and financial
                    profile are intentionally preserved.
                    */

                    const href =
                        logoutButton.getAttribute(
                            "href"
                        );


                    window.location.href =
                        href || "/";

                }
            );

        }



        // ====================================================
        // SIDEBAR ACTIVE LINK
        // ====================================================

        const sidebarLinks =
            document.querySelectorAll(
                ".sidebar-link"
            );


        sidebarLinks.forEach(
            function (link) {

                const href =
                    link.getAttribute("href");


                if (
                    href === pageName
                ) {

                    sidebarLinks.forEach(
                        function (item) {

                            if (
                                !item
                                    .getAttribute(
                                        "href"
                                    )
                                    .startsWith("#")
                            ) {

                                item.classList.remove(
                                    "active"
                                );

                            }

                        }
                    );


                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }



    // ========================================================
    // DASHBOARD
    // ========================================================

    if (pageName === "/dashboard") {

        const user =
            getUser();

        const profile =
            getFinancialProfile();


        if (!profile) {

            window.location.href =
                "/onboarding";

            return;

        }


        // ====================================================
        // DATE
        // ====================================================

        const dateElement =
            document.querySelector(
                ".dashboard-date"
            );


        if (dateElement) {

            dateElement.textContent =
                new Date()
                    .toLocaleDateString(
                        "en-IN",
                        {
                            weekday:
                                "long",

                            year:
                                "numeric",

                            month:
                                "long",

                            day:
                                "numeric"
                        }
                    )
                    .toUpperCase();

        }



        // ====================================================
        // GREETING
        // ====================================================

        const heading =
            document.querySelector(
                ".dashboard-header h1"
            );


        if (heading && user) {

            const firstName =
                user.name.split(" ")[0];


            const hour =
                new Date().getHours();


            let greeting =
                "Good evening";


            if (hour < 12) {

                greeting =
                    "Good morning";

            } else if (hour < 17) {

                greeting =
                    "Good afternoon";

            }


            heading.innerHTML =
                `${greeting}, <span>${firstName}.</span> 👋`;

        }



        // ====================================================
        // DASHBOARD SUMMARY VALUES
        // ====================================================

        const cards =
            document.querySelectorAll(
                ".dashboard-summary .summary-card"
            );


        const health =
            calculateFinancialHealth(
                profile
            );


        if (cards[0]) {

            cards[0]
                .querySelector("h2")
                .textContent =
                formatINR(
                    profile.netWorth
                );

        }


        if (cards[1]) {

            cards[1]
                .querySelector("h2")
                .textContent =
                formatINR(
                    profile.monthlyIncome
                );

        }


        if (cards[2]) {

            cards[2]
                .querySelector("h2")
                .textContent =
                formatINR(
                    profile.totalMonthlyExpenses
                );


            const ratio =
                profile.monthlyIncome > 0
                    ?
                    (
                        profile.totalMonthlyExpenses /
                        profile.monthlyIncome
                    ) * 100
                    :
                    0;


            const text =
                cards[2].querySelector("p");


            if (text) {

                text.textContent =
                    ratio.toFixed(1) +
                    "% of income";

            }

        }


        if (cards[3]) {

            const healthNumber =
                cards[3].querySelector(
                    ".health-number"
                );


            if (healthNumber) {

                healthNumber.innerHTML =
                    `${health}<small>/100</small>`;

            }


            const bar =
                cards[3].querySelector(
                    ".dashboard-progress div"
                );


            if (bar) {

                bar.style.width =
                    health + "%";

            }

        }



        // ====================================================
        // CHART PERIOD
        // ====================================================

        const chartSelect =
            document.querySelector(
                ".chart-panel select"
            );


        if (chartSelect) {

            chartSelect.addEventListener(
                "change",
                function () {

                    const chartAmount =
                        document.querySelector(
                            ".chart-panel .panel-header h2"
                        );


                    if (!chartAmount) {

                        return;

                    }


                    if (
                        this.value ===
                        "Last 6 months"
                    ) {

                        chartAmount.textContent =
                            formatINR(
                                profile.netWorth *
                                0.93
                            );

                    } else {

                        chartAmount.textContent =
                            formatINR(
                                profile.netWorth
                            );

                    }

                }
            );

        }

    }



    // ========================================================
    // FINANCES PAGE
    // ========================================================

    if (pageName === "finances.html") {

        const profile =
            getFinancialProfile();


        if (!profile) {

            window.location.href =
                "/onboarding";

            return;

        }


        const cards =
            document.querySelectorAll(
                ".dashboard-summary .summary-card"
            );


        if (cards[0]) {

            cards[0]
                .querySelector("h2")
                .textContent =
                formatINR(
                    profile.savings
                );

        }


        if (cards[1]) {

            cards[1]
                .querySelector("h2")
                .textContent =
                formatINR(
                    profile.totalAssets
                );

        }


        if (cards[2]) {

            cards[2]
                .querySelector("h2")
                .textContent =
                formatINR(
                    profile.loans
                );

        }


        if (cards[3]) {

            cards[3]
                .querySelector("h2")
                .textContent =
                formatINR(
                    profile.monthlySavings
                );

        }


        const panels =
            document.querySelectorAll(
                ".dashboard-grid .dashboard-panel"
            );


        if (panels[0]) {

            const totalIncome =
                panels[0].querySelector(
                    ".panel-header .positive"
                );


            if (totalIncome) {

                totalIncome.textContent =
                    "+" +
                    formatINR(
                        profile.monthlyIncome
                    ) +
                    " / mo";

            }

        }


        if (panels[1]) {

            const expenses =
                panels[1].querySelector(
                    ".panel-header .expense-text"
                );


            if (expenses) {

                expenses.textContent =
                    formatINR(
                        profile.totalMonthlyExpenses
                    ) +
                    " / mo";

            }

        }

    }



    // ========================================================
    // DIGITAL TWIN
    // ========================================================

    if (
        pageName ===
        "digital-twin.html"
    ) {

        const profile =
            getFinancialProfile();


        if (!profile) {

            window.location.href =
                "/onboarding";

            return;

        }


        const cards =
            document.querySelectorAll(
                ".dashboard-summary .summary-card"
            );


        const health =
            calculateFinancialHealth(
                profile
            );


        if (cards[0]) {

            const accuracy =
                Math.min(
                    98,
                    70 +
                    (
                        profile.goals.length *
                        3
                    ) +
                    10
                );


            cards[0]
                .querySelector("h2")
                .textContent =
                accuracy.toFixed(1) +
                "%";

        }



        let riskTolerance =
            "Moderate";


        if (
            profile.savingsRate >= 50
        ) {

            riskTolerance =
                "Conservative";

        }


        if (
            profile.savingsRate < 20
        ) {

            riskTolerance =
                "Aggressive";

        }


        if (cards[1]) {

            cards[1]
                .querySelector("h2")
                .textContent =
                riskTolerance;

        }


        if (cards[2]) {

            cards[2]
                .querySelector("h2")
                .textContent =
                profile.savingsRate
                    .toFixed(1) +
                "%";

        }



        const emergencyMonths =
            profile.totalMonthlyExpenses > 0
                ?
                profile.savings /
                profile.totalMonthlyExpenses
                :
                0;


        let stressScore =
            100 -
            Math.min(
                100,
                emergencyMonths *
                15
            );


        stressScore +=
            (
                profile.loans /
                Math.max(
                    profile.totalAssets,
                    1
                )
            ) * 20;


        stressScore =
            Math.max(
                0,
                Math.min(
                    100,
                    Math.round(
                        stressScore
                    )
                )
            );


        let stress =
            "Low";


        if (stressScore > 60) {

            stress =
                "High";

        } else if (
            stressScore > 30
        ) {

            stress =
                "Moderate";

        }


        if (cards[3]) {

            cards[3]
                .querySelector("h2")
                .textContent =
                `${stress} (${stressScore}/100)`;

        }

    }



    // ========================================================
    // SIMULATION LAB
    // ========================================================

    if (
        pageName ===
        "simulation.html"
    ) {

        const sliders =
            document.querySelectorAll(
                'input[type="range"]'
            );


        if (sliders.length >= 3) {

            const market =
                sliders[0];

            const inflation =
                sliders[1];

            const savings =
                sliders[2];


            function updateLabels() {

                market
                    .parentElement
                    .querySelector(
                        "strong"
                    )
                    .textContent =
                    "-" +
                    market.value +
                    "%";


                inflation
                    .parentElement
                    .querySelector(
                        "strong"
                    )
                    .textContent =
                    inflation.value +
                    "%";


                const savingValue =
                    Number(
                        savings.value
                    );


                savings
                    .parentElement
                    .querySelector(
                        "strong"
                    )
                    .textContent =
                    savingValue >= 0
                        ?
                        "+" +
                        formatINR(
                            savingValue
                        )
                        :
                        "-" +
                        formatINR(
                            Math.abs(
                                savingValue
                            )
                        );

            }


            function runSimulation() {

                const profile =
                    getFinancialProfile();


                let netWorth =
                    profile
                        ?
                        profile.netWorth
                        :
                        1000000;


                const marketDrop =
                    Number(
                        market.value
                    ) /
                    100;


                const inflationRate =
                    Number(
                        inflation.value
                    ) /
                    100;


                const extraSaving =
                    Number(
                        savings.value
                    );


                netWorth *=
                    1 -
                    marketDrop;


                const years =
                    5;


                const annualReturn =
                    0.11;


                let projected =
                    netWorth;


                for (
                    let year = 0;
                    year < years;
                    year++
                ) {

                    projected *=
                        1 +
                        annualReturn;


                    projected +=
                        extraSaving *
                        12;

                }


                projected /=
                    Math.pow(
                        1 +
                        inflationRate,
                        years
                    );


                projected =
                    Math.max(
                        0,
                        projected
                    );


                const best =
                    projected *
                    1.25;


                const worst =
                    projected *
                    0.70;


                const outcomes =
                    document.querySelectorAll(
                        ".simulation-result-preview"
                    );


                if (outcomes[0]) {

                    outcomes[0]
                        .querySelector(
                            "strong"
                        )
                        .textContent =
                        formatINR(best);

                }


                if (outcomes[1]) {

                    outcomes[1]
                        .querySelector(
                            "strong"
                        )
                        .textContent =
                        formatINR(
                            projected
                        );

                }


                if (outcomes[2]) {

                    outcomes[2]
                        .querySelector(
                            "strong"
                        )
                        .textContent =
                        formatINR(
                            worst
                        );

                }


                const summary =
                    document.querySelector(
                        ".dashboard-summary .summary-card h2"
                    );


                if (summary) {

                    summary.textContent =
                        formatINR(
                            projected
                        );

                }


                const probability =
                    Math.max(
                        20,
                        Math.min(
                            95,
                            92 -
                            Number(
                                market.value
                            ) *
                            0.5 -
                            Number(
                                inflation.value
                            ) *
                            0.7 +
                            Number(
                                savings.value
                            ) /
                            10000
                        )
                    );


                const cards =
                    document.querySelectorAll(
                        ".dashboard-summary .summary-card"
                    );


                if (cards[1]) {

                    cards[1]
                        .querySelector(
                            "h2"
                        )
                        .textContent =
                        probability
                            .toFixed(1) +
                        "%";

                }

            }


            sliders.forEach(
                function (slider) {

                    slider.addEventListener(
                        "input",
                        function () {

                            updateLabels();

                            runSimulation();

                        }
                    );

                }
            );


            updateLabels();

            runSimulation();

        }

    }



    // ========================================================
    // FUTURE PROJECTION
    // ========================================================

    if (
        pageName ===
        "projection.html"
    ) {

        const profile =
            getFinancialProfile();


        if (profile) {

            const returnRate =
                0.115;

            const inflation =
                0.06;

            const years =
                10;


            let value =
                profile.totalAssets;


            const yearlyContribution =
                Math.max(
                    0,
                    profile.monthlySavings
                ) *
                12;


            for (
                let year = 0;
                year < years;
                year++
            ) {

                value =
                    (
                        value +
                        yearlyContribution
                    ) *
                    (
                        1 +
                        returnRate
                    );

            }


            const inflationAdjusted =
                value /
                Math.pow(
                    1 +
                    inflation,
                    years
                );


            const cards =
                document.querySelectorAll(
                    ".dashboard-summary .summary-card"
                );


            if (cards[0]) {

                cards[0]
                    .querySelector(
                        "h2"
                    )
                    .textContent =
                    formatINR(
                        value
                    );

            }


            if (cards[3]) {

                cards[3]
                    .querySelector(
                        "h2"
                    )
                    .textContent =
                    formatINR(
                        inflationAdjusted
                    );

            }

        }

    }



    // ========================================================
    // GOALS
    // ========================================================

    if (pageName === "goals.html") {

        const profile =
            getFinancialProfile();


        if (profile) {

            const cards =
                document.querySelectorAll(
                    ".dashboard-summary .summary-card"
                );


            if (cards[0]) {

                cards[0]
                    .querySelector("h2")
                    .textContent =
                    profile.goals.length +
                    " Active";

            }


            if (cards[1]) {

                cards[1]
                    .querySelector("h2")
                    .textContent =
                    formatINR(
                        profile.savings
                    );

            }


            const allocation =
                Math.max(
                    0,
                    Math.round(
                        profile.monthlySavings *
                        0.5
                    )
                );


            if (cards[2]) {

                cards[2]
                    .querySelector("h2")
                    .textContent =
                    formatINR(
                        allocation
                    ) +
                    " / mo";

            }

        }

    }



    // ========================================================
    // INVESTMENTS
    // ========================================================

    if (
        pageName ===
        "investments.html"
    ) {

        const profile =
            getFinancialProfile();


        if (profile) {

            const stats =
                document.querySelectorAll(
                    ".investment-stat h2"
                );


            const invested =
                profile.investments;


            const estimatedValue =
                invested *
                1.18;


            const returnPercent =
                invested > 0
                    ?
                    (
                        (
                            estimatedValue -
                            invested
                        ) /
                        invested
                    ) *
                    100
                    :
                    0;


            if (stats[0]) {

                stats[0].textContent =
                    formatINR(
                        invested
                    );

            }


            if (stats[1]) {

                stats[1].textContent =
                    formatINR(
                        estimatedValue
                    );

            }


            if (stats[2]) {

                stats[2].textContent =
                    returnPercent
                        .toFixed(2) +
                    "%";

            }


            const circleAmount =
                document.querySelector(
                    ".allocation-inner strong"
                );


            if (circleAmount) {

                circleAmount.textContent =
                    formatINR(
                        estimatedValue
                    );

            }

        }


        const addInvestment =
            document.querySelector(
                ".investment-btn"
            );


        if (addInvestment) {

            addInvestment.addEventListener(
                "click",
                function () {

                    const name =
                        prompt(
                            "Enter investment name:"
                        );


                    if (!name) {

                        return;

                    }


                    const amount =
                        Number(
                            prompt(
                                "Enter investment amount:"
                            )
                        );


                    if (
                        !amount ||
                        amount <= 0
                    ) {

                        alert(
                            "Please enter a valid amount."
                        );

                        return;

                    }


                    const profile =
                        getFinancialProfile();


                    if (!profile) {

                        return;

                    }


                    profile.investments +=
                        amount;


                    profile.totalAssets =
                        profile.savings +
                        profile.investments;


                    profile.netWorth =
                        profile.totalAssets -
                        profile.loans;


                    saveFinancialProfile(
                        profile
                    );


                    alert(
                        `${name} worth ${formatINR(amount)} added successfully.`
                    );


                    location.reload();

                }
            );

        }

    }



    // ========================================================
    // LOANS & DEBT
    // ========================================================

    if (pageName === "loans.html") {

        const profile =
            getFinancialProfile();


        if (profile) {

            const cards =
                document.querySelectorAll(
                    ".dashboard-summary .summary-card"
                );


            if (cards[0]) {

                cards[0]
                    .querySelector("h2")
                    .textContent =
                    formatINR(
                        profile.loans
                    );

            }


            if (cards[1]) {

                cards[1]
                    .querySelector("h2")
                    .textContent =
                    formatINR(
                        profile.emi
                    ) +
                    " / mo";


                const percentage =
                    profile.monthlyIncome > 0
                        ?
                        (
                            profile.emi /
                            profile.monthlyIncome
                        ) *
                        100
                        :
                        0;


                const description =
                    cards[1].querySelector(
                        "p"
                    );


                if (description) {

                    description.textContent =
                        percentage
                            .toFixed(1) +
                        "% of total income";

                }

            }


            if (cards[3]) {

                const months =
                    profile.emi > 0
                        ?
                        Math.ceil(
                            profile.loans /
                            profile.emi
                        )
                        :
                        0;


                cards[3]
                    .querySelector("h2")
                    .textContent =
                    months > 0
                        ?
                        months +
                        " Months"
                        :
                        "Debt Free";

            }

        }

    }



    // ========================================================
    // RISK CENTER
    // ========================================================

    if (pageName === "risk.html") {

        const profile =
            getFinancialProfile();


        if (profile) {

            const cards =
                document.querySelectorAll(
                    ".dashboard-summary .summary-card"
                );


            const emergencyMonths =
                profile.totalMonthlyExpenses > 0
                    ?
                    profile.savings /
                    profile.totalMonthlyExpenses
                    :
                    0;


            const debtRatio =
                profile.monthlyIncome > 0
                    ?
                    profile.emi /
                    profile.monthlyIncome
                    :
                    0;


            let score =
                50;


            score -=
                Math.min(
                    30,
                    emergencyMonths *
                    5
                );


            score +=
                debtRatio *
                50;


            score =
                Math.round(
                    Math.max(
                        0,
                        Math.min(
                            100,
                            score
                        )
                    )
                );


            let level =
                "Low";


            if (score >= 60) {

                level =
                    "High";

            } else if (
                score >= 35
            ) {

                level =
                    "Moderate";

            }


            if (cards[0]) {

                cards[0]
                    .querySelector("h2")
                    .textContent =
                    `${level} (${score}/100)`;

            }


            if (cards[1]) {

                cards[1]
                    .querySelector("h2")
                    .textContent =
                    emergencyMonths
                        .toFixed(1) +
                    " Months";

            }

        }

    }



    // ========================================================
    // AI ADVISOR
    // ========================================================

    if (pageName === "advisor.html") {

        const profile =
            getFinancialProfile();


        const advisorPanel =
            document.querySelector(
                ".dashboard-grid .dashboard-panel"
            );


        if (advisorPanel) {

            const input =
                advisorPanel.querySelector(
                    'input[type="text"]'
                );


            const sendButton =
                advisorPanel.querySelector(
                    "button"
                );


            function generateAdvisorResponse(
                question
            ) {

                if (!profile) {

                    return "Complete your financial profile so I can analyze your finances.";

                }


                const lower =
                    question.toLowerCase();


                if (
                    lower.includes(
                        "save"
                    ) ||
                    lower.includes(
                        "saving"
                    )
                ) {

                    return (
                        `Your current estimated savings rate is ` +
                        `${profile.savingsRate.toFixed(1)}%. ` +
                        `You currently save approximately ` +
                        `${formatINR(profile.monthlySavings)} per month.`
                    );

                }


                if (
                    lower.includes(
                        "debt"
                    ) ||
                    lower.includes(
                        "loan"
                    )
                ) {

                    if (
                        profile.loans <= 0
                    ) {

                        return "You currently have no outstanding debt recorded in your Financial Twin.";

                    }


                    return (
                        `You currently have ${formatINR(profile.loans)} ` +
                        `of debt with a monthly EMI of ` +
                        `${formatINR(profile.emi)}. Prioritizing high-interest debt can reduce your long-term interest cost.`
                    );

                }


                if (
                    lower.includes(
                        "investment"
                    )
                ) {

                    return (
                        `You currently have ${formatINR(profile.investments)} ` +
                        `recorded in investments. Your investment strategy should remain aligned with your goals, emergency reserve and risk tolerance.`
                    );

                }


                if (
                    lower.includes(
                        "net worth"
                    )
                ) {

                    return (
                        `Your current estimated net worth is ` +
                        `${formatINR(profile.netWorth)}.`
                    );

                }


                if (
                    lower.includes(
                        "expense"
                    ) ||
                    lower.includes(
                        "spend"
                    )
                ) {

                    return (
                        `Your estimated monthly expenses are ` +
                        `${formatINR(profile.totalMonthlyExpenses)}, ` +
                        `which is approximately ` +
                        `${(
                            profile.totalMonthlyExpenses /
                            profile.monthlyIncome *
                            100
                        ).toFixed(1)}% of your monthly income.`
                    );

                }


                if (
                    lower.includes(
                        "goal"
                    )
                ) {

                    if (
                        profile.goals.length === 0
                    ) {

                        return "You have not selected any financial goals yet.";

                    }


                    return (
                        "Your recorded goals include: " +
                        profile.goals.join(", ") +
                        "."
                    );

                }


                return (
                    `Based on your Financial Twin, your net worth is ` +
                    `${formatINR(profile.netWorth)}, your savings rate is ` +
                    `${profile.savingsRate.toFixed(1)}%, and your monthly free cash flow is ` +
                    `${formatINR(profile.monthlySavings)}.`
                );

            }


            function sendMessage() {

                if (!input) {

                    return;

                }


                const question =
                    input.value.trim();


                if (!question) {

                    return;

                }


                const response =
                    generateAdvisorResponse(
                        question
                    );


                const message =
                    document.createElement(
                        "div"
                    );


                message.className =
                    "simulation-result-preview";


                message.style.background =
                    "rgba(255,255,255,0.03)";


                message.style.borderRadius =
                    "8px";


                message.style.padding =
                    "12px";


                message.innerHTML =
                    `
                    <div>
                        <span style="color:#00f2fe;font-weight:600;">
                            🤖 AI Assistant:
                        </span>

                        <p style="margin-top:5px;font-size:13px;color:#ccc;">
                            ${response}
                        </p>
                    </div>
                    `;


                const inputContainer =
                    input.parentElement;


                inputContainer.parentElement
                    .insertBefore(
                        message,
                        inputContainer
                    );


                input.value = "";

            }


            if (sendButton) {

                sendButton.addEventListener(
                    "click",
                    sendMessage
                );

            }


            if (input) {

                input.addEventListener(
                    "keydown",
                    function (event) {

                        if (
                            event.key ===
                            "Enter"
                        ) {

                            event.preventDefault();

                            sendMessage();

                        }

                    }
                );

            }

        }

    }



    // ========================================================
    // ANALYTICS
    // ========================================================

    if (
        pageName ===
        "/"
    ) {

        const profile =
            getFinancialProfile();


        if (profile) {

            const cards =
                document.querySelectorAll(
                    ".dashboard-summary .summary-card"
                );


            if (cards[0]) {

                cards[0]
                    .querySelector("h2")
                    .textContent =
                    formatINR(
                        profile.monthlySavings
                    ) +
                    " / mo";

            }


            if (cards[1]) {

                const ratio =
                    profile.monthlyIncome > 0
                        ?
                        (
                            profile.totalMonthlyExpenses /
                            profile.monthlyIncome
                        ) *
                        100
                        :
                        0;


                cards[1]
                    .querySelector("h2")
                    .textContent =
                    ratio
                        .toFixed(1) +
                    "%";

            }


            const breakdown =
                document.querySelectorAll(
                    ".dashboard-grid .simulation-result-preview"
                );


            if (
                breakdown.length >= 3 &&
                profile.monthlyIncome > 0
            ) {

                const essential =
                    (
                        (
                            profile.livingExpenses +
                            profile.emi
                        ) /
                        profile.monthlyIncome
                    ) *
                    100;


                const discretionary =
                    (
                        profile.otherExpenses /
                        profile.monthlyIncome
                    ) *
                    100;


                const savings =
                    Math.max(
                        0,
                        profile.savingsRate
                    );


                const values = [
                    essential,
                    discretionary,
                    savings
                ];


                breakdown.forEach(
                    function (
                        item,
                        index
                    ) {

                        if (
                            values[index] ===
                            undefined
                        ) {

                            return;

                        }


                        const strongs =
                            item.querySelectorAll(
                                "strong"
                            );


                        if (
                            strongs.length > 1
                        ) {

                            strongs[
                                strongs.length -
                                1
                            ].textContent =
                                values[index]
                                    .toFixed(1) +
                                "%";

                        }

                    }
                );

            }

        }

    }



    // ========================================================
    // FINANCIAL TIMELINE
    // ========================================================

    if (
        pageName ===
        "financial_timeline.html" ||
        pageName ===
        "timeline.html"
    ) {

        const profile =
            getFinancialProfile();


        if (profile) {

            const cards =
                document.querySelectorAll(
                    ".dashboard-summary .summary-card"
                );


            if (cards[2]) {

                cards[2]
                    .querySelector("h2")
                    .textContent =
                    formatINR(
                        profile.monthlyIncome
                    );

            }


            if (cards[3]) {

                cards[3]
                    .querySelector("h2")
                    .textContent =
                    formatINR(
                        profile.totalMonthlyExpenses
                    );

            }

        }

    }



    // ========================================================
    // REPORTS
    // ========================================================

    if (pageName === "reports.html") {

        const profile =
            getFinancialProfile();

        const user =
            getUser();


        const buttons =
            document.querySelectorAll(
                ".dashboard-grid button"
            );


        buttons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const text =
                            button.textContent
                                .trim()
                                .toLowerCase();


                        if (
                            text.includes(
                                "csv"
                            )
                        ) {

                            downloadFinancialCSV(
                                user,
                                profile
                            );

                        } else {

                            openPrintableReport(
                                user,
                                profile
                            );

                        }

                    }
                );

            }
        );


        function downloadFinancialCSV(
            user,
            profile
        ) {

            if (!profile) {

                alert(
                    "Financial profile unavailable."
                );

                return;

            }


            const rows = [

                [
                    "LedgerX Financial Report"
                ],

                [
                    "User",
                    user
                        ?
                        user.name
                        :
                        ""
                ],

                [
                    "Email",
                    user
                        ?
                        user.email
                        :
                        ""
                ],

                [
                    "Monthly Income",
                    profile.monthlyIncome
                ],

                [
                    "Monthly Expenses",
                    profile.totalMonthlyExpenses
                ],

                [
                    "Monthly Savings",
                    profile.monthlySavings
                ],

                [
                    "Savings",
                    profile.savings
                ],

                [
                    "Investments",
                    profile.investments
                ],

                [
                    "Outstanding Debt",
                    profile.loans
                ],

                [
                    "Monthly EMI",
                    profile.emi
                ],

                [
                    "Net Worth",
                    profile.netWorth
                ],

                [
                    "Savings Rate",
                    profile.savingsRate.toFixed(
                        2
                    ) + "%"
                ]

            ];


            const csv =
                rows
                    .map(
                        function (row) {

                            return row.join(
                                ","
                            );

                        }
                    )
                    .join("\n");


            const blob =
                new Blob(
                    [csv],
                    {
                        type:
                            "text/csv"
                    }
                );


            const url =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href =
                url;


            link.download =
                "LedgerX-Financial-Report.csv";


            link.click();


            URL.revokeObjectURL(
                url
            );

        }


        function openPrintableReport(
            user,
            profile
        ) {

            if (!profile) {

                alert(
                    "Financial profile unavailable."
                );

                return;

            }


            const report =
                window.open(
                    "",
                    "_blank"
                );


            if (!report) {

                alert(
                    "Please allow popups to generate the report."
                );

                return;

            }


            report.document.write(
                `
                <!DOCTYPE html>

                <html>

                <head>

                    <title>
                        LedgerX Financial Report
                    </title>

                    <style>

                        body {
                            font-family:
                                Arial,
                                sans-serif;

                            padding:
                                40px;

                            color:
                                #222;
                        }

                        h1 {
                            margin-bottom:
                                5px;
                        }

                        table {
                            width:
                                100%;

                            border-collapse:
                                collapse;

                            margin-top:
                                30px;
                        }

                        td {
                            border-bottom:
                                1px solid #ddd;

                            padding:
                                12px;
                        }

                        td:last-child {
                            text-align:
                                right;

                            font-weight:
                                bold;
                        }

                    </style>

                </head>

                <body>

                    <h1>
                        LedgerX Financial Report
                    </h1>

                    <p>
                        ${user ? user.name : ""}
                    </p>

                    <p>
                        Generated:
                        ${new Date().toLocaleDateString("en-IN")}
                    </p>

                    <table>

                        <tr>
                            <td>
                                Monthly Income
                            </td>

                            <td>
                                ${formatINR(profile.monthlyIncome)}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Monthly Expenses
                            </td>

                            <td>
                                ${formatINR(profile.totalMonthlyExpenses)}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Savings
                            </td>

                            <td>
                                ${formatINR(profile.savings)}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Investments
                            </td>

                            <td>
                                ${formatINR(profile.investments)}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Outstanding Debt
                            </td>

                            <td>
                                ${formatINR(profile.loans)}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Net Worth
                            </td>

                            <td>
                                ${formatINR(profile.netWorth)}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Savings Rate
                            </td>

                            <td>
                                ${profile.savingsRate.toFixed(1)}%
                            </td>
                        </tr>

                    </table>

                    <script>

                        window.onload =
                            function () {

                                window.print();

                            };

                    <\/script>

                </body>

                </html>
                `
            );


            report.document.close();

        }

    }



    // ========================================================
    // SETTINGS
    // ========================================================

    if (pageName === "settings.html") {

        const user =
            getUser();


        const profileSection =
            document.getElementById(
                "profile"
            );


        if (
            user &&
            profileSection
        ) {

            const fields =
                profileSection
                    .querySelectorAll(
                        "input"
                    );


            if (fields[0]) {

                fields[0].value =
                    user.name;

            }


            if (fields[1]) {

                fields[1].value =
                    user.email;

            }


            if (fields[2]) {

                fields[2].value =
                    user.phone || "";

            }


            const profileName =
                document.querySelector(
                    ".profile-settings strong"
                );


            const profileEmail =
                document.querySelector(
                    ".profile-settings span"
                );


            if (profileName) {

                profileName.textContent =
                    user.name;

            }


            if (profileEmail) {

                profileEmail.textContent =
                    user.email;

            }


            const avatarElements =
                document.querySelectorAll(
                    ".profile-avatar, .settings-avatar"
                );


            avatarElements.forEach(
                function (avatar) {

                    avatar.textContent =
                        user.name
                            .charAt(0)
                            .toUpperCase();

                }
            );

        }



        // ====================================================
        // SETTINGS NAVIGATION
        // ====================================================

        const settingLinks =
            document.querySelectorAll(
                ".settings-nav-link"
            );


        settingLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        settingLinks.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        link.classList.add(
                            "active"
                        );

                    }
                );

            }
        );



        // ====================================================
        // SAVE PROFILE
        // ====================================================

        const saveButton =
            document.querySelector(
                ".settings-save"
            );


        if (
            saveButton &&
            profileSection
        ) {

            saveButton.addEventListener(
                "click",
                function () {

                    const fields =
                        profileSection
                            .querySelectorAll(
                                "input"
                            );


                    const currentUser =
                        getUser();


                    if (!currentUser) {

                        return;

                    }


                    currentUser.name =
                        fields[0]
                            ?
                            fields[0].value.trim()
                            :
                            currentUser.name;


                    currentUser.email =
                        fields[1]
                            ?
                            fields[1].value
                                .trim()
                                .toLowerCase()
                            :
                            currentUser.email;


                    currentUser.phone =
                        fields[2]
                            ?
                            fields[2].value.trim()
                            :
                            "";


                    localStorage.setItem(
                        "ledgerXUser",
                        JSON.stringify(
                            currentUser
                        )
                    );


                    alert(
                        "Settings saved successfully."
                    );


                    location.reload();

                }
            );

        }



        // ====================================================
        // CHANGE PASSWORD
        // ====================================================

        const securitySection =
            document.getElementById(
                "security"
            );


        if (securitySection) {

            const changeButton =
                securitySection.querySelector(
                    ".settings-outline"
                );


            if (changeButton) {

                changeButton.addEventListener(
                    "click",
                    function () {

                        const user =
                            getUser();


                        if (!user) {

                            return;

                        }


                        const current =
                            prompt(
                                "Enter current password:"
                            );


                        if (
                            current !==
                            user.password
                        ) {

                            alert(
                                "Current password is incorrect."
                            );

                            return;

                        }


                        const next =
                            prompt(
                                "Enter new password:"
                            );


                        if (
                            !next ||
                            next.length < 6
                        ) {

                            alert(
                                "New password must contain at least 6 characters."
                            );

                            return;

                        }


                        user.password =
                            next;


                        localStorage.setItem(
                            "ledgerXUser",
                            JSON.stringify(
                                user
                            )
                        );


                        alert(
                            "Password changed successfully."
                        );

                    }
                );

            }

        }



        // ====================================================
        // SAVE SWITCH SETTINGS
        // ====================================================

        const switches =
            document.querySelectorAll(
                ".settings-section .switch input"
            );


        switches.forEach(
            function (
                toggle,
                index
            ) {

                const key =
                    "ledgerXSetting" +
                    index;


                const saved =
                    localStorage.getItem(
                        key
                    );


                if (
                    saved !== null
                ) {

                    toggle.checked =
                        saved === "true";

                }


                toggle.addEventListener(
                    "change",
                    function () {

                        localStorage.setItem(
                            key,
                            toggle.checked
                        );

                    }
                );

            }
        );

    }



    // ========================================================
    // ADMIN DASHBOARD
    // ========================================================

    if (pageName === "admin.html") {

        const actions =
            document.querySelectorAll(
                ".admin-action-btn"
            );


        if (actions[0]) {

            actions[0].addEventListener(
                "click",
                function () {

                    document
                        .getElementById(
                            "users"
                        )
                        ?.scrollIntoView(
                            {
                                behavior:
                                    "smooth"
                            }
                        );

                }
            );

        }


        if (actions[1]) {

            actions[1].addEventListener(
                "click",
                function () {

                    document
                        .getElementById(
                            "activity"
                        )
                        ?.scrollIntoView(
                            {
                                behavior:
                                    "smooth"
                            }
                        );

                }
            );

        }


        if (actions[2]) {

            actions[2].addEventListener(
                "click",
                function () {

                    alert(
                        "Admin platform report generated successfully."
                    );

                }
            );

        }


        if (actions[3]) {

            actions[3].addEventListener(
                "click",
                function () {

                    document
                        .getElementById(
                            "system"
                        )
                        ?.scrollIntoView(
                            {
                                behavior:
                                    "smooth"
                            }
                        );

                }
            );

        }


        const adminLinks =
            document.querySelectorAll(
                '.dashboard-sidebar a[href^="#"]'
            );


        adminLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();


                        const target =
                            document.querySelector(
                                link.getAttribute(
                                    "href"
                                )
                            );


                        if (target) {

                            target.scrollIntoView(
                                {
                                    behavior:
                                        "smooth"
                                }
                            );

                        }

                    }
                );

            }
        );

    }



    // ========================================================
    // PROFILE AVATAR INITIAL
    // ========================================================

    if (isDashboardPage) {

        const user =
            getUser();


        if (user) {

            document
                .querySelectorAll(
                    ".profile-avatar"
                )
                .forEach(
                    function (avatar) {

                        avatar.textContent =
                            user.name
                                .charAt(0)
                                .toUpperCase();

                    }
                );

        }

    }

}