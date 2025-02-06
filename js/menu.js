class MenuManager {
    constructor() {
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.init();
    }

    init() {
        this.renderCategories();
        this.renderMenuItems();
        this.setupEventListeners();
        this.showLoadingOverlay(false);
    }

    setupEventListeners() {
        // Category filter
        document.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', () => {
                this.setCategory(button.getAttribute('data-category'));
            });
        });

        // Search
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.filterMenuItems();
        });
    }

    renderCategories() {
        const categoriesContainer = document.querySelector('.categories');
        const currentLang = window.languageManager.getCurrentLanguage();

        window.menuData.categories
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .forEach(category => {
                const button = document.createElement('button');
                button.className = 'category-btn';
                button.setAttribute('data-category', category.id);
                button.textContent = category[`name_${currentLang}`];
                categoriesContainer.appendChild(button);
            });
    }

    renderMenuItems(items = window.menuData.menuItems) {
        const menuGrid = document.querySelector('.menu-grid');
        menuGrid.innerHTML = ''; // Clear existing items
        const currentLang = window.languageManager.getCurrentLanguage();
        const langData = window.menuData.languages[currentLang];

        items.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item glass scroll-reveal';
            menuItem.setAttribute('data-id', item.id);
            menuItem.setAttribute('data-category', item.category);

            // Create popular badge if item is popular
            if (item.isPopular) {
                const popularBadge = document.createElement('div');
                popularBadge.className = 'popular-badge';
                popularBadge.textContent = langData.popular;
                menuItem.appendChild(popularBadge);
            }

            // Item content
            const content = \`
                <h3 class="item-name">\${item[`name_${currentLang}`]}</h3>
                \${item[`description_${currentLang}`] ? 
                    \`<p class="item-description">\${item[`description_${currentLang}`]}</p>\` : 
                    ''}
                <div class="price">\${typeof item.price === 'number' ? \`RM \${item.price}\` : item.price}</div>
                \${item.pax ? \`<div class="pax-info">\${langData.paxLabel}: \${item.pax}</div>\` : ''}
                \${item.dietary ? \`<div class="dietary-info">\${langData.dietaryLabel}: \${item.dietary}</div>\` : ''}
                \${item.allergens ? \`<div class="allergens-info">\${langData.allergensLabel}: \${item.allergens.join(', ')}</div>\` : ''}
            \`;

            menuItem.innerHTML = content;
            menuGrid.appendChild(menuItem);

            // Add reveal animation when item comes into view
            this.addScrollReveal(menuItem);
        });
    }

    addScrollReveal(element) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(element);
    }

    filterMenuItems() {
        let filteredItems = window.menuData.menuItems;
        const currentLang = window.languageManager.getCurrentLanguage();

        // Filter by category
        if (this.currentCategory !== 'all') {
            filteredItems = filteredItems.filter(item => 
                item.category === window.menuData.categories.find(c => c.id === this.currentCategory)?.name_en
            );
        }

        // Filter by search query
        if (this.searchQuery) {
            filteredItems = filteredItems.filter(item => {
                const searchableText = [
                    item[`name_${currentLang}`],
                    item[`description_${currentLang}`],
                    item.dietary,
                    item.category
                ].filter(Boolean).join(' ').toLowerCase();

                return searchableText.includes(this.searchQuery);
            });
        }

        this.renderMenuItems(filteredItems);
    }

    setCategory(categoryId) {
        this.currentCategory = categoryId;
        
        // Update active state of category buttons
        document.querySelectorAll('.category-btn').forEach(button => {
            button.classList.toggle('active', button.getAttribute('data-category') === categoryId);
        });

        this.filterMenuItems();
    }

    showLoadingOverlay(show) {
        const overlay = document.querySelector('.loading-overlay');
        overlay.classList.toggle('active', show);
    }
}

// Initialize menu manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.menuManager = new MenuManager();
});
