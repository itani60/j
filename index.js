// API URL for smartphone data
const SMARTPHONE_API_URL = 'https://xf9zlapr5e.execute-api.af-south-1.amazonaws.com/smartphones';

// Make API URL globally available
window.SMARTPHONE_API_URL = SMARTPHONE_API_URL;

/**
 * Shuffle array to randomize order
 * @param {Array} array - The array to shuffle
 * @returns {Array} - The shuffled array
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Load and display smartphone products from API in the products grid
 */
async function loadSmartphoneProductsGrid() {
    try {
        const productsGrid = document.querySelector('.products-grid');
        if (!productsGrid) {
            console.error('Products grid not found');
            return;
        }

        // Show loading state
        productsGrid.innerHTML = `
            <div class="loading-state" style="grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px 0;">
                <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: #ef4444; margin-bottom: 1rem;"></i>
                <p style="color: #64748b;">Loading smartphone deals...</p>
            </div>
        `;

        // Fetch smartphone data from API
        const smartphoneProducts = await fetchSmartphoneData();

        if (!smartphoneProducts || smartphoneProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px 0;">
                    <i class="fas fa-search" style="font-size: 3rem; color: #cbd5e1; margin-bottom: 1rem;"></i>
                    <h3 style="color: #334155; margin-bottom: 0.5rem;">No smartphone deals available</h3>
                    <p style="color: #64748b;">Please check back later for the latest deals.</p>
                </div>
            `;
            return;
        }

        // Clear loading state and populate with real data
        productsGrid.innerHTML = '';

        // Shuffle products to randomize display order
        const shuffledProducts = shuffleArray([...smartphoneProducts]);
        
        // Display up to 12 products from the shuffled array (4 slides x 3 products)
        const displayProducts = shuffledProducts.slice(0, 12);
        
        displayProducts.forEach(product => {
            const productCard = createSmartphoneProductCardForGrid(product);
            productsGrid.appendChild(productCard);
        });
        
        // Initialize carousel with indicators
        initializeCarouselWithIndicators(displayProducts.length);

    } catch (error) {
        console.error('Error loading smartphone products grid:', error);
        
        const productsGrid = document.querySelector('.products-grid');
        if (productsGrid) {
            productsGrid.innerHTML = `
                <div class="error-state" style="grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px 0;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ef4444; margin-bottom: 1rem;"></i>
                    <h3 style="color: #334155; margin-bottom: 0.5rem;">Failed to load smartphone deals</h3>
                    <p style="color: #64748b; margin-bottom: 1rem;">${error.message}</p>
                    <button onclick="loadSmartphoneProductsGrid()" class="retry-btn" style="padding: 0.75rem 1.5rem; background: #ef4444; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">Retry</button>
                </div>
            `;
        }
    }
}

// Mobile Sidebar Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggleBtn = document.getElementById('mobileToggleBtn');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarClose = document.getElementById('sidebarClose');

    // Open sidebar when hamburger menu is clicked
    if (mobileToggleBtn) {
        mobileToggleBtn.addEventListener('click', function() {
            mobileSidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

    // Close sidebar when close button is clicked
    if (sidebarClose) {
        sidebarClose.addEventListener('click', function() {
            closeSidebar();
        });
    }

    // Close sidebar when overlay is clicked
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            closeSidebar();
        });
    }

    // Close sidebar when clicking on regular sidebar items and submenu links
    const regularSidebarItems = document.querySelectorAll('.sidebar-item:not(.submenu-item), .submenu .item a');
    regularSidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            closeSidebar();
        });
    });

    // Function to close sidebar
    function closeSidebar() {
        mobileSidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Close sidebar on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileSidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
});

// Toggle submenu function (matching demo implementation)
function toggleSubmenu(element) {
    const item = element.parentElement; // .item
    const submenu = item.querySelector(':scope > .submenu'); // direct child submenu
    const isActive = item.classList.contains('active');

    // Close all sibling submenus at the same level
    const siblings = item.parentElement.querySelectorAll(':scope > .item');
    siblings.forEach(sibling => {
        if (sibling !== item) sibling.classList.remove('active');
        // Also close any nested submenus within siblings
        sibling.querySelectorAll('.item.active').forEach(nested => nested.classList.remove('active'));
    });

    // Toggle current item
    if (!isActive) {
        item.classList.add('active');
        // Optionally animate submenu items
        if (submenu) {
            const submenuItems = submenu.querySelectorAll(':scope > .item');
            submenuItems.forEach((submenuItem, index) => {
                submenuItem.classList.remove('slide-in'); // reset
                setTimeout(() => {
                    submenuItem.classList.add('slide-in');
                }, index * 50);
            });
        }
    } else {
        item.classList.remove('active');
        // Also close any nested submenus when collapsing
        if (submenu) {
            submenu.querySelectorAll('.item.active').forEach(nested => nested.classList.remove('active'));
        }
    }
}

// Make toggleSubmenu globally available
window.toggleSubmenu = toggleSubmenu;

// Login Modal Integration
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.querySelector('.login-btn');
    const signInBtn = document.querySelector('.sign-in-btn');

    // Open login modal when login button is clicked
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Trigger our custom modal
            if (window.showAuthModal) {
                window.showAuthModal();
            }
        });
    }

    // Open login modal when sign in button is clicked
    if (signInBtn) {
        signInBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Trigger our custom modal
            if (window.showAuthModal) {
                window.showAuthModal();
            }
        });
    }
});
