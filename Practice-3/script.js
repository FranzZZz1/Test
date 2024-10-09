let posts = [];
let filteredPosts = [];
let currentSortColumn = "";
let currentSortOrder = "asc";

const fetchData = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) {
            throw new Error("Не удалось получить данные");
        }
        posts = await response.json();
        filteredPosts = [...posts];
        fillTable(posts);
        updateSortHandlers();
    } catch (error) {
        console.error("Ошибка:", error);
    }
};

const fillTable = (data) => {
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
};

const sortData = (column, order) => {
    const sortedData = [...filteredPosts].sort((a, b) => {
        const aValue = typeof a[column] === "string" ? a[column].toLowerCase() : a[column];
        const bValue = typeof b[column] === "string" ? b[column].toLowerCase() : b[column];

        if (aValue < bValue) return order === "asc" ? -1 : 1;
        if (aValue > bValue) return order === "asc" ? 1 : -1;
        return 0;
    });

    fillTable(sortedData);
    updateSortStyles(column, order);
};

const updateSortStyles = (column, order) => {
    const headers = document.querySelectorAll(".data-table th");
    headers.forEach((header) => {
        header.classList.remove("sorted-asc", "sorted-desc");
        if (header.dataset.column === column) {
            header.classList.add(order === "asc" ? "sorted-asc" : "sorted-desc");
        }
    });
};

const filterData = () => {
    const searchTerm = document.querySelector(".search-input").value.toLowerCase();
    filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchTerm));
    fillTable(filteredPosts);
};

document.querySelector(".fetch-button").addEventListener("click", fetchData);
document.querySelector(".search-input").addEventListener("input", (event) => {
    if (event.target.value.length >= 3) {
        filterData();
    } else {
        filteredPosts = [...posts];
        fillTable(filteredPosts);
    }
    if (filteredPosts.length > 0) {
        sortData(currentSortColumn, currentSortOrder);
    }
});

const updateSortHandlers = () => {
    const headers = document.querySelectorAll(".data-table th");
    headers.forEach((header) => {
        header.removeEventListener("click", sortHandler);
        if (posts.length > 0) {
            header.addEventListener("click", sortHandler);
        }
    });
};

const sortHandler = (event) => {
    const column = event.target.dataset.column;
    const order = currentSortColumn === column && currentSortOrder === "asc" ? "desc" : "asc";
    currentSortColumn = column;
    currentSortOrder = order;

    sortData(column, order);
};
