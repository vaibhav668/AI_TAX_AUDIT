/* ==========================================
        AI TAX AUDIT SYSTEM
        SCRIPT.JS PART 1
========================================== */

const API = "http://127.0.0.1:8000/api/v1";

let transactionChart = null;
let statusChart = null;

let dashboardData = {};
let currentPage = "dashboard";

/* ==========================================
            UTILITIES
========================================== */

function $(id) {

    return document.getElementById(id);

}

function showLoading() {

    $("loadingOverlay").classList.add("active");

}

function hideLoading() {

    $("loadingOverlay").classList.remove("active");

}

function toast(message, type = "success") {

    const t = $("toast");

    t.innerHTML = message;

    t.className = "toast";

    if (type !== "success") {

        t.classList.add(type);

    }

    t.classList.add("show");

    setTimeout(() => {

        t.classList.remove("show");

    }, 3000);

}

/* ==========================================
            API HELPER
========================================== */

async function api(url, options = {}) {

    try {

        showLoading();

        const response = await fetch(API + url, options);

        const data = await response.json();

        hideLoading();

        return data;

    }

    catch (err) {

        hideLoading();

        toast(err.message, "error");

        console.error(err);

    }

}

/* ==========================================
            SIDEBAR
========================================== */

document.querySelectorAll(".menu li").forEach(item => {

    item.onclick = () => {

        document.querySelectorAll(".menu li").forEach(i => {

            i.classList.remove("active");

        });

        item.classList.add("active");

        const page = item.dataset.page;

        if (!page) return;

        document.querySelectorAll(".page").forEach(p => {

            p.classList.remove("activePage");

        });

        $(page).classList.add("activePage");

        currentPage = page;

    };

});

/* ==========================================
            DASHBOARD
========================================== */

async function loadDashboard() {

    const data = await api("/dashboard");

    if (!data) return;

    dashboardData = data;

    $("totalTransactions").innerHTML =
        data.transactions || 0;

    $("totalReceipts").innerHTML =
        data.receipts || 0;

    $("totalAlerts").innerHTML =
        data.alerts || 0;

    $("matchedTransactions").innerHTML =
        data.matched || 0;

    $("pendingTransactions").innerHTML =
        data.pending || 0;

    $("failedTransactions").innerHTML =
        data.failed || 0;

    drawCharts(data);

}

/* ==========================================
        DASHBOARD CHARTS
========================================== */

function drawCharts(data) {

    if (transactionChart)
        transactionChart.destroy();

    if (statusChart)
        statusChart.destroy();

    transactionChart = new Chart(

        $("transactionChart"),

        {

            type: "line",

            data: {

                labels: [

                    "Jan",

                    "Feb",

                    "Mar",

                    "Apr",

                    "May",

                    "Jun",

                    "Jul",

                    "Aug",

                    "Sep",

                    "Oct",

                    "Nov",

                    "Dec"

                ],

                datasets: [

                    {

                        label: "Transactions",

                        data: data.monthly_transactions ||

                            [12,15,22,40,30,35,50,60,72,80,92,100]

                    }

                ]

            }

        }

    );

    statusChart = new Chart(

        $("statusChart"),

        {

            type: "doughnut",

            data: {

                labels: [

                    "Matched",

                    "Pending",

                    "Failed"

                ],

                datasets: [

                    {

                        data: [

                            data.matched || 0,

                            data.pending || 0,

                            data.failed || 0

                        ]

                    }

                ]

            }

        }

    );

}

/* ==========================================
        RECENT TRANSACTIONS
========================================== */

async function loadRecentTransactions() {

    const transactions =
        await api("/transactions");

    if (!transactions)
        return;

    const table =
        $("recentTransactions");

    table.innerHTML = "";

    transactions.slice(0, 8).forEach(t => {

        table.innerHTML += `

        <tr>

            <td>${t.transaction_number}</td>

            <td>${t.vendor_name}</td>

            <td>${t.amount}</td>

            <td>

                <span class="status">

                    ${t.status}

                </span>

            </td>

            <td>${t.transaction_date}</td>

            <td>

                <button onclick="openTransaction('${t.id}')">

                    View

                </button>

            </td>

        </tr>

        `;

    });

}

/* ==========================================
        OPEN TRANSACTION
========================================== */

function openTransaction(id) {

    $("agentTransactionId").value = id;

    $("gapTransactionId").value = id;

    $("reportTransactionId").value = id;

    toast("Transaction Selected");

}

