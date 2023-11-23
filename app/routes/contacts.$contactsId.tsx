import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getContact } from "~/utils/contacts";

export async function loader({ params }: LoaderFunctionArgs) {
  const { contactsId } = params;
  const contactDetail = await getContact(contactsId as string);

  return json(contactDetail);
}
export default function ContactsId() {
  const contactDetail = useLoaderData<typeof loader>();

  return (
    <div className="w-full">
      <div className="flex ">
        <div>
          <img src={contactDetail?.avatar!!} className="w-48 h-48 rounded-md" />
        </div>

        <div className="flex flex-col justify-evenly space-y-2 px-3">
          <div className="flex justify-between">
            <h1 className="text-3xl text-zinc-950 font-semibold">
              {contactDetail?.firstName} {contactDetail?.lastName}
            </h1>
            <button className=""></button>
          </div>
          <p className="text-blue-400">
            {contactDetail ? contactDetail?.twitter : null}
          </p>
          <p className="text-gray-500 font-normal">
            {contactDetail ? contactDetail?.notes : null}
          </p>
          <div className="flex space-x-3 ">
            <button className="text-blue-400">Edit</button>
            <button className="text-red-600">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
