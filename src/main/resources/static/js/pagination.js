document.addEventListener('DOMContentLoaded', function() {
    const itemsPerPage = 10;
    let currentPage = 1;

    function filterDramas() {
        const searchTerm = document.getElementById('search').value.toLowerCase();
        const items = document.querySelectorAll('.dorama-item');
        const filteredItems = [];

        items.forEach(item => {
            const title = item.querySelector('h2').textContent.toLowerCase();
            const synopsis = item.querySelector('p').textContent.toLowerCase();
            const isVisible = title.includes(searchTerm) || synopsis.includes(searchTerm);
            if (isVisible) {
                filteredItems.push(item);
            }
            item.style.display = 'none';
        });

        const totalItems = filteredItems.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        showPage(currentPage, filteredItems);
        updatePagination(currentPage, totalPages, filteredItems);
    }

    function showPage(page, filteredItems) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        filteredItems.forEach((item, index) => {
            item.style.display = (index >= startIndex && index < endIndex) ? '' : 'none';
        });
    }

    function updatePagination(currentPage, totalPages, filteredItems) {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        const createPageLink = (page, text) => {
            const link = document.createElement('a');
            link.href = '#';
            link.className = page === currentPage ? 'page current' : 'page';
            link.dataset.page = page;
            link.textContent = text;
            link.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage = page;
                showPage(currentPage, filteredItems);
                updatePagination(currentPage, totalPages, filteredItems);
            });
            return link;
        };

        if (currentPage > 1) {
            pagination.appendChild(createPageLink(currentPage - 1, '« Anterior'));
        }

        for (let page = 1; page <= totalPages; page++) {
            pagination.appendChild(createPageLink(page, page));
        }

        if (currentPage < totalPages) {
            pagination.appendChild(createPageLink(currentPage + 1, 'Próximo »'));
        }
    }

    document.getElementById('search').addEventListener('keyup', filterDramas);

    const items = document.querySelectorAll('.dorama-item');
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    showPage(currentPage, items);
    updatePagination(currentPage, totalPages, items);
});