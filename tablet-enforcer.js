/**
 * Tablet Enforcer Script
 * This script aggressively forces tablet behavior by injecting styles directly
 * and overriding any conflicting CSS rules
 */

(function() {
    'use strict';
    
    // Function to check if device is a tablet
    function isTabletDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        const isIPad = /ipad/i.test(userAgent);
        const isAndroidTablet = /android/i.test(userAgent) && !/mobile/i.test(userAgent);
        const isKindle = /kindle|silk/i.test(userAgent);
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Check if it's a known tablet device
        if (isIPad || isAndroidTablet || isKindle) {
            return true;
        }
        
        // Check screen dimensions for tablets
        if (isTouchDevice && (
            // Standard tablet dimensions
            (screenWidth >= 768 && screenWidth <= 1366) ||
            (screenHeight >= 768 && screenHeight <= 1366) ||
            // Viewport-based detection
            (viewportWidth >= 768 && viewportWidth <= 1366) ||
            (viewportHeight >= 768 && viewportHeight <= 1366)
        )) {
            return true;
        }
        
        return false;
    }
    
    // Function to inject tablet styles
    function injectTabletStyles() {
        if (!isTabletDevice()) return;
        
        // Create style element
        const style = document.createElement('style');
        style.id = 'tablet-enforcer-styles';
        style.textContent = `
            /* Aggressive tablet overrides */
            .header {
                background: white !important;
                color: #333 !important;
                padding: 1rem 0 !important;
                position: fixed !important;
                width: 100% !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                z-index: 1000 !important;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
                transition: all 0.3s ease !important;
                backdrop-filter: blur(10px) !important;
                min-height: 80px !important;
            }
            
            .nav-container {
                max-width: 100% !important;
                margin: 0 auto !important;
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                padding: 0 1.5rem !important;
                gap: 1rem !important;
            }
            
            /* Force mobile toggle button */
            .mobile-toggle-btn {
                display: flex !important;
                flex-direction: column !important;
                justify-content: center !important;
                align-items: center !important;
                width: 50px !important;
                height: 50px !important;
                background: #f8f9fa !important;
                border: 2px solid #e9ecef !important;
                border-radius: 12px !important;
                cursor: pointer !important;
                transition: all 0.3s ease !important;
                gap: 4px !important;
                padding: 10px !important;
                order: -1 !important;
            }
            
            .hamburger-line {
                width: 22px !important;
                height: 3px !important;
                background-color: #6b7280 !important;
                border-radius: 2px !important;
                transition: all 0.3s ease !important;
            }
            
            /* Force mobile account button */
            .mobile-account-btn {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                margin-left: auto !important;
                margin-right: 0 !important;
            }
            
            .mobile-account-link {
                color: #333 !important;
                text-decoration: none !important;
                font-weight: 500 !important;
                font-size: 0.9rem !important;
                padding: 0.6rem 1rem !important;
                border-radius: 20px !important;
                transition: all 0.3s ease !important;
                white-space: nowrap !important;
                background: #f8f9fa !important;
                border: 2px solid #e9ecef !important;
            }
            
            /* Force mobile search container */
            .mobile-search-container {
                display: block !important;
                width: 100% !important;
                margin-top: 0.5rem !important;
                background-color: white !important;
                border: 1px solid #ddd !important;
                border-radius: 8px !important;
                padding: 0.8rem 1rem !important;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
            }
            
            .mobile-search-input {
                width: 100% !important;
                padding: 0.8rem 1rem !important;
                border: 2px solid #e2e8f0 !important;
                border-radius: 25px !important;
                font-size: 0.95rem !important;
                outline: none !important;
                transition: all 0.3s ease !important;
                box-sizing: border-box !important;
                background: #ffffff !important;
            }
            
            /* Force hide desktop elements */
            .search-container {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0 !important;
                width: 0 !important;
                overflow: hidden !important;
            }
            
            .header-links {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0 !important;
                width: 0 !important;
                overflow: hidden !important;
            }
            
            .categories-dropdown {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0 !important;
                width: 0 !important;
                overflow: hidden !important;
            }
            
            /* Force logo centering */
            .logo {
                flex: 1 !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                margin: 0 !important;
                margin-left: 0 !important;
                position: relative !important;
                transform: none !important;
            }
            
            .logo img {
                height: 50px !important;
                width: 220px !important;
                border-radius: 10px !important;
                object-fit: contain !important;
                background: transparent !important;
                filter: contrast(1.2) brightness(1.1) !important;
                transition: all 0.3s ease !important;
            }
            
            /* Force mobile sidebar */
            .mobile-sidebar {
                display: block !important;
                position: fixed !important;
                top: 0 !important;
                left: -100% !important;
                width: 350px !important;
                height: 100vh !important;
                background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%) !important;
                box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1) !important;
                z-index: 1000 !important;
                transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                overflow-y: auto !important;
                border-right: 1px solid #e0e0e0 !important;
            }
            
            .mobile-sidebar.active {
                left: 0 !important;
            }
            
            .sidebar-overlay {
                display: block !important;
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;
                background: rgba(0, 0, 0, 0.5) !important;
                z-index: 999 !important;
                opacity: 0 !important;
                visibility: hidden !important;
                transition: all 0.3s ease !important;
            }
            
            .sidebar-overlay.active {
                opacity: 1 !important;
                visibility: visible !important;
            }
            
            /* Landscape optimizations */
            @media (orientation: landscape) {
                .header {
                    padding: 0.8rem 0 !important;
                    min-height: 70px !important;
                }
                
                .nav-container {
                    padding: 0 1rem !important;
                    gap: 0.8rem !important;
                }
                
                .mobile-toggle-btn {
                    width: 45px !important;
                    height: 45px !important;
                }
                
                .hamburger-line {
                    width: 20px !important;
                    height: 2.5px !important;
                }
                
                .logo img {
                    height: 45px !important;
                    width: 200px !important;
                }
                
                .mobile-account-link {
                    font-size: 0.85rem !important;
                    padding: 0.5rem 0.8rem !important;
                }
                
                .mobile-search-container {
                    margin-top: 0.4rem !important;
                    padding: 0.6rem 0.8rem !important;
                }
                
                .mobile-search-input {
                    padding: 0.7rem 0.9rem !important;
                    font-size: 0.9rem !important;
                }
            }
        `;
        
        // Remove existing enforcer styles if any
        const existingStyle = document.getElementById('tablet-enforcer-styles');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        // Add the new styles
        document.head.appendChild(style);
        
        // Add tablet class to body
        document.body.classList.add('tablet');
        document.body.classList.remove('desktop', 'mobile');
        
        console.log('Tablet enforcer styles applied');
    }
    
    // Function to remove tablet styles
    function removeTabletStyles() {
        const style = document.getElementById('tablet-enforcer-styles');
        if (style) {
            style.remove();
        }
        document.body.classList.remove('tablet');
        console.log('Tablet enforcer styles removed');
    }
    
    // Function to check and apply styles
    function checkAndApplyStyles() {
        if (isTabletDevice()) {
            injectTabletStyles();
        } else {
            removeTabletStyles();
        }
    }
    
    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAndApplyStyles);
    } else {
        checkAndApplyStyles();
    }
    
    // Run on resize and orientation change
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(checkAndApplyStyles, 250);
    });
    
    window.addEventListener('orientationchange', function() {
        setTimeout(checkAndApplyStyles, 200);
    });
    
    // Make functions globally available
    window.isTabletDevice = isTabletDevice;
    window.injectTabletStyles = injectTabletStyles;
    window.removeTabletStyles = removeTabletStyles;
    window.checkAndApplyStyles = checkAndApplyStyles;
    
})();

