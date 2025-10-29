from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Navigate to the homepage
    page.goto("http://localhost:8000")

    # Click the dark mode toggle
    page.click("#theme-toggle")
    page.wait_for_timeout(500) # Wait for theme to apply

    # Take a screenshot of dark mode
    page.screenshot(path="jules-scratch/verification/dark_mode.png")

    # Reload the page to check persistence
    page.reload()
    page.wait_for_timeout(500)

    # Verify dark mode is still active
    assert page.eval_on_selector("html", "el => el.getAttribute('data-theme')") == "dark"

    # Switch to mobile viewport
    page.set_viewport_size({"width": 375, "height": 667})

    # Open the translate widget
    page.click("#google_translate_element")

    # This is a bit tricky as the widget is in an iframe. We'll just take a screenshot
    # of the whole page to show the banner is visible and styled.
    page.wait_for_timeout(1000) # Wait for widget to appear
    page.screenshot(path="jules-scratch/verification/translate_widget_mobile.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
