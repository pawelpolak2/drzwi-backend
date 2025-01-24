import { useMutation, useQuery } from "@tanstack/react-query";
import { trpc } from "../config/trpc";

type ResultType = Awaited<ReturnType<typeof trpc.userEndpoint.query>>;

export function useLogin(onSuccess: (data: ResultType) => void) {
  const { mutate, data, status, reset } = useMutation({ 
    mutationKey: ['user'], 
    mutationFn: async (password: string) => trpc.userEndpoint.query({ password }),
    onSuccess,
  })
  return {
    login: mutate,
    data,
    status,
    reset,
  }
}
