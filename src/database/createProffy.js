module.exports = async function(db, {proffyValue, classValue, classScheduleValue}) {    // Inserir dados na tabela de teachers
  const insertedProffy = await db.run(`
    INSERT INTO proffys (
      name,
      avatar,
      whatsapp,
      bio
    ) VALUES (
      "${proffyValue.name}",
      "${proffyValue.avatar}",
      "${proffyValue.whatsapp}",
      "${proffyValue.bio}"
    );
  `)

  const proffy_id = insertedProffy.lastID

  const insertedClass = await db.run(`
    INSERT INTO CLASSES (
      subject,
      cost,
      proffy_id
    ) VALUES (
      "${classValue.subject}",
      "${classValue.cost}",
      "${proffy_id}"
    );
  `)

  const class_id = insertedClass.lastID

  const insertedAllClassScheduleValues = classScheduleValue.map((classScheduleValue) => {
    return (`
      INSERT INTO class_schedule (
        class_id,
        weekday,
        time_from,
        time_to
      ) VALUES (
        "${class_id}",
        "${classScheduleValue.weekday}",
        "${classScheduleValue.time_from}",
        "${classScheduleValue.time_to}"
      );
    `)
  })

  await Promise.all(insertedAllClassScheduleValues)
}
