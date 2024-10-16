import { useFormContext } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function User() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <FormItem>
        <FormLabel htmlFor="name">Name</FormLabel>
        <FormControl>
          <Input id="name" placeholder="Your name" {...register("name")} />
        </FormControl>
        {errors.name?.message && (
          <FormMessage>{String(errors.name.message)}</FormMessage>
        )}
      </FormItem>

      <FormItem>
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormControl>
          <Input id="email" placeholder="Your email" {...register("email")} />
        </FormControl>
        {errors.email?.message && (
          <FormMessage>{String(errors.email.message)}</FormMessage>
        )}
      </FormItem>

      <FormItem>
        <FormLabel htmlFor="username">Username</FormLabel>
        <FormControl>
          <Input
            id="username"
            placeholder="Your username"
            {...register("username")}
          />
        </FormControl>
        {errors.username && (
          <FormMessage>{String(errors.username?.message)}</FormMessage>
        )}
      </FormItem>

      <FormItem>
        <FormLabel htmlFor="password">Password</FormLabel>
        <FormControl>
          <Input
            id="password"
            type="password"
            placeholder="Your password"
            {...register("password")}
          />
        </FormControl>
        {errors.password && (
          <FormMessage>{String(errors.password?.message)}</FormMessage>
        )}
      </FormItem>
      <FormItem>
        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
        <FormControl>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword")}
          />
        </FormControl>
        {errors.confirmPassword?.message && (
          <FormMessage>{String(errors.confirmPassword.message)}</FormMessage>
        )}
      </FormItem>
    </div>
  );
}

export default User;
