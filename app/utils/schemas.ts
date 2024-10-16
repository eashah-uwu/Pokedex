import { z } from "zod";

const userSchema = z
  .object({
    name: z.string().min(1, "Enter your name"),
    email: z.string().email("Invalid email address"),
    username: z.string().min(3, "username must be atleast 3 letters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const profileSchema = z.object({
  favoriteType: z
    .enum([
      "Fire",
      "Water",
      "Grass",
      "Electric",
      "Ice",
      "Rock",
      "Psychic",
      "Ghost",
      "Dragon",
      "Fairy",
      "Normal",
      "Fighting",
      "Poison",
      "Ground",
      "Flying",
      "Bug",
      "Steel",
      "Dark",
    ])
    .refine(
      (val) => val !== undefined,
      "Please select your favorite Pokémon type."
    ),
  favoritePokemon: z
    .string()
    .min(1, "Please select your favorite Pokémon.")
    .max(100, "Pokémon name must be less than 100 characters."),

  avatar: z.string().optional(),
});

export { userSchema, profileSchema };
