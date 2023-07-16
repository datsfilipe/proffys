const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
  proffyValue = {
    name: 'Filipe Lima',
    avatar: 'https://avatars2.githubusercontent.com/u/62335242?s=460&u=fcebd2214dd769b215f99c1eba3eed3077347ad9&v=4',
    whatsapp: '99988674532',
    bio: 'Instrutor de Química',
  }

  classValue = {
    subject: 'Química',
    cost: '20',
  }

  classScheduleValues = [
    {
      weekday: 1,
      time_from: 720,
      time_to: 1220
    },
    {
      weekday: 0,
      time_from: 520,
      time_to: 1220
    }
  ]

  const selectedProffys = await db.all('SELECT * FROM proffys')

  const selectClassesAndProffys = await db.all(`
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE classes.proffy_id = 1;
  `)
  const selectClassesSchedules = await db.all(`
    SELECT class_schedule.*
    FROM class_schedule
    WHERE class_schedule.class_id = 1
    AND class_schedule.weekday = "0"
    AND class_schedule.time_from <= "620"
  `)

  console.log(selectClassesSchedules)
})
