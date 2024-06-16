import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const MyComponent = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await axios.get(
        "https://api.github.com/repos/TanStack/query"
      );
      return response.data;
    },
    retry: false,
  });

  if (isPending) return <p>"Loading..."</p>;

  if (error) return <p>{"An error has occurred: " + error.message}</p>;

  return (
    <Container>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>
      <strong>✨ {data.stargazers_count}</strong>
      <strong>🍴 {data.forks_count}</strong>
    </Container>
  );
};
