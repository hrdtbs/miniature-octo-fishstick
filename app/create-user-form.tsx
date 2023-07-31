import SubmitButton from "@/components/submit-button";
import { insertUserAction } from "./actions";

export default function CreateUserForm() {
  return (
    <form action={insertUserAction}>
      <input type="text" placeholder="Your Name" name="name" />
      <input type="email" placeholder="your-email@gmail.com" name="email" />
      <SubmitButton>Create</SubmitButton>
    </form>
  );
}
