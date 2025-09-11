/**
 * Tablet Debug Script
 * This script helps debug tablet detection and styling issues
 */

(function() {
    'use strict';
    
    function debugTabletDetection() {
        const userAgent = navigator.userAgent.toLowerCase();
        const isIPad = /ipad/i.test(userAgent);
        const isAndroidTablet = /android/i.test(userAgent) && !/mobile/i.test(userAgent);
        const isKindle = /kindle|silk/i.test(userAgent);
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const devicePixelRatio = window.devicePixelRatio;
        
        const debugInfo = {
            userAgent: userAgent,
            isIPad: isIPad,
            isAndroidTablet: isAndroidTablet,
            isKindle: isKindle,
            isTouchDevice: isTouchDevice,
            screenDimensions: `${screenWidth}x${screenHeight}`,
            viewportDimensions: `${viewportWidth}x${viewportHeight}`,
            devicePixelRatio: devicePixelRatio,
            bodyClasses: document.body.className,
            windowDeviceInfo: window.deviceInfo || 'Not available'
        };
        
        console.log('=== TABLET DEBUG INFO ===');
        console.table(debugInfo);
        
        // Check if tablet styles are applied
        const tabletStyle = document.getElementById('tablet-enforcer-styles');
        console.log('Tablet enforcer styles present:', !!tabletStyle);
        
        // Check computed styles for key elements
        const header = document.querySelector('.header');
        const mobileToggle = document.querySelector('.mobile-toggle-btn');
        const searchContainer = document.querySelector('.search-container');
        const mobileSearchContainer = document.querySelector('.mobile-search-container');
        
        if (header) {
            const headerDisplay = window.getComputedStyle(header).display;
            const headerPosition = window.getComputedStyle(header).position;
            console.log('Header display:', headerDisplay, 'position:', headerPosition);
        }
        
        if (mobileToggle) {
            const toggleDisplay = window.getComputedStyle(mobileToggle).display;
            console.log('Mobile toggle display:', toggleDisplay);
        }
        
        if (searchContainer) {
            const searchDisplay = window.getComputedStyle(searchContainer).display;
            console.log('Desktop search display:', searchDisplay);
        }
        
        if (mobileSearchContainer) {
            const mobileSearchDisplay = window.getComputedStyle(mobileSearchContainer).display;
            console.log('Mobile search display:', mobileSearchDisplay);
        }
        
        // Check media queries
        const mediaQueries = [
            '(min-width: 768px) and (max-width: 1024px)',
            '(min-width: 768px) and (max-width: 1366px)',
            '(min-width: 1024px) and (max-width: 1366px) and (orientation: landscape)',
            '(orientation: landscape)'
        ];
        
        console.log('=== MEDIA QUERY MATCHES ===');
        mediaQueries.forEach(query => {
            const matches = window.matchMedia(query).matches;
            console.log(`${query}: ${matches}`);
        });
        
        return debugInfo;
    }
    
    // Run debug on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', debugTabletDetection);
    } else {
        debugTabletDetection();
    }
    
    // Run debug on resize and orientation change
    window.addEventListener('resize', function() {
        setTimeout(debugTabletDetection, 500);
    });
    
    window.addEventListener('orientationchange', function() {
        setTimeout(debugTabletDetection, 500);
    });
    
    // Make debug function globally available
    window.debugTabletDetection = debugTabletDetection;
    
    // Add a visual debug panel
    function createDebugPanel() {
        const panel = document.createElement('div');
        panel.id = 'tablet-debug-panel';
        panel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            max-width: 300px;
            display: none;
        `;
        document.body.appendChild(panel);
        
        // Add toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'Debug';
        toggleBtn.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #ef4444;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
            z-index: 10001;
            font-size: 12px;
        `;
        toggleBtn.onclick = function() {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        };
        document.body.appendChild(toggleBtn);
        
        // Update panel content
        function updatePanel() {
            const info = debugTabletDetection();
            panel.innerHTML = `
                <strong>Tablet Debug Info:</strong><br>
                Screen: ${info.screenDimensions}<br>
                Viewport: ${info.viewportDimensions}<br>
                Touch: ${info.isTouchDevice}<br>
                iPad: ${info.isIPad}<br>
                Android Tablet: ${info.isAndroidTablet}<br>
                Body Classes: ${info.bodyClasses}<br>
                <button onclick="window.debugTabletDetection()" style="margin-top: 5px; padding: 2px 5px; font-size: 10px;">Refresh</button>
            `;
        }
        
        updatePanel();
        
        // Update on changes
        window.addEventListener('resize', updatePanel);
        window.addEventListener('orientationchange', updatePanel);
    }
    
    // Create debug panel after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createDebugPanel);
    } else {
        createDebugPanel();
    }
    
})();

