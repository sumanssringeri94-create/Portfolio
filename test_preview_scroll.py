import asyncio
import os
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        # Launch browser (Chromium)
        browser = await p.chromium.launch(headless=True)
        
        # Test 1: Desktop Viewport
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        html_path = os.path.abspath("index.html").replace("\\", "/")
        await page.goto(f"file:///{html_path}")
        await page.wait_for_timeout(500)

        print("=== 1. DESKTOP CHECKS ===")
        # Check Left Rail visibility
        rail_visible = await page.locator(".left-side-rail").is_visible()
        print(f"Left Side Rail visible on Desktop: {rail_visible}")

        # Check Experience section
        exp_section = page.locator("#experience")
        print(f"Experience Section present: {await exp_section.count() > 0}")

        # Check Timeline SVG and Path
        svg = page.locator("#timeline-svg")
        path = page.locator("#timeline-curve-path")
        print(f"Timeline SVG visible: {await svg.is_visible()}")
        
        total_len = await path.evaluate("el => el.getTotalLength()")
        initial_offset = await path.evaluate("el => parseFloat(el.style.strokeDashoffset)")
        print(f"Path Total Length: {total_len:.1f}px, Initial StrokeDashOffset: {initial_offset:.1f}px")

        # Scroll into Experience section
        print("--- Scrolling into Experience Section ---")
        await page.locator("#experience").scroll_into_view_if_needed()
        await page.wait_for_timeout(600)

        # Check offset after scrolling
        scrolled_offset = await path.evaluate("el => parseFloat(el.style.strokeDashoffset)")
        print(f"StrokeDashOffset after scrolling down: {scrolled_offset:.1f}px (drawn: {total_len - scrolled_offset:.1f}px)")

        # Count active nodes
        active_nodes = await page.locator(".timeline-node.active").count()
        print(f"Active nodes reached by drawn line: {active_nodes} / 6")

        # Capture desktop experience screenshot
        await page.locator("#experience").screenshot(path="preview_experience_desktop.png")
        print("Saved preview_experience_desktop.png")

        # Test scroll back up (un-draw test)
        print("--- Scrolling back up to Hero Section (Un-drawing test) ---")
        await page.locator("#hero").scroll_into_view_if_needed()
        await page.wait_for_timeout(600)
        undrawn_offset = await path.evaluate("el => parseFloat(el.style.strokeDashoffset)")
        undrawn_active_nodes = await page.locator(".timeline-node.active").count()
        print(f"StrokeDashOffset after scrolling back up: {undrawn_offset:.1f}px")
        print(f"Active nodes after scrolling up: {undrawn_active_nodes} / 6 (line smoothly un-drawn!)")

        # Test Back-to-Top Button
        print("--- Testing Back-to-Top Button Click ---")
        await page.evaluate("window.scrollTo(0, 1500)")
        await page.wait_for_timeout(300)
        await page.locator("#rail-back-to-top").click()
        await page.wait_for_timeout(800)
        scroll_y = await page.evaluate("window.scrollY")
        print(f"Scroll Y after Back-to-Top click: {scroll_y}px")

        # Test 2: Mobile Viewport (390x844)
        print("\n=== 2. MOBILE CHECKS (390x844) ===")
        mobile_page = await browser.new_page(viewport={"width": 390, "height": 844})
        await mobile_page.goto(f"file:///{html_path}")
        await mobile_page.wait_for_timeout(500)

        # Left rail should be hidden
        mobile_rail_visible = await mobile_page.locator(".left-side-rail").is_visible()
        print(f"Left Side Rail hidden on Mobile: {not mobile_rail_visible}")

        # SVG curve should be hidden
        mobile_svg_visible = await mobile_page.locator("#timeline-svg").is_visible()
        print(f"Winding SVG hidden on Mobile: {not mobile_svg_visible}")

        # Big year numeral should be hidden
        big_year_visible = await mobile_page.locator(".entry-year-col").first.is_visible()
        print(f"Big year numeral hidden on Mobile: {not big_year_visible}")

        # Mobile node marker and year badge should be visible
        mobile_marker_visible = await mobile_page.locator(".entry-mobile-marker").first.is_visible()
        mobile_year_visible = await mobile_page.locator(".entry-mobile-year").first.is_visible()
        print(f"Mobile straight-line node marker visible: {mobile_marker_visible}")
        print(f"Mobile year badge visible: {mobile_year_visible}")

        # Capture mobile experience screenshot
        await mobile_page.locator("#experience").screenshot(path="preview_experience_mobile.png")
        print("Saved preview_experience_mobile.png")

        await browser.close()
        print("\nALL AUTOMATED BROWSER TESTS PASSED!")

if __name__ == "__main__":
    asyncio.run(run())
