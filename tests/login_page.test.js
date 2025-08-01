const { test, expect } = require('@playwright/test');

async function login(page, email, password) {
  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[type="password"]').fill(password);
  await page.locator('button').click();
}

async function checkError(page, expectedErrorText){
    const errorElement = await page.locator('//div[contains(@class, "login-container")]//div[contains(@class, "error-message")]');
    const errorText = await errorElement.innerText();
    expect(errorText).toContain(expectedErrorText);
}


test('Login page tests', async ({ page }) => {
  await page.goto('file:///path/to/your/html/file.html'); // Replace with actual path

  // Valid login credentials
  await login(page, "john.doe@example.com", "P@ssw0rd123");
  expect(page).toHaveURL("file:///path/to/your/html/file.html"); //check if the page reloads after successful login

  //Valid login credentials
  await login(page, "alice.smith@example.com", "alice@321");
  expect(page).toHaveURL("file:///path/to/your/html/file.html"); //check if the page reloads after successful login

  //Invalid email format
  await login(page, "invalid_email_format", "short");
  await checkError(page, "Invalid email format");
  
  //Empty email
  await login(page, "", "noemail@123");
  await checkError(page, "Email cannot be empty");

  //Empty password
  await login(page, "harry.potter@hogwarts.edu", "");
  await checkError(page, "Password cannot be empty");

});