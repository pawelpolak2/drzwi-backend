import { useMutation, useQuery } from "@tanstack/react-query";
import { trpc } from "../config/trpc";

type ResultType = Awaited<ReturnType<typeof trpc.openEndpoint.query>>;

export function useOpenDoor(onSuccess: (data: ResultType) => void) {
  const { mutate, data, status, reset } = useMutation({ 
    mutationKey: ['open'], 
    mutationFn: async (password: string) => trpc.openEndpoint.query({ password }),
    onSuccess,
  })
  return {
    openDoor: mutate,
    data,
    status,
    reset,
  }
}
