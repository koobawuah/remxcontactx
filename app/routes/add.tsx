import { ActionFunctionArgs, json } from "@remix-run/node";
import { ZodError, z } from "zod";
import { createContact } from "~/utils/contacts";

export async function action({ request }: ActionFunctionArgs) {
  const newContactDetails = await request.formData();
  const newData = Object.fromEntries(newContactDetails);

  const validateContactDetail = z.object({
    firstName: z
      .string({
        required_error: "Pss, first name field is required",
        invalid_type_error: "Sorry, please provide only letters",
      })
      .min(3, { message: "First name should be more than 3 letters" })
      .max(15, {
        message: "Ooops, first name should not be more than 15 letters",
      }),
    lastName: z.string({
      required_error: "Pss, last name field is required",
    }),
    favorite: z.boolean().optional(),
    twitter: z.string().max(100, {
      message: "Your handle shouldn't be more than 100 characters",
    }),
    notes: z
      .string()
      .max(150, { message: "You can't have more than 150 characters" }),
    avatar: z.string(),
    createdAt: z.date().optional(),
  });

  try {
    console.log(newData);
    const valid = validateContactDetail.parse(newData);
    if (valid) {
      console.log(valid);
      await createContact(valid);
      return json({});
    }
  } catch (err) {
    const formatted = err.format();
    console.log(formatted);
    throw new Error(formatted);
  }
}

export default function add() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl text-zinc-950 font-semibold">Add new contact</h1>

      <fieldset>
        <form
          method="post"
          encType="multipart/form-data"
          className="max-w-2xl flex flex-col space-y-4 "
        >
          <div className="flex">
            <img
              src="https://via.placeholder.com/photos/2345cf"
              className="w-36 h-36 bg-zinc-400"
            />
            <label htmlFor="avatar" className="sr-only">
              Avatar
            </label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              multiple={false}
              name="avatar"
              className="max-w-min max-h-min"
            />
          </div>
          <label htmlFor="firstName" className="sr-only">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="First name"
            className="p-2 ring-1 ring-zinc-200 shadow-sm border-zinc-400 rounded-md"
          />
          <label htmlFor="lastName" className="sr-only">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Last name"
            className="p-2 ring-1 ring-zinc-200 shadow-sm border-zinc-400 rounded-md"
          />
          <label htmlFor="twitter" className="sr-only">
            Twitter
          </label>
          <input
            id="twitter"
            type="text"
            name="twitter"
            placeholder="Twitter handle"
            className="p-2 ring-1 ring-zinc-200 shadow-sm border-zinc-400 rounded-md"
          />
          <label htmlFor="notes" className="sr-only">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Notes"
            className="p-2 ring-1 ring-zinc-200 shadow-sm border-zinc-400 rounded-md"
          ></textarea>

          <input
            type="submit"
            value="Add contact"
            className="max-w-min p-2 bg-zinc-400 ring-1 ring-zinc-200 text-zinc-50 rounded-md"
          />
        </form>
      </fieldset>
    </div>
  );
}
