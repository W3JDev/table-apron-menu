// Language handling
class LanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.init();
    }

    init() {
        // Set initial language
        this.setLanguage(localStorage.getItem('preferredLanguage') || 'en');
        
        // Add event listeners to language buttons
        document.querySelectorAll('.language-selector button').forEach(button => {
            button.addEventListener('click', () => {
                this.setLanguage(button.getAttribute('data-lang'));
            });
        });
    }

    setLanguage(lang) {
        if (!window.menuData.languages[lang]) return;
        
        this.currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);

        // Update UI language
        this.updateUI();
        
        // Update language selector buttons
        document.querySelectorAll('.language-selector button').forEach(button => {
            button.classList.toggle('active', button.getAttribute('data-lang') === lang);
        });

        // Show toast notification
        this.showToast(`Language changed to ${window.menuData.languages[lang].name}`);
    }

    updateUI() {
        const langData = window.menuData.languages[this.currentLang];

        // Update search placeholder
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.placeholder = langData.searchPlaceholder;
        }

        // Update category buttons
        document.querySelectorAll('.category-btn').forEach(button => {
            const categoryId = button.getAttribute('data-category');
            if (categoryId === 'all') {
                button.textContent = langData.allCategories;
                return;
            }

            const category = window.menuData.categories.find(c => c.id === categoryId);
            if (category) {
                button.textContent = category[`name_${this.currentLang}`];
            }
        });

        // Update menu items
        document.querySelectorAll('.menu-item').forEach(item => {
            const itemId = item.getAttribute('data-id');
            const menuItem = window.menuData.menuItems.find(i => i.id === itemId);
            
            if (menuItem) {
                // Update name and description
                const nameElement = item.querySelector('.item-name');
                const descElement = item.querySelector('.item-description');
                
                if (nameElement) {
                    nameElement.textContent = menuItem[`name_${this.currentLang}`];
                }
                if (descElement && menuItem[`description_${this.currentLang}`]) {
                    descElement.textContent = menuItem[`description_${this.currentLang}`];
                }

                // Update labels
                const paxElement = item.querySelector('.pax-info');
                const dietaryElement = item.querySelector('.dietary-info');
                const allergensElement = item.querySelector('.allergens-info');

                if (paxElement && menuItem.pax) {
                    paxElement.textContent = `${langData.paxLabel}: ${menuItem.pax}`;
                }
                if (dietaryElement && menuItem.dietary) {
                    dietaryElement.textContent = `${langData.dietaryLabel}: ${menuItem.dietary}`;
                }
                if (allergensElement && menuItem.allergens) {
                    allergensElement.textContent = `${langData.allergensLabel}: ${menuItem.allergens.join(', ')}`;
                }
            }
        });
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast scale-in';
        toast.textContent = message;

        const container = document.querySelector('.toast-container');
        container.appendChild(toast);

        // Remove toast after animation
        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => {
                container.removeChild(toast);
            }, 300);
        }, 3000);
    }

    getCurrentLanguage() {
        return this.currentLang;
    }
}

// Initialize language manager
window.languageManager = new LanguageManager();
