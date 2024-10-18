import z from "zod";

export const Id = z.object({ id: z.string().min(1) })

export const Pet = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  kind: z.union([
    z.literal('cat'),
    z.literal('dog'),
    z.literal('reptile'),
    z.literal('insect')
  ])
})
export type PetType = z.infer<typeof Pet>
export const CreatePet = Pet.omit({ id: true });
export const UpdatePet = Pet.omit({ id: true }).partial();
export const Pets = z.array(Pet)