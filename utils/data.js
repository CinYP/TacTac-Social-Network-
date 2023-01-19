const names = [
    'Aaran',
    'Aaren',
    'Aarez',
    'Aarman',
    'Aaron',
    'Aaron-James',
    'Aarron',
    'Aaryan',
    'Aaryn',
    'Aayan',
    'Aazaan',
    'Abaan',
    'Abbas',
    'Abdallah',
    'Abdalroof',
    'Abdihakim',
    'Abdirahman',
    'Abdisalam',
    'Abdul',
    'Abdul-Aziz',
    'Abdulbasir',
    'Abdulkadir',
    'Abdulkarem',
    'Ze',
    'Zechariah',
    'Zeek',
    'Zeeshan',
    'Zeid',
    'Zein',
    'Zen',
    'Zendel',
    'Zenith',
    'Zennon',
    'Zeph',
    'Zerah',
    'Zhen',
    'Zhi',
    'Zhong',
    'Zhuo',
    'Zi',
    'Zidane',
    'Zijie',
    'Zinedine',
    'Zion',
    'Zishan',
    'Ziya',
    'Ziyaan',
    'Zohaib',
    'Zohair',
    'Zoubaeir',
    'Zubair',
    'Zubayr',
    'Zuriel',
    ``,
  ];
  
  const thoughts = [
    '"I am in the right place at the right time, doing the right thing," late self-help author and positive affirmations queen Louise Hay wrote in her book You Can Heal Your Life.',
    'Conscious breathing is my anchor.',
    'You are loved just for being who you are, just for existing',
    'The chance to love and be loved exists no matter where you are',
    'courage starts with showing up and letting ourselves be seen.',
    'Make way for the unprecedented and watch your reality rearrange yourself.',
    'Open your heart and drink this glorious day.',
    'Hello world!',
    'Another beautiful day on Earth.',
    'Am I good enough? Yes I am.',
    'The perfect moment is this one.',
  ];
  
  
  const users = [];
  
  // Get a random item given an array
  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  // Gets a random user
  const getRandomName = () =>
    `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;
  
    //change to get a random username  
  // Function to generate random videos that we can add to the database. Includes video responses.
  const getRandomThoughts = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        thoughtText: getRandomArrItem(thoughts),
        username: getRandomName(),
        reactions:{
          reactionbody: getRandomArrItem(thoughts),
          username: getRandomName(),
        }, 
      });
    }
    return results;
  };
  
  // Export the functions for use in seed.js
  module.exports = { getRandomName, getRandomThoughts };
  