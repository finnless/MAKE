const general_manual_policy = {
    "General Usage Manual": "https://docs.google.com/document/d/1-pycsGqeUptorvEH-Ti66ssmvKLrtopvLRZ9YNMSMKo/view",
    "Spray Paint Booth Manual": "https://docs.google.com/document/d/1rWhhCfDzNkxNpQC1f5lGxxvZ7KNCTyGIw4CS1ixTPic/edit",
    "Club Storage Policy": "https://docs.google.com/document/d/1ky6DTTOb7MhoxkAf3gndhy1pUN1IVY8BzQy1gNaVj1k/edit",
    "Composite Room Policy": "https://docs.google.com/document/d/1vf5Pw24-stQF0I0EhXi-4wItHGNquIOZGPalTngE7B8/edit",
    "Long Term Project Policy": "https://docs.google.com/document/d/1aFSf82Swf-KJm4s5NmczeW031gcYJmEDHaDayzsvZig/edit",
    "Lost & Found Policy": "https://docs.google.com/document/d/1abznvqZAuiiUMQWZY2wXyiTc17sGK2Lkww3c1VEKFps/edit",
    "Overnight Locker Manual": "https://docs.google.com/document/d/1GWrlFWOObZJy3haqlFzlr3gR2CCAU9opjqsJb66xxew/edit",
    "Tool Checkout Policy": "https://docs.google.com/document/d/1wp-baSy2ixf-ST2luNtjVMYcxE5_iDHC-R0nUmALyzc/edit",
    "Studio Policy": "https://docs.google.com/document/d/1pqknkaGRO2VQL6vkdeRkVYewqo_WKNh6-tpEloCPW5c/edit",
    "Waterjet Manual": "https://docs.google.com/document/d/1a-hPM5qB79ONJ-7k06pvIZVxz1_ONLAD/",
    "Welding Manual": "https://docs.google.com/document/d/13k30JUPOOKK707lYuoaa8Pd3ICvUOBFMly4v8zQqU-Y/edit"
};

const additional_informational_links = {
    "Printing Press Glossary": "https://docs.google.com/document/d/1JiHqYf_kEaK3hFZ4yS2bjCtTyL6PKsosZmPeGssmNCo/edit",
    "3D Printer Troubleshooting Guide": "https://docs.google.com/document/d/1a2Q-BonjK_kNOBoaQjxGVQgLC9nilP-8HGqSBOf4ynU/edit",
    "Injury Report Form": "https://docs.google.com/forms/d/e/1FAIpQLScLeBtqgH2RYPFIgOTd5TCk7fGLsU5j8lMBNgLgPaZ5c7n9jQ/viewform?usp=sf_link"
}

function renderQuizInfo() {
    const manual_policy_list_el = document.getElementById("general-manual-policy-list");
    removeAllChildren(manual_policy_list_el);
    for (const [key, value] of Object.entries(general_manual_policy)) {
        manual_policy_list_el.appendChild(createLink(value, key));
    }

    const additional_info_el = document.getElementById("additional-info-list");
    removeAllChildren(additional_info_el);
    for (const [key, value] of Object.entries(additional_informational_links)) {
        additional_info_el.appendChild(createLink(value, key));
    }

    const all_quiz_status = document.getElementsByClassName("quiz-status-item");

    for (let el of all_quiz_status) {
        el.classList.remove("quiz-passed");
        const quiz_status = el.getElementsByClassName("quiz-status")[0];
        quiz_status.innerText = "";
        quiz_status.classList.remove("status-passed");
    }

    if (state.cx_id === null) {
        return;
    }

    for (let timestamp of Object.keys(state.user_object.passed_quizzes)) {
        if (determineValidQuizDate(timestamp)) {
            const quiz = QUIZ_IDS_TO_NAMES[state.user_object.passed_quizzes[timestamp]];
            const el = document.getElementById("quiz-" + quiz);
            el.classList.add("quiz-passed");
            const status = el.getElementsByClassName("quiz-status")[0];
            status.innerText = "Passed";
            status.classList.add("status-passed");
        }
    }
}

function createLink(link_url, link_text) {
    const list_item = document.createElement("li");

    const el = document.createElement("a");
    el.href = link_url;
    el.innerText = link_text;
    el.target = "_blank";

    list_item.appendChild(el);
    
    return list_item;
}

function openQuiz(quiz_name) {
    let quiz_link;

    let name = (state.user_object ?? "").name ?? "";
    let cx_id = (state.user_object ?? "").cx_id ?? "";
    let email = (state.user_object ?? "").email ?? "";

    switch (quiz_name) {
        case "general":
            quiz_link = `https://docs.google.com/forms/d/e/1FAIpQLSfW3l2cxem3JwKqX3RJjjhJXKzAdwY9x4dYeXvOATGA-dhWzA/viewform?usp=pp_url&entry.382887588=${name}&entry.1395074003=${cx_id}&entry.1482318217=${email}`;
            break;
        case "laser3d":
            quiz_link = `https://docs.google.com/forms/d/e/1FAIpQLSfAZHwVpaI91oPq2PcDnUJt4yjPbwLznU41mMfjJJzyyZ9T7A/viewform?usp=pp_url&entry.382887588=${name}&entry.1395074003=${cx_id}&entry.1482318217=${email}`;
            break;
        case "spraypaint":
            quiz_link = `https://docs.google.com/forms/d/e/1FAIpQLScjlDfT9sXZzq_IbqKTrjn3H2H81B5c7uL9aucRB_rEOLbGMg/viewform?usp=pp_url&entry.382887588=${name}&entry.1395074003=${cx_id}&entry.1482318217=${email}`;
            break;
        case "composite":
            quiz_link = `https://docs.google.com/forms/d/e/1FAIpQLSfJTAr-E4TT-wYCfgvDqTYdssBY7ZfSLGBOv0oTtZBl_H_PJw/viewform?usp=pp_url&entry.382887588=${name}&entry.1395074003=${cx_id}&entry.1482318217=${email}`;
            break;
        case "welding":
            quiz_link = `https://docs.google.com/forms/d/e/1FAIpQLSet-S7ZIHVRydmc-J_zXSV4knCr50AryDbq0aUv1s5FB2ZGmg/viewform?usp=pp_url&entry.382887588=${name}&entry.1395074003=${cx_id}&entry.1482318217=${email}`;
            break;
        case "studio":
            quiz_link = `https://docs.google.com/forms/d/e/1FAIpQLSdikBUUUXV2RMTD1LGdGHcSzVXgzokmguET0vedSR8JqNGm0Q/viewform?usp=pp_url&entry.382887588=${name}&entry.1395074003=${cx_id}&entry.1482318217=${email}`;
            break;
        case "waterjet":
            quiz_link = `https://docs.google.com/forms/d/e/1FAIpQLSev6cU296gQyqFxOxi2LFmJPCDthz_QBMYkP52AbKcr-7HFFg/viewform?usp=pp_url&entry.382887588=${name}&entry.1395074003=${cx_id}&entry.1482318217=${email}`;
            break;
    }
    
    window.open(encodeURI(quiz_link), "_blank");        
}