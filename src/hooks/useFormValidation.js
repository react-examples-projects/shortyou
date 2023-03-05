import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function useFormValidation(schema, props) {
  const {
    formState: { errors },
    ...args
  } = useForm({
    resolver: yupResolver(schema),
    ...props,
  });
  return { errors, ...args };
}
