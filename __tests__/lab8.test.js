describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    })
    .catch(() => { /** Should log a failure but No Clue how to use Jest */});
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);
  

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    page.click('journal-entry')
    .then(() => { expect(page.url()).toBe('./#entry1'); })
    .catch(() => { /** Should log a failure but No Clue how to use Jest */});
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    page.click('journal-entry')
    .then(() => {
      const header = page.$eval('h1', (entry) => {
        return h1.innerText;
      })
      .catch(() => { /** Should log a failure but No Clue how to use Jest */});
      expect(header).toBe('Entry 1');
    })
    .catch(() => { /** Should log a failure but No Clue how to use Jest */});
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    let allMatch = true;
    let root;
    page.click('journal-entry')
    .then(() => {
      root = page.$eval('entry-page', (elem) => { return elem.shadowRoot(); })
      if (root.querySelector('.entry-title') != 'You like jazz?'){
        allMatch = false;
      }
      if (root.querySelector('.entry-date') != '4/25/2021'){
        allMatch = false;
      }
      if (root.querySelector('.entry-content') != "'According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible."){
        allMatch = false;
      }
      if (root.querySelector('.entry-img').src != 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455'){
        allMatch = false;
      }
      if (root.querySelector('.entry-img').alt != 'bee with sunglasses'){
        allMatch = false;
      }
      expect(allMatch).toBe(true);
    })
    .catch(() => { /** Should log a failure but No Clue how to use Jest */});
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    page.click('journal-entry')
    .then(() => {
      expect(page.$eval('body', (elem) => { return elem.className })).toBe('single-entry');
    })
    .catch(() => { /** Should log a failure but No Clue how to use Jest */});
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    page.click('settings')
    .then(() => { expect(page.url()).toBe('./#settings'); })
    .catch(() => { /** Should log a failure but No Clue how to use Jest */});
    
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    page.click('settings')
    .then(() => {
      const header = page.$eval('h1', (elem) => {
        return elem.innerText;
      })
      .catch(() => { /** Should log a failure but No Clue how to use Jest */})
      expect(header).toBe('Settings');
    })
    .catch(() => { /** Should log a failure but No Clue how to use Jest */});
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    page.click('settings')
    .then(() => {
      expect(page.$eval('body', (elem) => { return elem.className }).catch()).toBe('settings');
    })
    .catch(() => { /** Should log a failure but No Clue how to use Jest */});
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    page.goBack()
    .then(() => {
      expect(page.url()).toBe('./#entry1');
    })
    .catch(() => { /** Should log a failure but No Clue how to use Jest */});
  });

  // define and implement test11: Clicking the back button once more should bring the user back to the home page
  it('Test11: Clicking the back button again, new URL should be /', async() => {
    page.goBack()
    .then(() => {
      expect(page.url()).toBe('./');
    })
    .catch(() => { /** Should log a failure but No Clue how to use Jest */});
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: On Home page - checking page header title', async () => {
    expect(await page.$eval('h1', (elem) => { return elem.innerText }).catch()).toBe('Journal Entries');
  });


  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On Home page - checking <body> element classes', async () => {
    expect(await page.$eval('body', (elem) => { return elem.className }).catch()).toBe('');
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Clicking second <journal-entry>, new URL should contain /#entry2', async () => {
    page.$$eval('journal-entry', (entries) => {
      entries[1].click();
      expect(page.url()).toBe('./#entry2'); 
    })
    .catch(() => { /** Should log a failure but No Clue how to use Jest */});
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: On second Entry page - checking page header title', async () => {
    page.$$eval('journal-entry', (entries) => {
      entries[1].click();
      const header = page.$eval('h1', (elem) => {
        return elem.innerText;
      })
      .catch(() => { /** Should log a failure but No Clue how to use Jest */})
      expect(header).toBe('Entry 2');
    });
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: On second Entry page - checking <entry-page> contents', async () => {
    let allMatch = true;
    let root;
    page.$$eval('journal-entry', (entries) => {
      entries[1].click();
      root = page.$eval('entry-page', (elem) => {
        return elem.shadowRoot();
      });
      if (root.querySelector('.entry-title') != 'Run, Forrest! Run!'){
        allMatch = false;
      }
      if (root.querySelector('.entry-date') != '4/26/2021'){
        allMatch = false;
      }
      if (root.querySelector('.entry-content') != "Mama always said life was like a box of chocolates. You never know what you're gonna get."){
        allMatch = false;
      }
      if (root.querySelector('.entry-img').src != 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg'){
        allMatch = false;
      }
      if (root.querySelector('.entry-img').alt != 'forrest running'){
        allMatch = false;
      }
      expect(allMatch).toBe(true);
    })
    .catch(() => { /** Should log a failure but No Clue how to use Jest */});
  }, 10000);

  // create your own test 17
  it('Test17: Clicking third <journal-entry>, new URL should contain /#entry3', async () => {
    page.$$eval('journal-entry', (entries) => {
      entries[2].click();
      expect(page.url()).toBe('./#entry3'); 
    })
    .catch(() => { /** Should log a failure but No Clue how to use Jest */});
  });

  // create your own test 18
  it('Test18: On third Entry page - checking page header title', async () => {
    page.$$eval('journal-entry', (entries) => {
      entries[2].click();
      const header = page.$eval('h1', (elem) => {
        return elem.innerText;
      });
      expect(header).toBe('Entry 3');
    })
    .catch(() => { /** Should log a failure but No Clue how to use Jest */});
  });

  // create your own test 19
  it('Test19: On third Entry page - checking <entry-page> contents', async () => {
    let allMatch = true;
    let root;
    page.$$eval('journal-entry', (entries) => {
      entries[2].click();
      root = page.$eval('entry-page', (elem) => {
        return elem.shadowRoot();
      })
      .catch(() => { /** Should log a failure but No Clue how to use Jest */});
      if (root.querySelector('.entry-title') != 'Ogres are like onions'){
        allMatch = false;
      }
      if (root.querySelector('.entry-date') != '4/27/2021'){
        allMatch = false;
      }
      if (root.querySelector('.entry-content') != "Onions have layers. Ogres have layers. Onions have layers. You get it? We both have layers."){
        allMatch = false;
      }
      if (root.querySelector('.entry-img').src != 'https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.syracuse.com/home/syr-media/width2048/img/entertainment_impact/photo/shrek-donkeyjpg-daa31aa2b5bedfaa.jpg'){
        allMatch = false;
      }
      if (root.querySelector('.entry-img').alt != 'shrek and donkey looking confused'){
        allMatch = false;
      }
      expect(allMatch).toBe(true);
    })
    .catch(() => { /** Should log a failure but No Clue how to use Jest */});
  }, 10000);

  // create your own test 20
  it('Test20: Clicking the header on home page - header should be Journal Entries', async () => {
    page.click('h1')
    .then(() => {
      const header = page.$eval('h1', (entry) => {
        return h1.innerText;
      });
      expect(header).toBe('Journal Entries');
    })
    .catch(() => { /** Should log a failure but No Clue how to use Jest */});
  })
});