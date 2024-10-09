async function fetchData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) {
            throw new Error("Не удалось получить данные");
        }
        const data = await response.json();
        populateTable(data);
    } catch (error) {
        console.error("Ошибка:", error);
    }
}

function populateTable(data) {
    const tableBody = document.querySelector(".data-table").querySelector("tbody");
    tableBody.innerHTML = "";

    data.forEach((post) => {
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        const titleCell = document.createElement("td");
        const bodyCell = document.createElement("td");

        idCell.textContent = post.id;
        titleCell.textContent = post.title;
        bodyCell.textContent = post.body;

        row.appendChild(idCell);
        row.appendChild(titleCell);
        row.appendChild(bodyCell);

        tableBody.appendChild(row);
    });
}

document.querySelector(".fetch-button").addEventListener("click", fetchData);
