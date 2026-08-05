import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { codeSchema, SignInFormValues, signInSchema } from "../lib/schemas/auth";
import { useRouter } from "expo-router";
import { useSignIn } from "@clerk/expo";

export default function SignInScreen() {
    const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const {
    control: codeControl,
    handleSubmit: handleCodeSubmit,
    formState: { errors: codeErrors },
  } = useForm<{ code: string }>({
    resolver: zodResolver(codeSchema),
    mode: "onBlur",
    defaultValues: { code: "" },
  });
    return (
      
    <View>
      <Text>Sign In</Text>
    </View>
  );
}