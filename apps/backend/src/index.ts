import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const app = new Elysia()
  .use(cors())  
  .get("/", () => "Hello Elysia")
  .get('/surveys', async () => {
    const allSurveys = await prisma.survey.findMany()
    return allSurveys
  })
  .get('/answers', async () => {
    const allAnswers = await prisma.answer.findMany()
    return allAnswers
  })
  .get('/survey/:id', async ({ params }) => {
    await prisma.survey.findUnique({
      where: {
        id: params.id
      }
    })
  }, {
    params: t.Object({
      id: t.String()
    })
  })
  .get('/survey/:id/results', async ({ params }) => {
    const allSurveys = await prisma.answer.findMany()
    return allSurveys.find((answer) => answer.surveyId === params.id)
  },{
    params: t.Object({
      id: t.String()
    })
  })
  .post('/survey/:id/results', async ({ body, params }) => {
    if (body.content) {
      await prisma.answer.create({
        data: {
          content: body.content,
          surveyId: params.id
      }})
    }
  }, {
    body: t.Object({
      content: t.String()
    }),
    params: t.Object({
      id: t.String()
    })
  })
  .post('/surveys', async ({ body }) => {
    if(body.title && body.description) {
      await prisma.survey.create({
        data: {
          title: body.title,
          description: body.description
        }
      })
    }
  }, {
    body: t.Object({
      title: t.String(),
      description: t.String()
    })
  })
  .put('/survey/:id', async({ body, params }) => {
    if(body.title || body.description) {
      await prisma.survey.update({
        where: { id: params.id },
        data: {
          title: body.title,
          description: body.description
        }
      })
    }
  }, {
    body: t.Object({
      title: t.String(),
      description: t.String()
    }),
    params: t.Object({
      id: t.String()
    })
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app
