import Image from "next/image";
import { updateUserAction } from "./actions";
import SubmitButton from "./submit-button";

interface Props {
  name: string;
  email: string;
  image: string;
  id: string;
}

export default function UserCard({ name, email, image, id }: Props) {
  return (
    <div>
      <Image src={image} alt={name} width={48} height={48} />
      <form action={updateUserAction}>
        <input type="text" defaultValue={name} name="name" />
        <input type="email" defaultValue={email} name="email" />
        <input type="hidden" value={id} readOnly name="id" />
        <SubmitButton>Update</SubmitButton>
      </form>
    </div>
  );
}
