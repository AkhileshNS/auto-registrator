const electron = require("electron");
const puppeteer = require("puppeteer-core");
const cp = require("child_process");
const constants = require('./constants');

const autoRegister = async (port, name, usnValue, pwdValue, branch, index) => {
  // Initialization
  cp.spawn(electron, [". --remote-debugging-port=" + port], {
    shell: true
  });

  try {
    // Connecting
    const browser = await puppeteer.connect({
      browserURL: "http://localhost:" + port,
      defaultViewport: { width: 1366, height: 768 }
    });
    const [page] = await browser.pages();

    // Managing Login
    await page.waitForNavigation();
    let usn = await page.$("#usn");
    let pwd = await page.$("#pwd");
    let btn = await page.$("button");
    await page.evaluate((el, value) => {el.value = value}, usn, usnValue);
    await page.evaluate((el, value) => {el.value = value}, pwd, pwdValue);
    await page.evaluate((el) => {el.click()}, btn);
    await page.waitForNavigation();

    // Checking if button is not disabled and clicking it if it is
    let i = 0;
    while(true) {
      // Selecting Math Department
      let dept = await page.$("#dept");
      if (!dept) {
        console.log(name + " - Attempt " + i++ + ": failed (not loaded properly)");
        await page.goto("http://202.129.209.50/ug_ie/studhp.php");
        continue;
      }

      await page.evaluate((el, value) => {el.value = value}, dept, branch);
      await page.evaluate((el) => {el.onchange()}, dept);
      await page.waitForSelector("button");

      let buttons = await page.$$("button");
      if (!buttons) {
        console.log(name + " - Attempt " + i++ + ": failed (not loaded properly)");
        await page.goto("http://202.129.209.50/ug_ie/studhp.php");
        continue;
      }

      let disabled = await (await buttons[index].getProperty("disabled")).jsonValue();
      if (disabled) {
        console.log(name + " - Attempt " + i++ + ": failed (still disabled)");
        await page.goto("http://202.129.209.50/ug_ie/studhp.php");
      } else {
        console.log(name + " - Attempt " + i++ + ": fsuccess");
        await page.evaluate((el) => {el.click()}, buttons[index]);
        break;
      }
    }
  } catch (err) {
    console.log(err);
  }
};

let name = process.env.NAME || "Akhilesh";
autoRegister(
  constants[name].port, 
  constants[name].name, 
  constants[name].usn, 
  constants[name].password, 
  constants[name].branch, 
  constants[name].option
); 

/* const autoregisterMultiple = async arr => {
  let promises = [];

  (Object.prototype.toString.call(arr).toLowerCase()==="[object array]" 
  ? arr : []).forEach(item => promises.push(autoregister(...item)));

  await Promise.all(promises);
}

autoregisterMultiple([
  [9001, "AkhileshNS", "1BM16IS009", "7U1vJYa", "MAT", 1],
  [9002, "Anirban", "1BM16IS015", "hTl63Ah", "MAT", 1]
]); */
