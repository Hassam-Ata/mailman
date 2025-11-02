import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addRequestToCollection,
  deleteRequest,
  getAllRequestFromCollection,
  Request,
  saveRequest,
} from "../actions";

export function useGetAllRequestFromCollection(collectionId: string) {
  return useQuery({
    queryKey: ["requests", collectionId],
    queryFn: async () => getAllRequestFromCollection(collectionId),
  });
}

export function useAddRequestToCollection(collectionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: Request) =>
      addRequestToCollection(collectionId, value),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["requests", collectionId] });
    },
  });
}

export function useSaveRequest(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: Request) => saveRequest(id, value),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      console.log(data);
    },
  });
}

export function useDeleteRequest(collectionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => deleteRequest(id),
    onSuccess: () => {
      // Refresh the list of requests in this collection
      queryClient.invalidateQueries({ queryKey: ["requests", collectionId] });
    },
  });
}
