import { useFormContext } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const pokemonTypes = [
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
];

function Profile() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const avatarUrl = watch("avatar");

  return (
    <div>
      <FormItem>
        <FormLabel htmlFor="favoriteType">Favorite Pokémon Type</FormLabel>
        <FormControl>
          <Select onValueChange={(value) => setValue("favoriteType", value)}>
            <SelectTrigger id="favoriteType">
              <SelectValue placeholder="Your favorite type" />
            </SelectTrigger>
            <SelectContent>
              {pokemonTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
        {errors.favoriteType && (
          <FormMessage>{String(errors.favoriteType?.message)}</FormMessage>
        )}
      </FormItem>

      <FormItem>
        <FormLabel htmlFor="favoritePokemon">Favorite Pokémon</FormLabel>
        <FormControl>
          <Input
            id="favoritePokemon"
            placeholder="Your favorite Pokémon"
            {...register("favoritePokemon")}
          />
        </FormControl>
        {errors.favoritePokemon && (
          <FormMessage>{String(errors.favoritePokemon?.message)}</FormMessage>
        )}
      </FormItem>

      <FormItem>
        <FormLabel htmlFor="avatar">Avatar URL (optional)</FormLabel>
        <FormControl>
          <Input
            id="avatar"
            placeholder="Enter avatar URL (optional)"
            {...register("avatar")}
          />
        </FormControl>
        {errors.avatar && (
          <FormMessage>{String(errors.avatar?.message)}</FormMessage>
        )}

        {avatarUrl && (
          <Avatar className="mt-4">
            <AvatarImage src={avatarUrl} alt="User Avatar" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        )}
      </FormItem>
    </div>
  );
}

export default Profile;
