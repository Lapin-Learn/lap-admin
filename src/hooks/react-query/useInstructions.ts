import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createInstruction, getInstruction, updateInstruction } from "@/services/instructions";

import { useToast } from "../use-toast";

const InstructionKeys = {
  key: ["instruction"],
  detail: (id: number) => [...InstructionKeys.key, id],
};

export const useGetInstruction = (questionTypeId: number) => {
  return useQuery({
    queryKey: InstructionKeys.detail(questionTypeId),
    queryFn: () => getInstruction(questionTypeId),
  });
};

export const useCreateInstruction = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: createInstruction,
    onSuccess: (returnData) => {
      queryClient.setQueryData(InstructionKeys.detail(returnData.questionTypeId), returnData);
      toast({
        title: "Create instruction successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create instruction",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateInstruction = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: updateInstruction,
    onSuccess: (returnData) => {
      queryClient.setQueryData(InstructionKeys.detail(returnData.questionTypeId), returnData);
      toast({
        title: "Update instruction successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update instruction",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
