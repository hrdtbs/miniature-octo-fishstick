import Image from "next/image";
import { updateUserActionByEmail } from "./actions";
import SubmitButton from "./submit-button";

interface Props {
  name: string;
  email: string;
  image: string;
}

export default function UserCard({ name, email, image }: Props) {
  return (
    <div>
      <Image src={image} alt={name} width={48} height={48} />
      <form action={updateUserActionByEmail}>
        <input type="text" defaultValue={name} name="name" />
        <input type="email" defaultValue={email} name="email" readOnly />
        <SubmitButton>Update</SubmitButton>
      </form>
    </div>
  );
}
