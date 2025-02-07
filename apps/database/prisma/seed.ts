import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const survey1 = await prisma.survey.create({
    data: {
        id: '88006ba6-1378-4832-9970-1a7e62397084', 
        title: 'some survey title 1',
        description: 'some survey desc 1',
        question: 'what is your name'
    },
  })

  const survey2 = await prisma.survey.create({
    data: {
        id: '15273f79-d70f-4c4d-938d-98db9bd3f4e1',
        title: 'test123',
        description: 'hello description',
        question: 'what is your occupation'
    },
  })

  const answer1 = await prisma.answer.create({
    data: {
      content: 'yes great',
      surveyId: '15273f79-d70f-4c4d-938d-98db9bd3f4e1'
    },
  })

  console.log({ survey1, survey2, answer1 })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })