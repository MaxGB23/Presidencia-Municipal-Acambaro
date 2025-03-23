import { test, expect } from '@playwright/test';

test.describe("authenticated user", () => {
  test("can access dashboard page", async ({ page }) => {
    await page.goto("/auth/login");

    const emailInput = page.getByPlaceholder("Ingresa tu correo");
    const passwordInput = page.locator('input[name="password"]');

    await emailInput.fill("maxgonzalezballesteros@gmail.com");
    await passwordInput.fill("1234");

    const signinButton = page.getByRole("button", { name: /iniciar sesión/i });
    await signinButton.click();

    await page.waitForURL("/dashboard");

    // await page.goto("/dashboard");
    await expect(
      page.getByRole("heading", { name: /panel de administración/i })
    ).toBeVisible();
  });
});

