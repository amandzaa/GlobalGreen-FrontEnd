import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { loginUser, reset } from "@/redux/features/auth/authSlice";

export type LoginFormData = {
  email: string;
  password: string;
};

export const useLoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, token, isLoading, isSuccess, isError, errorMessage } = useAppSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const emailValue = watch("email");

  const onSubmit = (data: LoginFormData) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (isSuccess && user && token) {
      router.push("/seller-dashboard");
    }
    return () => {
      dispatch(reset());
    };
  }, [isSuccess, user, token, dispatch, router]);

  return {
    register,
    handleSubmit,
    onSubmit,
    showPassword,
    setShowPassword,
    isLoading,
    isError,
    errorMessage,
    isValid,
    emailValue,
    errors,
  };
};
