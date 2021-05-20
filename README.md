# Lab8_Starter
Lab Members:
- Nathan Rinker
- Akar Singh

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)  
A

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.  
The 'message' feature seems too large to perform a unit test on. Rather, it should be broken into parts for writing, sending, and receiving messages. Unit tests seem more applicable to **those** broken down pieces instead.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
Yes, we would use a unit test on this feature. In this case, we are not testing the actual funtionality of a messaging feature, but are instead testing our application's ability to limit text in an input field, something that is rather small scale. Also, since other code might rely on this 'piece' performing correctly, a unit test would be very valuable.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
Probably Chromium won't open up, or at least no browser UI.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
` {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
    page.click('header > img');
} `