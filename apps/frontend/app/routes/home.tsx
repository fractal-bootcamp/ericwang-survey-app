import type { Route } from "./+types/home";
import { SurveyListView } from "../components/SurveyListView/SurveyListView";
import apiClient from "client"
import { useLoaderData } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Survey App" },
    { name: "description", content: "A full-stack survey app" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const surveys = await apiClient.surveys.get();
  return surveys;
}

export default function Home() {
  const surveys = useLoaderData<typeof loader>()
  console.log(surveys)

  return <SurveyListView surveys={surveys?.data} />;
}