/* ==========================================
        SEARCH
========================================== */

$("globalSearch").addEventListener(

    "keyup",

    function () {

        console.log(

            "Searching",

            this.value

        );

    }

);

/* ==========================================
        REFRESH
========================================== */

$("refreshDashboard").onclick = () => {

    loadDashboard();

    loadRecentTransactions();

    toast("Dashboard Refreshed");

};

/* ==========================================
        INIT
========================================== */

window.onload = () => {

    loadDashboard();

    loadRecentTransactions();

};
/* ==========================================
        SCRIPT.JS PART 3 (FINAL)
 Gap • AI Agent • Reports • Theme
========================================== */

/* ==========================================
        GAP ANALYSIS
========================================== */

$("runGap").onclick = async () => {

    const id = $("gapTransactionId").value;

    if (!id) {

        toast("Enter Transaction ID", "warning");

        return;
    }

    const result = await api(

        "/gap/" + id,

        {
            method: "POST"
        }

    );

    $("gapResult").innerHTML =
        "<pre>" +
        JSON.stringify(result, null, 4) +
        "</pre>";

    toast("Gap Analysis Completed");

};

/* ==========================================
            AI AGENT
========================================== */

$("runAgent").onclick = async () => {

    const id = $("agentTransactionId").value;

    if (!id) {

        toast("Enter Transaction ID", "warning");

        return;

    }

    const result = await api(

        "/agent/" + id,

        {

            method: "POST"

        }

    );

    if (!result) return;

    $("matchingScore").innerHTML =
        result.matching_score ?? "--";

    if(result.recommendation){

        $("recommendation").value =
            JSON.stringify(
                result.recommendation,
                null,
                4
            );

        $("riskLevel").innerHTML =
            result.recommendation.risk ||
            "N/A";

        $("complianceStatus").innerHTML =
            result.recommendation.compliance ||
            "N/A";

    }

    toast("AI Audit Completed");

};

/* ==========================================
        DOWNLOAD REPORT
========================================== */

$("downloadReport").onclick = () => {

    const id = $("agentTransactionId").value;

    if(!id){

        toast("Enter Transaction ID","warning");

        return;

    }

    window.open(

        API +

        "/report/" +

        id,

        "_blank"

    );

};

/* ==========================================
        REPORT PAGE
========================================== */

$("getReport").onclick = () => {

    const id = $("reportTransactionId").value;

    if(!id){

        toast("Enter Transaction ID","warning");

        return;

    }

    window.open(

        API +

        "/report/" +

        id,

        "_blank"

    );

};

/* ==========================================
        THEME
========================================== */

$("theme").onchange = function(){

    if(this.value==="Light"){

        document.body.className="light";

    }

    else{

        document.body.className="dark";

    }

};

/* ==========================================
        LOGOUT
========================================== */

$("logoutBtn").onclick = ()=>{

    localStorage.clear();

    toast("Logged Out");

    setTimeout(()=>{

        location.reload();

    },1000);

};

/* ==========================================
        MODAL
========================================== */

function confirmBox(message, callback){

    $("confirmModal").classList.add("active");

    $("modalMessage").innerHTML = message;

    $("confirmYes").onclick = ()=>{

        $("confirmModal").classList.remove("active");

        callback();

    };

    $("confirmNo").onclick = ()=>{

        $("confirmModal").classList.remove("active");

    };

}

/* ==========================================
        AUTO REFRESH
========================================== */

setInterval(()=>{

    if(currentPage==="dashboard"){

        loadDashboard();

    }

},60000);

/* ==========================================
        KEYBOARD SHORTCUTS
========================================== */

document.addEventListener(

"keydown",

function(e){

    if(e.ctrlKey && e.key==="r"){

        e.preventDefault();

        loadDashboard();

        toast("Dashboard Refreshed");

    }

});

/* ==========================================
        CONNECTION CHECK
========================================== */

async function checkBackend(){

    try{

        const res = await fetch(

            "http://127.0.0.1:8000/docs"

        );

        if(res.ok){

            console.log("Backend Connected");

        }

    }

    catch{

        toast(

            "Backend Offline",

            "error"

        );

    }

}

/* ==========================================
        STARTUP
========================================== */

window.addEventListener(

    "load",

    () => {

        checkBackend();

        loadDashboard();

        loadRecentTransactions();

    }

);
/* ==========================================
        END OF SCRIPT
========================================== */