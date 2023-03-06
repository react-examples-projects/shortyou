import useSWRMutation from "swr/mutation";

import { createPost } from "../helpers/api";

export default function usePostCreate() {
  const { trigger, isMutating, error } = useSWRMutation(
    "createPost",
    (_, { arg }) => createPost(arg)
  );
  const create = (data) => trigger(data);
  
  return {
    create,
    isLoading: isMutating,
    error,
  };
}
